import { IsAlphanumeric, IsStrongPassword, Length } from "class-validator";

export class CreateuserDto {
    @IsAlphanumeric()
    @Length(5, 30)
    username: string;

    @IsStrongPassword()
    @Length(8)
    password: string;
}