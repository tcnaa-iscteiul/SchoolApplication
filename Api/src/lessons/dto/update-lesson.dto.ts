import { UploadedFiles, UseInterceptors } from '@nestjs/common'
import { PartialType } from '@nestjs/mapped-types'
import { FilesInterceptor } from '@nestjs/platform-express'
import { MulterField } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'
import {
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsMongoId,
  IsBoolean,
} from 'class-validator'
import mongoose from 'mongoose'
import { CreateLessonDto } from './create-lesson.dto'

export class StudentInformation {
  _id?: string
  studentName?: mongoose.Types.ObjectId
  presence: boolean
  absence: string
  submmitedWork: string
}

export type File = {
  id:string,
  fieldname: string,
  originalname: string,
  encoding: string,
  mimetype: string,
  buffer: Buffer[],
  size: number
}

export class UpdateLessonDto extends PartialType(CreateLessonDto) {
  //@IsMongoId()
  lessonID: string

  className: string

  //@IsMongoId()
  _id?: string

  /* @IsOptional()
  @IsString()
  @MinLength(15)
  @MaxLength(50)
  @IsNotEmpty()*/
  classWork: File

  summaryId: string

  student?: StudentInformation

  students?: StudentInformation[]

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  studentEmail?: string

  /*@IsOptional()
  @IsBoolean()*/
  presence?: boolean

  /* @IsOptional()
  @MinLength(15)
  @MaxLength(50)*/
  absence?: string

  /* @IsOptional()
  @MinLength(15)
  @MaxLength(50)*/
  //@UploadedFiles()
  submmitedWork?: String
}
