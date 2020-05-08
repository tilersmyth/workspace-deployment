import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import expressSession from 'express-session';
import Redis from 'ioredis';
import Store from 'connect-redis';

import { EXPRESS_SESSION, EXPRESS_SESSION_NAME } from './session.constants';
import { SessionService } from './session.service';

export const sessionProvider = {
  provide: EXPRESS_SESSION,
  useFactory: async (sessionService: SessionService, config: ConfigService) => {
    const logger = new Logger(EXPRESS_SESSION_NAME);
    try {
      const redis = new Redis(
        config.get<number>('REDIS_PORT'),
        config.get<string>('REDIS_HOST'),
      );

      const RedisStore = Store(expressSession);
      const store = new RedisStore({
        client: redis as any,
      });

      logger.log('Initiating Session...');

      const options = sessionService.options(store);

      return expressSession(options);
    } catch (err) {
      logger.error('Initiating Express Session failed');
      throw err;
    }
  },
  inject: [SessionService, ConfigService],
};
