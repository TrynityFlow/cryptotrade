import { IsAlphanumeric, IsStrongPassword, Length } from 'class-validator';

export class PatchUsernameDto {
  @IsAlphanumeric()
  @Length(5, 30)
  username: string;
}

export class PatchPasswordDto {
  @Length(8)
  @IsStrongPassword()
  password: string;
}
