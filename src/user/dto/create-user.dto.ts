import { IsString, MaxLength, MinLength, IsPhoneNumber, IsEnum } from 'class-validator';
import { BaseUserDto } from './base-user.dto';
import { Role, Status } from '../dto/base-user.dto';

export class CreateUserDto extends BaseUserDto{

    @IsEnum(Role)
    role: Role;

    @IsEnum(Status)
    status: Status;

    @IsString()
    @MinLength(4)
    @MaxLength(50)
    firstName: string;

    @IsString()
    @MinLength(4)
    @MaxLength(50)
    lastName: string;

    @IsPhoneNumber('PT')
    phone: string;
}
