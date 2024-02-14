import { IsAlphanumeric, IsStrongPassword, Length } from 'class-validator';

export class CreateUserDto {
  @IsAlphanumeric()
  @Length(5, 30)
  username: string;

  @IsStrongPassword()
  @Length(8)
  password: string;
}
