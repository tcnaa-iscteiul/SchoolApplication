import { Model } from "mongoose";
import { ClassCreateDto } from "../dto/ClassCreate.dto";
import { ClassUpdateDto } from "../dto/ClassUpdate.dto";
import { ClassSearchDto } from "../dto/ClassSearch.dto";
import { StudentToClassDto } from "../dto/StudentToClass.dto";
import { ClassDocument } from "../schemas/class.schema";
import { UserDocument } from "../schemas/user.schema";
import { TeacherToClassDto } from "../dto/AssignTeacherToClass.dto";
export declare class ClassRepository {
    private classModel;
    private readonly userModel;
    constructor(classModel: Model<ClassDocument>, userModel: Model<UserDocument>);
    create(classCreateDto: ClassCreateDto): Promise<void>;
    findAll(): Promise<Omit<any, never>[]>;
    findWithFilters(filter: ClassSearchDto): Promise<Omit<any, never>[]>;
    delete(classSearchDto: ClassUpdateDto): Promise<void>;
    update(classUpdateDto: ClassUpdateDto): Promise<void>;
    assignStudentsToClass(classSearchDto: StudentToClassDto): Promise<void>;
    removeStudentsFromClass(classSearchDto: StudentToClassDto): Promise<void>;
    assignTeacherToClass(classSearchDto: TeacherToClassDto): Promise<void>;
    removeTeacherFromClass(classSearchDto: TeacherToClassDto): Promise<void>;
    getNrClasses(): Promise<number>;
    getClassByUser(): Promise<any[]>;
}
