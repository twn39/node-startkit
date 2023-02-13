import { FastifyInstance } from 'fastify';
import { Router } from './router';
import * as process from 'process';

const port = process.env.PORT || 3030;

export class AppServer {
  constructor(public server: FastifyInstance, private router: Router) {}

  async run() {
    this.router.setRouters(this.server);
    return await this.server.listen({ port: Number(port) });
  }
}
