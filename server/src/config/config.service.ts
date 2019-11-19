import { Injectable } from '@nestjs/common';
import { validateSync } from 'class-validator';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { Config } from './interfaces/config.interface';

@Injectable()
export class ConfigService implements Config {
  readonly NODE_ENV: 'development' | 'production' | 'test' | 'provision';
  readonly PORT: number;
  readonly DATABASE_NAME: string;
  readonly DATABASE_USER: string;
  readonly DATABASE_PASSWORD: string;
  readonly DATABASE_HOST: string;
  readonly DATABASE_PORT: number;
  readonly JWT_SECRET: string;

  constructor(filePath: string) {
    const fromDotEnvFile = dotenv.parse(fs.readFileSync(filePath));
    const config = new Config(fromDotEnvFile);
    this.validateInput(config);
    Object.assign(this, config);
  }

  private validateInput(envConfig: Config) {
    const errors = validateSync(envConfig);
    // TODO: pretty error formatting
    if (errors.length > 0) {
      throw errors;
    }
  }
}
