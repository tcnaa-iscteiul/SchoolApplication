export interface IStudentLesson {
  lessonId: string;
  lessonSummary: string;
  lessonDate: string;
  lessonClassWork?: string;
  lessonSummaryId:string;
  lessonStudentPresence?: boolean;
  lessonStudentAbsence?: string;
  lessonStudentSubmmitedClassWork?: string;
}
