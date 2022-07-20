import { IsNotEmpty, IsString, MinLength, MaxLength, Matches } from 'class-validator';
import * as mongoose from 'mongoose';

export const AuthSchema = new mongoose.Schema({//javascript type
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength:6 },
});

export class AuthCredentials extends mongoose.Document {//typescript type
    id: string;
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;
    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
    password: string;
}