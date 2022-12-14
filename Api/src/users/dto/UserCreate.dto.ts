import {
  IsString,
  MaxLength,
  MinLength,
  IsPhoneNumber,
  IsEnum,
  IsEmail,
  IsAlpha,
  IsMongoId,
} from 'class-validator'
import { Role, Status } from '../dto/UserSearch.dto'

export class UserCreateDto {
  @IsMongoId()
  id: string

  @IsEnum(Role)
  role: Role

  @IsEnum(Status)
  status: Status

  @IsAlpha()
  @MinLength(2)
  @MaxLength(20)
  firstName: string

  @IsAlpha()
  @MinLength(2)
  @MaxLength(20)
  lastName: string

  @IsPhoneNumber('PT')
  phone: string

  @IsEmail()
  email: string

  @IsString()
  @MinLength(8)
  @MaxLength(16)
  password: string
}
