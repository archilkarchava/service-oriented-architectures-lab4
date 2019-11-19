import { IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  readonly email: string;

  @MinLength(8)
  password: string;
}
