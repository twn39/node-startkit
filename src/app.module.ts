import { Module } from '@nestjs/common';
import Fastify, { FastifyInstance } from 'fastify';
import { AppServer } from './app.server';

export const FASTIFY_INSTANCE = Symbol.for('fastify.instance');

const fastify: FastifyInstance = Fastify({ logger: true });

@Module({
  imports: [],
  providers: [
    {
      provide: FASTIFY_INSTANCE,
      useValue: fastify,
    },
    {
      provide: AppServer,
      useFactory: (app: FastifyInstance) => {
        return new AppServer(app);
      },
      inject: [
        {
          token: FASTIFY_INSTANCE,
          optional: false,
        },
      ],
    },
  ],
})
export class AppModule {}
