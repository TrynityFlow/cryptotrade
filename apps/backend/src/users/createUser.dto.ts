import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsStrongPassword, Length } from 'class-validator';

export class CreateUserDto {
  @IsAlphanumeric()
  @Length(5, 30)
  @ApiProperty({
    example: 'user',
    minLength: 5,
    maxLength: 30,
    description: 'Alphanumeric',
  })
  username: string;

  @IsStrongPassword()
  @Length(8)
  @ApiProperty({
    example: 'Password123!',
    minLength: 8,
    description: 'Strong password',
  })
  password: string;
}
