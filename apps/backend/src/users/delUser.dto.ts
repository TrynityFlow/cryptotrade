import { Length } from 'class-validator';

export class DeleteUserDto {
  @Length(8)
  password: string;
}
