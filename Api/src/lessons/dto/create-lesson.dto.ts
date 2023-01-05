import { MaxLength, MinLength, IsNotEmpty, IsMongoId, IsOptional, IsString } from 'class-validator'
export type File = {
  id: string,
  fieldname: string,
  originalname: string,
  encoding: string,
  mimetype: string,
  buffer: Buffer[],
  size: number
}
export class CreateLessonDto {
  @IsOptional()
  @IsMongoId()
  id: string

  @IsOptional()
  @MinLength(2)
  @MaxLength(50)
  className: string

  @IsString()
  @MinLength(5)
  @MaxLength(3000)
  @IsNotEmpty()
  summary?: string

  classWork?:File

  date?: Date
}
