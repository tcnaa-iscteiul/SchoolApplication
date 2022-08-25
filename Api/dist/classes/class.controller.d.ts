import { TeacherToClassDto } from './dto/AssignTeacherToClass.dto';
import { ClassCreateDto } from './dto/ClassCreate.dto';
import { ClassSearchDto } from './dto/ClassSearch.dto';
import { ClassUpdateDto } from './dto/ClassUpdate.dto';
import { StudentToClassDto } from './dto/StudentToClass.dto';
import { Class } from './class.schema';
import { ClassService } from './class.service';
export declare class ClassController {
  private classService;
  constructor(classService: ClassService);
  create(classCreateDto: ClassCreateDto): Promise<void>;
  getAll(param: ClassSearchDto): Promise<Class[]>;
  updateClass(classUpdateDto: ClassUpdateDto): Promise<void>;
  deleteClass(param: ClassUpdateDto): Promise<void>;
  assignStudentsToClass(classSearchDto: StudentToClassDto): Promise<void>;
  removeStudentsFromClass(classSearchDto: StudentToClassDto): Promise<void>;
  assignTeacherToClass(classSearchDto: TeacherToClassDto): Promise<void>;
  removeTeacherFromClass(classSearchDto: TeacherToClassDto): Promise<void>;
  getNrClasses(): Promise<number>;
  getClassByUser(): Promise<any[]>;
}
