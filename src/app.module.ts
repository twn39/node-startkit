import { Module } from '@nestjs/common';
import Fastify, { FastifyInstance } from 'fastify';
import { HomeController } from './controllers/home.controller';
import { Redis } from 'ioredis';
import { fetch } from 'undici';
import helmet from '@fastify/helmet';
import { config, CONFIG, IConfig } from './config';
import knex from 'knex';

export const FASTIFY_INSTANCE = Symbol.for('fastify.instance');
export const FETCH = Symbol.for('undici.fetch');
export const DB = Symbol.for('DB');

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
