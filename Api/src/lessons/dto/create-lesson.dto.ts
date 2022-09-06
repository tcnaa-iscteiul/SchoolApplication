import {
  MaxLength,
  MinLength,
  IsNotEmpty,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateLessonDto {
  @IsOptional()
  @IsMongoId()
  id: string;

  @IsOptional()
  @MinLength(2)
  @MaxLength(50)
  className: string;

  @IsString()
  @MinLength(5)
  @MaxLength(3000)
  @IsNotEmpty()
  summary: string;

  date: Date;
}
