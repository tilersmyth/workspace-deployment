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
      const env = config.get<string>('NODE_ENV');

      const redis = new Redis({
        port: config.get<number>('REDIS_PORT'),
        host: config.get<string>('REDIS_HOST'),
        password:
          env === 'production' ? config.get<string>('REDIS_SECRET') : undefined,
      });

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
