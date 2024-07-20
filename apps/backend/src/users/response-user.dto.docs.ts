import { ApiProperty } from '@nestjs/swagger';

export class ResponseUserDto {
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty({ example: 'user', minLength: 5, maxLength: 30, description: 'Alphanumeric' })
  username: string;
}