import { Injectable } from '@nestjs/common';
import { HomeController } from './controllers/home.controller';
import { FastifyInstance } from 'fastify';

@Injectable()
export class Router {
  constructor(private homeController: HomeController) {}

  setRouters(app: FastifyInstance) {
    app.get('/', this.homeController.index);
  }
}
