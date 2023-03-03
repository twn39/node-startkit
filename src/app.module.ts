import { Module } from '@nestjs/common';
import Fastify, { FastifyInstance } from 'fastify';
import { HomeController } from './controllers/home.controller';
import { Redis } from 'ioredis';
import { fetch } from 'undici';
import helmet from '@fastify/helmet';
import { config, IConfig } from './config';
import knex from 'knex';
import { CONFIG, DB, FASTIFY_INSTANCE, FETCH } from './types';

@Module({
  imports: [],
  controllers: [HomeController],
  providers: [
    {
      provide: CONFIG,
      useValue: config,
    },
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
      useFactory: (config: IConfig) => {
        return new Redis(config.redis);
      },
      inject: [
        {
          token: CONFIG,
          optional: false,
        },
      ],
    },
    {
      provide: DB,
      useFactory: (config: IConfig) => {
        return knex(config.db);
      },
      inject: [{ token: CONFIG, optional: false }],
    },
  ],
})
export class AppModule {}
