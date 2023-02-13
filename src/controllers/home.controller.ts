import { Injectable } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import AppConfig from '../config';

@Injectable()
export class HomeController {
  constructor(private readonly config: AppConfig) {}

  index = (request: FastifyRequest, reply: FastifyReply) => {
    reply.send({
      code: 0,
      data: this.config,
      msg: 'ok',
    });
  };
}
