import { DynamicModule, Module } from '@nestjs/common';
import Fastify, { FastifyBaseLogger, FastifyInstance } from 'fastify';
import helmet from '@fastify/helmet';

export interface FastifyModuleOptions {
  logger: FastifyBaseLogger | boolean;
}

export interface FastifyModuleAsyncOptions {
  imports?: any[];
  useFactory?: (
    ...args: any[]
  ) => Promise<FastifyModuleOptions> | FastifyModuleOptions;
  inject?: any[];
}

export function fastifyFactory(config: FastifyModuleOptions) {
  const fastify: FastifyInstance = Fastify(config);
  fastify.register(helmet, {
    contentSecurityPolicy: false,
    dnsPrefetchControl: false,
    hsts: {
      maxAge: 31536000,
    },
  });
  return fastify;
}

export const FASTIFY_MODULE_OPTIONS = 'FASTIFY_MODULE_OPTIONS';
export const FASTIFY_INSTANCE = 'FASTIFY_INSTANCE';
export const FASTIFY_SERVER = 'FASTIFY_SERVER';

@Module({
  exports: [FASTIFY_INSTANCE, FASTIFY_SERVER],
})
export class FastifyModule {
  static register(opts: FastifyModuleOptions): DynamicModule {
    return {
      module: FastifyModule,
      providers: [
        {
          provide: FASTIFY_INSTANCE,
          useFactory: fastifyFactory,
          inject: [{ token: FASTIFY_MODULE_OPTIONS, optional: false }],
        },
        {
          provide: FASTIFY_SERVER,
          useExisting: FASTIFY_INSTANCE,
        },
        {
          provide: FASTIFY_MODULE_OPTIONS,
          useValue: opts,
        },
      ],
    };
  }

  static registerAsync(opts: FastifyModuleAsyncOptions): DynamicModule {
    return {
      module: FastifyModule,
      imports: opts.imports || [],
      providers: [
        {
          provide: FASTIFY_INSTANCE,
          useFactory: fastifyFactory,
          inject: [{ token: FASTIFY_MODULE_OPTIONS, optional: false }],
        },
        {
          provide: FASTIFY_SERVER,
          useExisting: FASTIFY_INSTANCE,
        },
        {
          provide: FASTIFY_MODULE_OPTIONS,
          useFactory: opts.useFactory,
          inject: opts.inject || [],
        },
      ],
    };
  }
}
