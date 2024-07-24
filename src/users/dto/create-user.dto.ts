import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  lastname: string;

  @IsEmail()
  email: string;

  @MaxLength(12)
  @IsString()
  phone: number;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  image?: string;

  notification_token?: string;
}
