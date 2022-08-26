import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
export declare type ClassDocument = Class & Document;
export declare class Class {
    id: string;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    teacher: string;
    students: [string];
}
export declare const ClassSchema: mongoose.Schema<Class, mongoose.Model<Class, any, any, any, any>, {}, {}, any, {}, "type", Class>;
