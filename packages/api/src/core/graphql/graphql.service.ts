import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';
import { ConfigService } from '@nestjs/config';

import { UserService } from '../../modules/user/user.service';

@Injectable()
export class GraphqlService implements GqlOptionsFactory {
  constructor(
    private readonly config: ConfigService,
    private readonly userService: UserService,
  ) {}

  createGqlOptions(): GqlModuleOptions {
    const env = this.config.get<string>('NODE_ENV');

    return {
      introspection: env === 'development',
      cors: {
        origin: this.config.get<string>('FRONTEND'),
        credentials: true,
      },
      playground: env === 'development',
      tracing: env === 'development',
      debug: env === 'development',
      autoSchemaFile: 'schema.gql',
      definitions: {
        outputAs: 'class',
      },
      context: async ({ req, ...ctx }) => {
        return {
          ...ctx,
          req,
          user: await this.userService.validateUserSession(req),
        };
      },
      formatError: (error: any) => {
        if (error.message && error.message.error) {
          return new Error(error.message.error);
        }

        return error;
      },
    };
  }
}
