import * as process from 'process';

export const CONFIG = Symbol.for('app.config');

export interface IConfig {
  env: string;
  redis: {
    host: string;
    port: number;
  };
}

export const config = {
  env: process.env.NODE_ENV,
  redis: {
    host: '127.0.0.1',
    port: 6379,
    username: null,
    password: null,
    db: 0,
  },
};
