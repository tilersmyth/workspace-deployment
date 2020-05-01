import { Injectable, ValidationError } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import * as bcryptjs from 'bcryptjs';
import { ApolloError } from 'apollo-server-core';
import { validate } from 'class-validator';
import { ConfigService } from '@nestjs/config';

import { UserEntity } from './user.entity';
import { UserRegisterInput } from './inputs/register.input';
import { UserLoginInput } from './inputs/login.input';
import { ExpressRequest, ExpressContext } from '../../types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    protected readonly repository: Repository<UserEntity>,
    protected readonly config: ConfigService,
  ) {}

  private static validationFormatter(
    acc: { [key: string]: string },
    error: ValidationError,
  ) {
    const key = Object.keys(error.constraints)[0];
    return { [error.property]: error.constraints[key], ...acc };
  }

  async validateUserSession(
    req: ExpressRequest,
  ): Promise<Partial<UserEntity> | null> {
    // Graphql Playground IntrospectionQuery DOT NOT Validate
    if (req.body && req.body.query.includes('IntrospectionQuery')) {
      return null;
    }

    if (!req.session.userId) {
      return null;
    }

    try {
      return this.findOne({
        where: {
          id: req.session.userId,
        },
      });
    } catch (error) {
      return null;
    }
  }

  public async findOne(
    options?: FindOneOptions<UserEntity>,
  ): Promise<UserEntity> {
    try {
      const result = await this.repository.findOneOrFail(options);
      return result;
    } catch (err) {
      return null;
    }
  }

  public async find(): Promise<UserEntity[]> {
    return this.repository.find();
  }

  public async register(input: UserRegisterInput): Promise<UserEntity> {
    try {
      const register = new UserEntity();
      Object.assign(register, input);
      const errors = await validate(register);

      if (errors.length > 0) {
        throw errors;
      }

      return this.repository.save(register);
    } catch (err) {
      throw new ApolloError(
        'validation',
        '',
        err.reduce(UserService.validationFormatter, {}),
      );
    }
  }

  public async login(
    input: UserLoginInput,
    req: ExpressRequest,
  ): Promise<UserEntity> {
    const user = await this.findOne({ where: { email: input.email } });

    if (!user || !bcryptjs.compareSync(input.password, user.password)) {
      throw new ApolloError('validation', '', {
        form: 'Invalid email or password',
      });
    }

    req.session.userId = user.id;

    return user;
  }

  public async logout(ctx: ExpressContext): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!ctx.req.session) {
        return reject(new Error('Express session not found'));
      }

      return ctx.req.session.destroy((err: any) => {
        if (err) {
          return reject(err);
        }

        const cookieId = this.config.get<string>('SESSION_NAME');
        ctx.res.clearCookie(cookieId);
        return resolve(true);
      });
    });
  }
}
