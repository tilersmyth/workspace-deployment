import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UserRegisterInput {
  @Field()
  readonly first_name: string;
  @Field()
  readonly last_name: string;
  @Field()
  readonly email: string;
  @Field()
  readonly password: string;
}
