import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { useContainer } from 'class-validator';

import { AppModule } from './app.module';
import { EXPRESS_SESSION } from './core/session/session.constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const session = app.get(EXPRESS_SESSION);
  app.use(session);

  const config = app.get(ConfigService);

  console.log('ddd');

  app.enableCors({
    origin: config.get<string>('FRONTEND'),
    credentials: true,
  });

  // Needed for entity validation
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(config.get<number>('PORT'));
}
bootstrap();
