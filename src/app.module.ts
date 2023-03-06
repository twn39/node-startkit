import { Module } from '@nestjs/common';
import { HomeController } from './controllers/home.controller';
import { Redis } from 'ioredis';
import { fetch } from 'undici';
import { config, IConfig } from './config';
import knex from 'knex';
import { CONFIG, DB, FASTIFY_INSTANCE, FETCH } from './types';
import {fastifyFactory} from "./factories/fastifyFactory";

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
      useFactory: fastifyFactory,
      inject: [{token: CONFIG, optional: false}]
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
      inject: [{token: CONFIG, optional: false}],
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
