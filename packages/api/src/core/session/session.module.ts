import { Module } from '@nestjs/common';

import { SessionService } from './session.service';
import { sessionProvider } from './session.provider';

@Module({
  providers: [SessionService, sessionProvider],
  exports: [sessionProvider],
})
export class SessionModule {}
