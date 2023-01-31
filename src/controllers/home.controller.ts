import { Injectable } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Injectable()
export class HomeController {
  index(request: FastifyRequest, reply: FastifyReply) {
    reply.send({
      code: 0,
      data: 'server run.',
      msg: 'ok',
    });
  }
}
