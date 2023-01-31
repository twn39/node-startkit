import { Module } from '@nestjs/common';
import Fastify, { FastifyInstance } from 'fastify';
import { AppServer } from './app.server';
import { HomeController } from './controllers/home.controller';
import { Router } from './router';

export const FASTIFY_INSTANCE = Symbol.for('fastify.instance');

const fastify: FastifyInstance = Fastify({ logger: true });

@Module({
  imports: [],
  providers: [
    {
      provide: FASTIFY_INSTANCE,
      useValue: fastify,
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
