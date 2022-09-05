import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class Evaluations {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  student: string;

  @IsNumber()
  @MaxLength(2)
  grade: number;
}
