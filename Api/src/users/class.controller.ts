import {
    Body,
    Controller,
    Get,
    Post,
    Query,
    Delete,
    Patch,
} from "@nestjs/common";
import { TeacherToClassDto } from "./dto/AssignTeacherToClass.dto";
import { ClassCreateDto } from "./dto/ClassCreate.dto";
import { ClassSearchDto } from "./dto/ClassSearch.dto";
import { ClassUpdateDto } from "./dto/ClassUpdate.dto";
import { StudentToClassDto } from "./dto/StudentToClass.dto";
import { Class } from "./schemas/class.schema";
import { ClassService } from "./service/class.service";

@Controller("class")
export class ClassController {
    constructor(private classService: ClassService) {}

    @Post()
    async create(@Body() classCreateDto: ClassCreateDto): Promise<void> {
        return await this.classService.create(classCreateDto);
    }

    @Get("/all")
    async getAll(@Query() param: ClassSearchDto): Promise<Class[]> {
        if (Object.keys(param).length) {
            return this.classService.classSearch(param);
        } else {
            return this.classService.getAll();
        }
    }
    @Patch()
    async updateClass(@Body() classUpdateDto: ClassUpdateDto): Promise<void> {
        return await this.classService.update(classUpdateDto);
    }

    @Delete()
    async deleteClass(@Query() param: ClassUpdateDto) {
        return await this.classService.delete(param);
    }

    @Patch("/student")
    async assignStudentsToClass(@Body() classSearchDto: StudentToClassDto) {
        return await this.classService.assignStudentsToClass(classSearchDto);
    }

    @Patch("/removeStudent")
    async removeStudentsFromClass(@Body() classSearchDto: StudentToClassDto) {
        return await this.classService.removeStudentsFromClass(classSearchDto);
    }

    @Patch("/assign")
    async assignTeacherToClass(@Body() classSearchDto: TeacherToClassDto) {
        return await this.classService.assignTeacherToClass(classSearchDto);
    }

    @Patch("/remove")
    async removeTeacherFromClass(@Body() classSearchDto: TeacherToClassDto) {
        return await this.classService.removeTeacherFromClass(classSearchDto);
    }

    @Get("/nr")
    async getNrClasses() {
        return await this.classService.getNrClasses();
    }

    @Get()
    async getClassByUser() {
        return await this.classService.getClassByUser();
    }
}
