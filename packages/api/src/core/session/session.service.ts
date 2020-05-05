import { Injectable } from '@nestjs/common';
import expressSession from 'express-session';
import Store from 'connect-redis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SessionService {
  constructor(private readonly config: ConfigService) {}
  options(store: Store.RedisStore): expressSession.SessionOptions {
    return {
      store,
      name: this.config.get<string>('SESSION_NAME'),
      secret: this.config.get<string>('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: this.config.get<string>('NODE_ENV') === 'production',
        maxAge: Number(this.config.get<number>('SESSION_COOKIE_MAX_AGE')),
      },
    };
  }
}
