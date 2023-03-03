import { Controller, Inject } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { IConfig } from '../config';
import { CONFIG } from '../types';

@Controller()
export class HomeController {
  constructor(@Inject(CONFIG) private readonly config: IConfig) {}

  index = (request: FastifyRequest, reply: FastifyReply) => {
    reply.send({
      code: 0,
      data: this.config,
      msg: 'ok',
    });
  };
}
