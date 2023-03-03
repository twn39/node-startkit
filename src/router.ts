import { INestApplicationContext } from '@nestjs/common';
import { HomeController } from './controllers/home.controller';
import { FASTIFY_INSTANCE } from './types';

export function router(ctx: INestApplicationContext) {
  const server = ctx.get(FASTIFY_INSTANCE);
  const home = ctx.get(HomeController);
  server.get('/', home.index);
  return server;
}
