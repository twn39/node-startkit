import { FastifyInstance } from 'fastify';

export class AppServer {
  constructor(private server: FastifyInstance) {}

  routers() {
    this.server.get('/', (request, reply) => {
      reply.send({
        code: 0,
        data: 'server run.',
        msg: 'ok',
      });
    });
  }

  async run() {
    this.routers();
    return await this.server.listen({ port: 3000 });
  }
}
