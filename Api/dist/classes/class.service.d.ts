/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { TeacherToClassDto } from './dto/AssignTeacherToClass.dto';
import { ClassCreateDto } from './dto/ClassCreate.dto';
import { ClassSearchDto } from './dto/ClassSearch.dto';
import { ClassUpdateDto } from './dto/ClassUpdate.dto';
import { StudentToClassDto } from './dto/StudentToClass.dto';
import { ClassRepository } from './class.repository';
import { Class } from './class.schema';
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
    getClassByUser(email: string): Promise<any[]>;
}
