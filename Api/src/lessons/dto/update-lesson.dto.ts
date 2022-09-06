import { PartialType } from '@nestjs/mapped-types';
import {
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsMongoId,
  IsBoolean,
} from 'class-validator';
import mongoose from 'mongoose';
import { CreateLessonDto } from './create-lesson.dto';

export class StudentInformation {
  id?: string;
  studentName: mongoose.Types.ObjectId;
  presence: boolean;
  absence: string;
  submmitedWork: string;
}

export class UpdateLessonDto extends PartialType(CreateLessonDto) {
  @IsMongoId()
  lessonID: string;

  @IsOptional()
  @IsString()
  @MinLength(15)
  @MaxLength(50)
  @IsNotEmpty()
  classWork: string;

  students: StudentInformation;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  studentEmail: string;

  /*@IsOptional()
  @IsBoolean()*/
  presence: boolean;

  /* @IsOptional()
  @MinLength(15)
  @MaxLength(50)*/
  absence: string;

  /* @IsOptional()
  @MinLength(15)
  @MaxLength(50)*/
  submmitedWork: string;
}
