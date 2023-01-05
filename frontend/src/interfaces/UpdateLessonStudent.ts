export type MongoGridFSOptions = {
  id: string
  filename: string
  metadata?: object
  contentType?: string
  disableMD5?: boolean
  aliases?: Array<string>
  chunkSizeBytes?: number
  start?: number
  end?: number
  revision?: number
}

export interface UpdateLessonStudent {
  className: string
  lessonID: string
  studentSummaryId: string
  studentId: string
  presence?: boolean
  absence?: string
  submmitedWork?: any
}

export interface UpdateLesson{
  className: string
  lessonID: string
}
