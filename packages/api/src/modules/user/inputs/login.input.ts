import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UserLoginInput {
  @Field()
  readonly email: string;
  @Field()
  readonly password: string;
}
