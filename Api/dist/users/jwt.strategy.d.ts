import { Strategy } from "passport-jwt";
import { Model } from "mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { JwtPayload } from "./jwt-payload.interface";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userCredentials;
    constructor(userCredentials: Model<UserDocument>);
    validate(payload: JwtPayload): Promise<User>;
}
export {};
