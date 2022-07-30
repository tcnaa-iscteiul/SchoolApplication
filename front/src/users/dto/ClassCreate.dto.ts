import { Transform } from "class-transformer";
import {
    IsString,
    MaxLength,
    MinLength,
    IsAlpha,
    IsDate,
    MinDate,
    Validate,
    IsNotEmpty,
} from "class-validator";

export class ClassCreateDto {
    @IsAlpha()
    @MinLength(2)
    @MaxLength(50)
    @IsNotEmpty()
    name: string;

    @IsString()
    @MinLength(15)
    @MaxLength(50)
    @IsNotEmpty()
    description: string;

    @Transform(({ value }) => new Date(value))
    @IsDate()
    @MinDate(new Date())
    @IsNotEmpty()
    startDate: Date;

    @Transform(({ value }) => new Date(value))
    @IsDate()
    @Validate(MinDate, ["startDate"])
    @IsNotEmpty()
    endDate: Date;
}
