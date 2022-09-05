import {
  IsMongoId,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateEvaluations {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @IsMongoId()
  student: string;

  @IsNumber()
  @Min(0)
  @Max(20)
  grade: number;
}
