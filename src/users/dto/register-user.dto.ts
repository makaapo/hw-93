import { IsEmail, IsNotEmpty } from 'class-validator';
import { UniqueUserEmail } from '../validators/unique-user-email.validator';

export class RegisterUserDto {
  @IsEmail()
  @UniqueUserEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  displayName: string;
}
