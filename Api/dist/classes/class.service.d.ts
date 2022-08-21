import { TeacherToClassDto } from "./dto/AssignTeacherToClass.dto";
import { ClassCreateDto } from "./dto/ClassCreate.dto";
import { ClassSearchDto } from "./dto/ClassSearch.dto";
import { ClassUpdateDto } from "./dto/ClassUpdate.dto";
import { StudentToClassDto } from "./dto/StudentToClass.dto";
import { ClassRepository } from "./class.repository";
import { Class } from "./class.schema";
export declare class ClassService {
    private classRepository;
    constructor(classRepository: ClassRepository);
    create(classCreateDto: ClassCreateDto): Promise<void>;
    getAll(): Promise<Class[]>;
    classSearch(classSearchDto: ClassSearchDto): Promise<Omit<Class & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    delete(classSearchDto: ClassUpdateDto): Promise<void>;
    update(classUpdateDto: ClassUpdateDto): Promise<void>;
    assignStudentsToClass(classSearchDto: StudentToClassDto): Promise<void>;
    removeStudentsFromClass(classSearchDto: StudentToClassDto): Promise<void>;
    assignTeacherToClass(classSearchDto: TeacherToClassDto): Promise<void>;
    removeTeacherFromClass(classSearchDto: TeacherToClassDto): Promise<void>;
    getNrClasses(): Promise<number>;
    getClassByUser(): Promise<any[]>;
}
