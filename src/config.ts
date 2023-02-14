import * as process from 'process';
import { Knex } from 'knex';
import { RedisOptions } from 'ioredis';

export const CONFIG = Symbol.for('app.config');

export interface IConfig {
  env: 'development' | 'production' | 'test';
  redis: RedisOptions;
  db: Knex.Config;
}

export const config = {
  env: process.env.NODE_ENV || 'development',
  redis: {
    host: '127.0.0.1',
    port: 6379,
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
