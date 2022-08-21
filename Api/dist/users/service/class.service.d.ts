import { TeacherToClassDto } from "../dto/AssignTeacherToClass.dto";
import { ClassCreateDto } from "../dto/ClassCreate.dto";
import { ClassSearchDto } from "../dto/ClassSearch.dto";
import { ClassUpdateDto } from "../dto/ClassUpdate.dto";
import { StudentToClassDto } from "../dto/StudentToClass.dto";
import { ClassRepository } from "../repository/class.repository";
import { Class } from "../schemas/class.schema";
export declare class ClassService {
    private classRepository;
    constructor(classRepository: ClassRepository);
    create(classCreateDto: ClassCreateDto): Promise<void>;
    getAll(): Promise<Class[]>;
    classSearch(classSearchDto: ClassSearchDto): any;
    delete(classSearchDto: ClassUpdateDto): Promise<void>;
    update(classUpdateDto: ClassUpdateDto): Promise<void>;
    assignStudentsToClass(classSearchDto: StudentToClassDto): Promise<void>;
    removeStudentsFromClass(classSearchDto: StudentToClassDto): Promise<void>;
    assignTeacherToClass(classSearchDto: TeacherToClassDto): Promise<void>;
    removeTeacherFromClass(classSearchDto: TeacherToClassDto): Promise<void>;
    getNrClasses(): Promise<any>;
    getClassByUser(): Promise<any>;
}
