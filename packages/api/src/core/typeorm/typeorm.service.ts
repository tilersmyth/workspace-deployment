import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeormService implements TypeOrmOptionsFactory {
  constructor(readonly config: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.config.get<string>('DB_HOST'),
      port: this.config.get<number>('DB_PORT'),
      username: this.config.get<string>('DB_USER'),
      password: this.config.get<string>('DB_PASSWORD'),
      database: this.config.get<string>('DB_NAME'),
      logging: this.config.get<string>('NODE_ENV') !== 'development',
      synchronize: this.config.get<boolean>('DB_SYNCHRONIZE'),
      entities: [`${__dirname}/../../**/*.entity{.ts,.js}`],
      migrations: [`${__dirname}/../../migrations/*{.ts,.js}`],
      dropSchema: false,
    };
  }
}
