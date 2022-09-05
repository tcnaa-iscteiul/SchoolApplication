import { Injectable } from '@nestjs/common';
import { TeacherToClassDto } from './dto/AssignTeacherToClass.dto';
import { ClassCreateDto } from './dto/ClassCreate.dto';
import { ClassSearchDto } from './dto/ClassSearch.dto';
import { ClassUpdateDto } from './dto/ClassUpdate.dto';
import { StudentToClassDto } from './dto/StudentToClass.dto';
import { ClassRepository } from './class.repository';
import { Class } from './class.schema';
import { UserSearchDto } from 'src/users/dto/UserSearch.dto';
import { UpdateEvaluations } from './dto/UpdateEvaluation.dto';
import { CreateLessonDto } from 'src/lessons/dto/create-lesson.dto';
import { UpdateLessonDto } from 'src/lessons/dto/update-lesson.dto';

@Injectable()
export class ClassService {
  constructor(private classRepository: ClassRepository) {}

  async create(classCreateDto: ClassCreateDto): Promise<void> {
    return await this.classRepository.create(classCreateDto);
  }

  async getAll(): Promise<Class[]> {
    return await this.classRepository.findAll();
  }

  classSearch(classSearchDto: ClassSearchDto) {
    return this.classRepository.findWithFilters(classSearchDto);
  }

  async delete(classSearchDto: ClassUpdateDto): Promise<void> {
    return await this.classRepository.delete(classSearchDto);
  }

  async update(classUpdateDto: ClassUpdateDto): Promise<void> {
    return await this.classRepository.update(classUpdateDto);
  }

  async assignStudentsToClass(
    classSearchDto: StudentToClassDto,
  ): Promise<void> {
    return await this.classRepository.assignStudentsToClass(classSearchDto);
  }

  async removeStudentsFromClass(
    classSearchDto: StudentToClassDto,
  ): Promise<void> {
    return await this.classRepository.removeStudentsFromClass(classSearchDto);
  }

  async assignTeacherToClass(classSearchDto: TeacherToClassDto): Promise<void> {
    return await this.classRepository.assignTeacherToClass(classSearchDto);
  }

  async removeTeacherFromClass(
    classSearchDto: TeacherToClassDto,
  ): Promise<void> {
    return await this.classRepository.removeTeacherFromClass(classSearchDto);
  }

  async getNrClasses() {
    return await this.classRepository.getNrClasses();
  }

  async getClassByUser(userSearch: UserSearchDto) {
    return await this.classRepository.getClassByUser(userSearch);
  }

  async createEvaluation(updateClass: ClassUpdateDto) {
    return await this.classRepository.createEvaluation(updateClass);
  }

  async updateEvaluation(updateEvaluation: UpdateEvaluations) {
    return await this.classRepository.updateEvaluation(updateEvaluation);
  }

  async createLesson(createLesson: CreateLessonDto) {
    return await this.classRepository.createLesson(createLesson);
  }

  async updateLesson(updateLesson: UpdateLessonDto) {
    return await this.classRepository.updateLesson(updateLesson);
  }

  async updateLessonStudent(updateLesson: UpdateLessonDto) {
    return await this.classRepository.updateLessonStudent(updateLesson);
  }
}
