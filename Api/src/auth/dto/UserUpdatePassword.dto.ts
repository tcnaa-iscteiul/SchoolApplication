import {
  IsString,
  MinLength,
  IsOptional,
  IsMongoId,
  MaxLength,
} from 'class-validator';

export class UserUpdatePasswordDto {
  @IsOptional()
  @IsMongoId()
  id: string;

  @IsString()
  token: string;

  @IsString()
  @MinLength(8)
  @MaxLength(16)
  password: string;
}
