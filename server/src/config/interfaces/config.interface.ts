import { IsInt, IsNotEmpty, IsString, Matches } from 'class-validator';
import { DotenvParseOutput } from 'dotenv/types';

export class Config {
  constructor(fromDotEnvFile: DotenvParseOutput) {
    this.NODE_ENV = process.env.NODE_ENV
      ? (process.env.NODE_ENV as
          | 'development'
          | 'production'
          | 'test'
          | 'provision')
      : 'development';
    this.PORT = fromDotEnvFile.PORT ? Number(fromDotEnvFile.PORT) : 3000;
    this.DATABASE_NAME = fromDotEnvFile.DATABASE_NAME;
    this.DATABASE_USER = fromDotEnvFile.DATABASE_USER;
    this.DATABASE_PASSWORD = fromDotEnvFile.DATABASE_PASSWORD;
    this.DATABASE_HOST = fromDotEnvFile.DATABASE_HOST;
    this.DATABASE_PORT = Number(fromDotEnvFile.DATABASE_PORT);
    this.JWT_SECRET = fromDotEnvFile.JWT_SECRET;
  }
  @Matches(/\bdevelopment\b|\bproduction\b|\btest\b|\bprovision\b/)
  readonly NODE_ENV: 'development' | 'production' | 'test' | 'provision';
  @IsInt()
  readonly PORT: number;
  @IsNotEmpty()
  @IsString()
  readonly DATABASE_NAME: string;
  @IsNotEmpty()
  @IsString()
  readonly DATABASE_USER: string;
  @IsNotEmpty()
  @IsString()
  readonly DATABASE_PASSWORD: string;
  @IsNotEmpty()
  @IsString()
  readonly DATABASE_HOST: string;
  @IsInt()
  readonly DATABASE_PORT: number;
  @IsNotEmpty()
  @IsString()
  readonly JWT_SECRET: string;
}
