import { Module } from '@nestjs/common';
import Fastify, { FastifyInstance } from 'fastify';
import { AppServer } from './app.server';
import { HomeController } from './controllers/home.controller';
import { Router } from './router';
import { Redis } from 'ioredis';
import { fetch } from 'undici';
import helmet from '@fastify/helmet';
import AppConfig from './config';

export const FASTIFY_INSTANCE = Symbol.for('fastify.instance');
export const FETCH = Symbol.for('undici.fetch');

@Module({
  imports: [],
  providers: [
    AppConfig,
    {
      provide: FASTIFY_INSTANCE,
      useFactory: () => {
        const fastify: FastifyInstance = Fastify({ logger: true });
        fastify.register(helmet, {
          contentSecurityPolicy: false,
        });
        return fastify;
      },
    },
    {
      provide: FETCH,
      useValue: fetch,
    },
    {
      provide: Redis,
      useFactory: (config: AppConfig) => {
        return new Redis(config.redis);
      },
      inject: [AppConfig],
    },
    HomeController,
    Router,
    {
      provide: AppServer,
      useFactory: (app: FastifyInstance, router: Router) => {
        return new AppServer(app, router);
      },
      inject: [
        {
          token: FASTIFY_INSTANCE,
          optional: false,
        },
        Router,
      ],
    },
  ],
})
export class AppModule {}
