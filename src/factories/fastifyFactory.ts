import Fastify, { FastifyInstance } from 'fastify';
import helmet from '@fastify/helmet';
import { IConfig } from '../config';

export function fastifyFactory(config: IConfig) {
  const fastify: FastifyInstance = Fastify(config.server);
  fastify.register(helmet, {
    contentSecurityPolicy: false,
  });
  return fastify;
}
