import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TeacherToClassDto } from './dto/AssignTeacherToClass.dto';
import { ClassCreateDto } from './dto/ClassCreate.dto';
import { ClassSearchDto } from './dto/ClassSearch.dto';
import { ClassUpdateDto } from './dto/ClassUpdate.dto';
import { StudentToClassDto } from './dto/StudentToClass.dto';
import { Class } from './class.schema';
import { ClassService } from './class.service';
import { Roles } from '../roleGuard/role.decorator';
import { Role } from '../users/dto/UserRole.dto';
import { UserSearchDto } from 'src/users/dto/UserSearch.dto';
import { UpdateEvaluations } from './dto/UpdateEvaluation.dto';
import { CreateLessonDto } from 'src/lessons/dto/create-lesson.dto';
import { UpdateLessonDto } from 'src/lessons/dto/update-lesson.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('class')
export class ClassController {
  constructor(private classService: ClassService) {}

  @Roles(Role.Admin)
  @Post()
  async create(@Body() classCreateDto: ClassCreateDto): Promise<void> {
    return await this.classService.create(classCreateDto);
  }

  @Get('/all')
  async getAll(@Query() param: ClassSearchDto): Promise<Class[]> {
    if (Object.keys(param).length) {
      return this.classService.classSearch(param);
    }
    return this.classService.getAll();
  }

  @Roles(Role.Admin)
  @Patch()
  async updateClass(@Body() classUpdateDto: ClassUpdateDto): Promise<void> {
    return await this.classService.update(classUpdateDto);
  }

  @Roles(Role.Admin)
  @Delete()
  async deleteClass(@Body() param: ClassUpdateDto) {
    return await this.classService.delete(param);
  }

  @Roles(Role.Admin)
  @Patch('/student')
  async assignStudentsToClass(@Body() classSearchDto: StudentToClassDto) {
    return await this.classService.assignStudentsToClass(classSearchDto);
  }

  @Roles(Role.Admin)
  @Patch('/removeStudent')
  async removeStudentsFromClass(@Body() classSearchDto: StudentToClassDto) {
    return await this.classService.removeStudentsFromClass(classSearchDto);
  }

  @Roles(Role.Admin)
  @Patch('/assign')
  async assignTeacherToClass(@Body() classSearchDto: TeacherToClassDto) {
    return await this.classService.assignTeacherToClass(classSearchDto);
  }

  @Roles(Role.Admin)
  @Patch('/remove')
  async removeTeacherFromClass(@Body() classSearchDto: TeacherToClassDto) {
    return await this.classService.removeTeacherFromClass(classSearchDto);
  }

  @Get('/nr')
  async getNrClasses() {
    return await this.classService.getNrClasses();
  }

  @Get()
  async getClassByUser(@Body() userSearch: UserSearchDto) {
    return await this.classService.getClassByUser(userSearch);
  }

  @Patch('/evaluation')
  async createEvaluation(@Body() updateClass: ClassUpdateDto) {
    return await this.classService.createEvaluation(updateClass);
  }

  @Patch('/updateEvaluation')
  async updateEvaluation(@Body() updateEvaluation: UpdateEvaluations) {
    return await this.classService.updateEvaluation(updateEvaluation);
  }
  @Patch('/createLesson')
  async createLesson(@Body() createLesson: CreateLessonDto) {
    return await this.classService.createLesson(createLesson);
  }

  @Patch('/updateLesson')
  async updateLesson(@Body() updateLesson: UpdateLessonDto) {
    return await this.classService.updateLesson(updateLesson);
  }

  @Patch('/updateLessonStudent')
  async updateLessonStudent(@Body() updateLesson: UpdateLessonDto) {
    return await this.classService.updateLessonStudent(updateLesson);
  }
}
