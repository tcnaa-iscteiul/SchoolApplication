import { IsNotEmpty, IsString, MinLength,MaxLength } from 'class-validator';
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    name: { type: String, unique:true},
    age: { type: Number},
    active: { type: Boolean},
});

export class User {
    id: string;
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    name: string;
    @IsNotEmpty()
    age: number;
    active: boolean;
}