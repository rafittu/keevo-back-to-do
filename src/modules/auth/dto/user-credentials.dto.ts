import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class CredentialsDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class CredentialsDtoWithChannel extends CredentialsDto {
  @IsNotEmpty()
  @IsString()
  origin: string;
}
