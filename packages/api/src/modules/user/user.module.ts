import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { IsUserAlreadyExist } from './user.validator';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [IsUserAlreadyExist, UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
