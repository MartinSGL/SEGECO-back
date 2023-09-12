import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  user: string;

  @IsNotEmpty()  
  fullname: string;

  @MinLength(4, { message: 'Password must be 4 characters' })
  @MaxLength(4, { message: 'Password must be 4 characters' })
  password: string;
}
