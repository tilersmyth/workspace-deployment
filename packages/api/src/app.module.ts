import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeormService } from './core/typeorm/typeorm.service';
import { GraphqlService } from './core/graphql/graphql.service';
import { UserModule } from './modules/user/user.module';
import { SessionModule } from './core/session/session.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: TypeormService,
    }),
    GraphQLModule.forRootAsync({
      imports: [UserModule],
      useClass: GraphqlService,
    }),
    SessionModule,
    UserModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
