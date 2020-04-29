import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { UserEntity } from './user.entity';

export const Me = createParamDecorator(
  (_data: unknown, context: ExecutionContext): UserEntity | undefined => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().user;
  },
);
