import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { UserService } from './user.service';

@ValidatorConstraint({ name: 'unique', async: true })
@Injectable()
export class IsUserAlreadyExist implements ValidatorConstraintInterface {
  private userService: UserService;
  constructor(private readonly moduleRef: ModuleRef) {}

  public async validate(email: string) {
    if (!this.userService) {
      this.userService = this.moduleRef.get('UserService');
    }

    const user = await this.userService.findOne({ where: { email } });

    return !user;
  }

  defaultMessage() {
    return '$value is associated with existing account';
  }
}
