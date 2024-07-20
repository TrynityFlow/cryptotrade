import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsStrongPassword, Length } from 'class-validator';

export class PatchUsernameDto {
  @IsAlphanumeric()
  @Length(5, 30)
  @ApiProperty({ example: 'user', minLength: 8, maxLength: 30, description: 'Alphanumeric' })
  username: string;
}

export class PatchPasswordDto {
  @Length(8)
  @IsStrongPassword()
  @ApiProperty({ example: 'Password123!', minLength: 8, description: 'Strong password' })
  password: string;
}
