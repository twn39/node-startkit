import { INestApplicationContext } from '@nestjs/common';
import { FASTIFY_INSTANCE } from './app.module';
import { HomeController } from './controllers/home.controller';

export function router(ctx: INestApplicationContext) {
  const server = ctx.get(FASTIFY_INSTANCE);
  const home = ctx.get(HomeController);
  server.get('/', home.index);
  return server;
}
