import { IsAlphanumeric, IsStrongPassword, Max, Min } from "class-validator";

export class PatchUsernameDto {
    @IsAlphanumeric()
    @Min(5)
    @Max(30)
    username: string
}

export class PatchPasswordDto {
    @Min(8)
    @IsStrongPassword()
    password: string
}