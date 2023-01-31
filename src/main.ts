import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppServer } from './app.server';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const server = await app.get(AppServer);
  await server.run();
}

bootstrap();
