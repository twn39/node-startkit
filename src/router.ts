import { INestApplicationContext } from '@nestjs/common';
import { HomeController } from './controllers/home.controller';
import { FASTIFY_SERVER } from './modules/fastify/fastify.module';

export function router(ctx: INestApplicationContext) {
  const server = ctx.get(FASTIFY_SERVER);
  const home = ctx.get(HomeController);
  server.get('/', home.index);
  return server;
}
