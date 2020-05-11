import { ObjectType, Field } from '@nestjs/graphql';

import { UserEntity } from '../user.entity';

@ObjectType()
export class LoginDto {
  @Field()
  readonly sessionId: string;

  @Field(() => UserEntity)
  readonly user: UserEntity;
}
