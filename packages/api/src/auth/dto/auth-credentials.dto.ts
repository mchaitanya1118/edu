import { IsString, IsEmail, MinLength, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class AuthCredentialsDto {
  @IsEmail({}, { message: 'Email must be a valid email address.' })
  @Transform(({ value }) => value.trim().toLowerCase())
  email: string = '';

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters.' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, { message: 'Password must contain upper, lower, and a number.' })
  password: string = '';
}
