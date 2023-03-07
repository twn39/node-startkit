import { Controller, Inject } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { config } from '../config';

@Controller()
export class HomeController {
  index = (request: FastifyRequest, reply: FastifyReply) => {
    reply.send({
      code: 0,
      data: {
        title: 'server',
        env: config.env,
        version: '0.1.0',
      },
      msg: 'ok',
    });
  };
}
