import { IsString, Matches, MaxLength, MinLength, IsEmail } from 'class-validator';
export enum Role {
    Admin="Admin",
    Student="Student",
    Teacher="Teacher",
}
export enum Status {
    Active="Active",
    Pending="Pending",
    Inactive="Inactive",
}
export class BaseUserDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password is too weak',
    })
    password: string;
}