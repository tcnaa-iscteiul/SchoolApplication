import { TeacherToClassDto } from "./dto/AssignTeacherToClass.dto";
import { ClassCreateDto } from "./dto/ClassCreate.dto";
import { ClassSearchDto } from "./dto/ClassSearch.dto";
import { ClassUpdateDto } from "./dto/ClassUpdate.dto";
import { StudentToClassDto } from "./dto/StudentToClass.dto";
import { Class } from "./schemas/class.schema";
import { ClassService } from "./service/class.service";
export declare class ClassController {
    private classService;
    constructor(classService: ClassService);
    create(classCreateDto: ClassCreateDto): Promise<void>;
    getAll(param: ClassSearchDto): Promise<Class[]>;
    updateClass(classUpdateDto: ClassUpdateDto): Promise<void>;
    deleteClass(param: ClassUpdateDto): Promise<any>;
    assignStudentsToClass(classSearchDto: StudentToClassDto): Promise<any>;
    removeStudentsFromClass(classSearchDto: StudentToClassDto): Promise<any>;
    assignTeacherToClass(classSearchDto: TeacherToClassDto): Promise<any>;
    removeTeacherFromClass(classSearchDto: TeacherToClassDto): Promise<any>;
    getNrClasses(): Promise<any>;
    getClassByUser(): Promise<any>;
}
