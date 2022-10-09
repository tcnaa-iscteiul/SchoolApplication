import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  forwardRef,
  Inject,
  BadRequestException,
  UploadedFiles,
  Body,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ClassCreateDto } from './dto/ClassCreate.dto';
import { ClassUpdateDto } from './dto/ClassUpdate.dto';
import { ClassSearchDto } from './dto/ClassSearch.dto';
import { StudentToClassDto } from './dto/StudentToClass.dto';
import { Class, ClassDocument } from './class.schema';
import { TeacherToClassDto } from './dto/AssignTeacherToClass.dto';
import { UserRepository } from '../users/user.repository';
import { UserSearchDto } from 'src/users/dto/UserSearch.dto';
import { Evaluations } from './dto/Evaluations.dto';
import { UpdateEvaluations } from './dto/UpdateEvaluation.dto';
import { CreateLessonDto } from 'src/lessons/dto/create-lesson.dto';
import {
  StudentInformation,
  UpdateLessonDto,
} from 'src/lessons/dto/update-lesson.dto';
import { Role } from 'src/users/dto/UserRole.dto';
import { ObjectId } from 'mongodb';
import { UpdateStudentLessonDto } from 'src/lessons/dto/update-student-data-lesson';

@Injectable()
export class ClassRepository {
  constructor(
    @InjectModel(Class.name) private classModel: Model<ClassDocument>,
    @Inject(forwardRef(() => UserRepository))
    private readonly userModel: UserRepository,
  ) {}

  private ObjectId = mongoose.Types.ObjectId;

  // Create a class, and if already exists a class with the same name, return an error
  async create(classCreateDto: ClassCreateDto): Promise<void> {
    try {
      await new this.classModel(classCreateDto).save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Class with this name already exists!');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  // Find all the classes and populate the table with the data of the teacher and students
  async findAll() {
    return await this.classModel
      .find()
      .populate({
        path: 'teacher students evaluations.student',
        match: { id: { $ne: '' } },
        select: { firstName: 1, lastName: 1, email: 1 },
      })
      .populate({
        path: 'lessons.students.studentName',
        match: { id: { $ne: '' } },
        select: { email: 1 },
      });
  }

  // Find with filters (name, description, startDate or endDate)
  async findWithFilters(filter: ClassSearchDto) {
    const name = Object.is(filter.name, undefined) ? '' : filter.name;
    const description = Object.is(filter.description, undefined)
      ? ''
      : filter.description;
    const startDate = Object.is(filter.startDate, undefined)
      ? ''
      : filter.startDate;
    const endDate = Object.is(filter.endDate, undefined) ? '' : filter.endDate;
    const teacher = Object.is(filter.teacher, undefined) ? '' : filter.teacher;

    return await this.classModel
      .find({
        $and: [
          {
            name: {
              $regex: name,
            },
          },
          {
            description: {
              $regex: description,
            },
          },
          {
            startDate: startDate,
          },
          {
            endDate: endDate,
          },
          {
            teacher: { $regex: teacher },
          },
        ],
      })
      .populate({
        path: 'teacher students evaluations.student',
        match: { id: { $ne: '' } },
        select: { firstName: 1, lastName: 1, email: 1 },
      })
      .exec();
  }

  async delete(classSearchDto: ClassUpdateDto): Promise<void> {
    const result = await this.classModel
      .findOneAndDelete({ name: classSearchDto.name })
      .exec();

    if (!result) {
      throw new NotFoundException('Class with ID not found');
    }
  }

  async update(classUpdateDto: ClassUpdateDto): Promise<void> {
    const result = await this.classModel.findOneAndUpdate(
      { name: classUpdateDto.name },
      {
        name: classUpdateDto.name,
        description: classUpdateDto.description,
        startDate: classUpdateDto.startDate,
        endDate: classUpdateDto.endDate,
      },
      {
        new: true,
      },
    );
    if (!result) {
      throw new NotFoundException('Class with ID not found');
    }
  }

  async createEvaluation(updateClass: ClassUpdateDto) {
    if (!updateClass.name) {
      throw new BadRequestException('The class name is missing!');
    }
    const today = new Date();
    const findClasses = await this.findAll();
    const { name } = updateClass;
    const { endDate, students } = findClasses.find(
      (classes) => classes.name === name,
    );

    if (today.getTime() <= new Date(endDate).getTime()) {
      throw new BadRequestException('The class is still ongoing');
    }

    const evaluation = students.map((item) => {
      const e: Evaluations = {
        student: item.id,
        grade: 0,
      };
      return e;
    });

    const result = await this.classModel.findOneAndUpdate(
      { name },
      { evaluationDate: today, $addToSet: { evaluations: evaluation } },
    );
    if (!result) {
      throw new NotFoundException('Class with ID not found');
    }
  }

  async updateEvaluation(updateEvaluation: UpdateEvaluations) {
    const result = await this.classModel.updateOne(
      {
        name: updateEvaluation.name,
        'evaluations.student': updateEvaluation.student,
      },
      { $set: { 'evaluations.$.grade': updateEvaluation.grade } },
    );
    if (!result) {
      throw new NotFoundException('Class with ID not found');
    }
  }

  async createLesson(createLesson: CreateLessonDto) {
    const ObjectId = mongoose.Types.ObjectId;

    if (!createLesson.className) {
      throw new BadRequestException('The class name is missing!');
    }
    const today = new Date();
    const findClasses = await this.findAll();
    const { className } = createLesson;
    const searchClass = findClasses.find(
      (classes) => classes.name === className,
    );
    if (!searchClass) {
      throw new NotFoundException('Class with ID not found');
    }

    const { startDate, endDate, students, lessons } = searchClass;
    if (today.getTime() < new Date(startDate).getTime()) {
      throw new BadRequestException('The class did not start yet');
    }
    if (today.getTime() > new Date(endDate).getTime()) {
      throw new BadRequestException('The class is finished');
    }
    if (lessons.length > 0) {
      const findSummary = lessons.filter((item: CreateLessonDto) => {
        item.date.getDay() === today.getDay() &&
          item.date.getMonth() === today.getMonth() &&
          item.date.getFullYear() === today.getFullYear();
      });

      if (findSummary) {
        throw new ConflictException('Already exists an summary for this date');
      }
    }

    const studentsLessons = students.map((item) => {
      const e: StudentInformation = {
        studentName: new ObjectId(item.id),
        submmitedWork: '',
        presence: false,
        absence: '',
      };
      return e;
    });
    const { summary } = createLesson;
    const result = await this.classModel.findOneAndUpdate(
      { name: className },
      {
        $addToSet: {
          lessons: {
            date: today,
            summary: summary,
            classWork: '',
            students: studentsLessons,
          },
        },
      },
    );
    if (!result) {
      throw new NotFoundException('Class with ID not found');
    }
  }

  async updateLesson(updateLesson: UpdateLessonDto) {
    const ObjectId = mongoose.Types.ObjectId;
   // console.log(updateLesson);
    const result = await this.classModel.updateOne(
      {
        name: updateLesson.className,
        'lessons.id': new ObjectId(updateLesson.lessonID),
      },
      {
        'lessons.$.classWork': updateLesson.classWork,
      },
    );
   // console.log(result);
    if (result.matchedCount === 0) {
      throw new NotFoundException('Verify the input data');
    }
  }

  async updateLessonStudent(updateLesson: UpdateStudentLessonDto) {
   // console.log("Classes");
   /* updateLesson.className = 'French';
    updateLesson.lessonID='6317685b415fd15d0164d5dc';
    updateLesson.id='631090c9d5af73305d4bbf54';
    updateLesson.presence=true;
    updateLesson.absence='false';
    updateLesson.submmitedWork='test';
    console.log('test');
    console.log(updateLesson);*/
    const ObjectId = mongoose.Types.ObjectId;
    console.log('Update Lesson');
    console.log(updateLesson);
    const {className, lessonID, studentSummaryId, presence, absence, submmitedWork} = updateLesson;
    const result = await this.classModel.updateOne(
      {
        name: className,
        lessons: {
          $elemMatch: {
            _id: new ObjectId(lessonID), //summary
            'students.id': new this.ObjectId(studentSummaryId),
          },
        },
      },
      {
        $set: {
          'lessons.$[outer].students.$[inner].presence': presence,
          'lessons.$[outer].students.$[inner].absence': absence,
          'lessons.$[outer].students.$[inner].submmitedWork': submmitedWork,
        },
      },
      {
        arrayFilters: [
          { 'outer._id': new this.ObjectId(lessonID) },
          { 'inner._id': new this.ObjectId(studentSummaryId) },
        ],
      },
    );
    console.log('result');
    console.log(result);
    if (result.matchedCount === 0) {
      throw new NotFoundException('Verify the input data');
    }
  }

  async assignStudentsToClass(
    classSearchDto: StudentToClassDto,
  ): Promise<void> {
    const { name, newStudents } = classSearchDto;
    try {
      const findStudent = await this.userModel.findEmail(newStudents);

      if (!findStudent) {
        throw new NotFoundException('User with ID not found');
      }

      const res = await this.classModel.findOneAndUpdate(
        { name },
        { $addToSet: { students: findStudent._id } },
      );
      if (!res) {
        throw new NotFoundException('User with ID not found');
      }
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async removeStudentsFromClass(
    classSearchDto: StudentToClassDto,
  ): Promise<void> {
    const { name, newStudents } = classSearchDto;
    try {
      const findStudent = await this.userModel.findEmail(newStudents);

      if (!findStudent) {
        throw new NotFoundException('User with ID not found');
      }
      const res = await this.classModel.findOneAndUpdate(
        { name },
        { $pull: { students: findStudent._id } },
      );
      if (!res) {
        throw new NotFoundException('User with ID not found');
      }
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async assignTeacherToClass(classSearchDto: TeacherToClassDto): Promise<void> {
    const { name, teacher } = classSearchDto;
    try {
      const findTeacher = await this.userModel.findEmail(teacher);

      if (!findTeacher) {
        throw new NotFoundException('User with ID not found');
      }

      const res = await this.classModel.findOneAndUpdate(
        { name },
        { teacher: findTeacher._id },
      );
      if (!res) {
        throw new NotFoundException('User with ID not found');
      }
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async removeTeacherFromClass(
    classSearchDto: TeacherToClassDto,
  ): Promise<void> {
    const { name, teacher } = classSearchDto;
    try {
      const findTeacher = await this.userModel.findEmail(teacher);

      if (!findTeacher) {
        throw new NotFoundException('User with ID not found');
      }
      const res = await this.classModel.findOneAndUpdate(
        { name },
        { teacher: null },
      );
      if (!res) {
        throw new NotFoundException('User with ID not found');
      }
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async getNrClasses() {
    const nrClasses = await this.classModel.count();
    const nrStudents = await this.userModel.getNrUsers({
      role: Role.Student,
      email: '',
      phone: '',
    });
    const nrTeachers = await this.userModel.getNrUsers({
      role: Role.Teacher,
      email: '',
      phone: '',
    });

    return { nrClasses, nrStudents, nrTeachers };
  }

  async getClassByUser(userSearch: UserSearchDto) {
    if (userSearch.role === Role.Student) {
      const response = await this.userModel.getClassByUser();
      const { email } = userSearch;
      const allClasses = response.filter((item) => item.email === email);
      const formatData = allClasses[0].classes.map((item) => {
            const lessons =item.lessons && item.lessons.map((lesson:UpdateLessonDto) =>{
              const data = lesson.students && lesson.students.filter((lessonStudent:StudentInformation) => lessonStudent.studentName.toString() === userSearch.id)||[];


              return {
                lessonId: lesson._id,
                lessonDate: lesson.date.toString().split('T')[0],
                lessonSummary: lesson.summary,
                lessonClassWork: lesson.classWork,    
                lessonSummaryId: data &&data[0] && data[0]._id||'',   
                lessonStudentPresence: data &&data[0] && data[0].presence,
                lessonStudentAbsence:data && data[0] &&data[0].absence,
                lessonStudentSubmmitedClassWork:data &&data[0] &&data[0].submmitedWork
              }
            }) || [];
          
          const grade =  item.evaluations && item.evaluations.filter((evaluation) => evaluation.student.toString() === userSearch.id) || [];

          return {
            studentId: userSearch.id,
            id:item.id,
            name:item.name, 
            description:item.description, 
            startDate:item.startDate, 
            endDate:item.endDate, 
            teacher:item.teacher||null,
            lessonsStudent: lessons ||null,
            evaluations: {
              date: item.evaluationDate || null,
              grade: grade.length>0 ? grade[0].grade : grade
            }
          };
      });
      console.log('Data');
      console.log(formatData);
      return formatData;
    }
    if (userSearch.role === Role.Teacher) {
      const result = await this.classModel.find({ teacher: userSearch }).populate({
        path: 'students evaluations.student lessons.students.studentName',
        match: { id: { $ne: '' } },
        select: { firstName: 1, lastName: 1, email: 1 },
      })
      .exec();

      return result;
    }
  }

  async getNameClassByUser(userSearch: UserSearchDto) {
    if (userSearch.role === Role.Student) {
      const response = await this.userModel.getClassByUser();
      const { email } = userSearch;
      const allClasses = response.filter((item) => item.email === email);
      const classes = allClasses[0].classes;
      return classes.map((item) => item.name);
    } else if (userSearch.role !== Role.Admin) {
      const result = await this.classModel.find({ teacher: userSearch }).exec();
      const response = result.map((item) => item.name);
      return response;
    }
  }

  async getTopFive() {
    const allClasses = await this.findAll();

    const result = allClasses
      .sort((a, b) => b.students?.length - a.students?.length)
      .filter((item, index) => index < 5)
      .map((item) => {
        return {
          name: item.name,
          description: item.description,
          id: new this.ObjectId(),
        };
      });

    return result;
  }
}
