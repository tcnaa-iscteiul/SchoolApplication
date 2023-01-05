export type File = {
  fieldname: String,
  originalname: String,
  encoding: String,
  mimetype: String,
  buffer: Buffer[],
  size: Number
}

export interface IStudentLesson {
  lessonId: string
  lessonSummary: string
  lessonDate: string
  lessonClassWork?: {name:string, id:string},
  lessonSummaryId: string
  lessonStudentPresence?: boolean
  lessonStudentAbsence?: string
  lessonStudentSubmmitedClassWork?: string
}
