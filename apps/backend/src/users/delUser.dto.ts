import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class DeleteUserDto {
  @Length(8)
  @ApiProperty({ example: 'Password123!', minLength: 8, description: 'Strong password' })
  password: string;
}
