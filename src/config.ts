import * as process from 'process';
import { Knex } from 'knex';
import { RedisOptions } from 'ioredis';
import * as dotenv from 'dotenv';
import { FastifyModuleOptions } from './modules/fastify/fastify.module';

/**
 * 环境变量将 APP_ENV 和 NODE_ENV 区分开，因为某些第三方库有用到 NODE_ENV，
 * 因此将其与项目隔离开，避免在做自定义修改时引发不必要的 bug
 * APP_ENV: dev | prod
 * NODE_ENV: development | production
 */

const appEnv = process.env.APP_ENV || 'dev';
const nodeEnv = process.env.NODE_ENV || 'development';

dotenv.config({
  path: __dirname + `/../.${appEnv}.env`,
  debug: appEnv === 'dev',
});

export interface IConfig {
  env: string;
  nodeEnv: string;
  redis: RedisOptions;
  db: Knex.Config;
  server: FastifyModuleOptions;
}

export const config: IConfig = {
  env: appEnv,
  nodeEnv: nodeEnv,
  server: {
    logger: true,
  },
  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: Number(process.env.REDIS_PORT || 6379),
    username: null,
    password: null,
    db: 0,
  },
  db: {
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING,
    searchPath: ['public'],
    pool: { min: 0, max: 7 },
  },
};
