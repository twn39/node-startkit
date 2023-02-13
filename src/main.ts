import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import { router } from './router';

const port = process.env.PORT || 3001;

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const server = router(app);
  return await server.listen({ port: Number(port) });
}

bootstrap();
