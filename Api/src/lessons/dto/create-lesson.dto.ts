import {
  MaxLength,
  MinLength,
  IsAlpha,
  IsNotEmpty,
  IsMongoId,
  IsOptional,
} from 'class-validator';

export class CreateLessonDto {
  @IsOptional()
  @IsMongoId()
  id: string;

  @IsOptional()
  @MinLength(2)
  @MaxLength(50)
  className: string;

  @IsAlpha()
  @MinLength(5)
  @MaxLength(3000)
  @IsNotEmpty()
  summary: string;

  date: Date;
}
