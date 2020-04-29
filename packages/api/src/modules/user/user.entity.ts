import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BaseEntity,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  IsEmail,
  Length,
  MinLength,
  ValidateIf,
  Validate,
} from 'class-validator';
import * as bcryptjs from 'bcryptjs';

import { IsUserAlreadyExist } from './user.validator';

@Entity('users')
@ObjectType()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  public id: string;

  @Column('text')
  @Length(3, 50, { message: 'must be between 3 and 50 characters' })
  @Field(() => String)
  public first_name: string;

  @Column('text')
  @Length(3, 50, { message: 'must be between 3 and 50 characters' })
  @Field(() => String)
  public last_name: string;

  @Column({ type: 'varchar', length: 255 })
  @IsEmail({}, { message: 'invalid format' })
  @ValidateIf(u => !u.id)
  @Validate(IsUserAlreadyExist)
  @Field(() => String)
  public email: string;

  @Column('text')
  @MinLength(8, { message: '8 character minimum' })
  public password: string;

  @BeforeInsert()
  hashPasswordBeforeInsert() {
    const salt = bcryptjs.genSaltSync();
    this.password = bcryptjs.hashSync(this.password, salt);
  }
}
