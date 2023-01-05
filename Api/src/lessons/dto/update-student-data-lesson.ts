import mongoose from 'mongoose'

export class StudentInformation {
  _id: string
  studentName?: mongoose.Types.ObjectId
  presence: boolean
  absence: string
  submmitedWork: string
}

export type File = {
  id:string,
  fieldname: String,
  originalname: String,
  encoding: String,
  mimetype: String,
  buffer: Buffer[],
  size: Number
}

export class UpdateStudentLessonDto {
  className: string
  //@IsMongoId()
  //@IsMongoId()
  _id: string

  lessonID: string

  /* @IsOptional()
  @IsString()
  @MinLength(15)
  @MaxLength(50)
  @IsNotEmpty()*/
  classWork?: File

  studentSummaryId: string

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
  submmitedWork?: string
}
