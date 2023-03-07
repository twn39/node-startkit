import { Module } from '@nestjs/common';
import { HomeController } from './controllers/home.controller';
import { Redis } from 'ioredis';
import knex from 'knex';
import { DB } from './types';
import { FastifyModule } from './modules/fastify/fastify.module';
import { HttpModule } from './modules/http/http.module';
import { config } from './config';

@Module({
  imports: [FastifyModule.register(config.server), HttpModule],
  controllers: [HomeController],
  providers: [
    {
      provide: Redis,
      useFactory: () => {
        return new Redis(config.redis);
      },
    },
    {
      provide: DB,
      useFactory: () => {
        return knex(config.db);
      },
    },
  ],
})
export class AppModule {}
