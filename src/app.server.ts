import { FastifyInstance } from 'fastify';
import { Router } from './router';

export class AppServer {
  constructor(public server: FastifyInstance, private router: Router) {}

  async run() {
    this.router.setRouters(this.server);
    return await this.server.listen({ port: 3000 });
  }
}
