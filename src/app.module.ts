import { Module } from '@nestjs/common';
import Fastify, { FastifyInstance } from 'fastify';
import { AppServer } from './app.server';
import { HomeController } from './controllers/home.controller';
import { Router } from './router';
import { Redis } from 'ioredis';
import { fetch } from 'undici';

export const FASTIFY_INSTANCE = Symbol.for('fastify.instance');
export const FETCH = Symbol.for('undici.fetch');

const fastify: FastifyInstance = Fastify({ logger: true });

@Module({
  imports: [],
  providers: [
    {
      provide: FASTIFY_INSTANCE,
      useValue: fastify,
    },
    {
      provide: FETCH,
      useValue: fetch,
    },
    {
      provide: Redis,
      useFactory: () => {
        return new Redis();
      },
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
