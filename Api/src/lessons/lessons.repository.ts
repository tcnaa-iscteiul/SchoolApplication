import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson, LessonDocument } from './lesson.schema';

@Injectable()
export class LessonsRepository {
  constructor(
    @InjectModel(Lesson.name) private lessonModel: Model<LessonDocument>,
  ) {}

  async create(createLessonDto: CreateLessonDto) {
    const { summary } = createLessonDto;
    try {
      await new this.lessonModel({
        date: new Date(),
        summary: summary,
      }).save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Lesson already exists!');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findAll() {
    return await this.lessonModel.find().populate({
      path: 'students students.studentName',
      match: { id: { $ne: '' } },
      select: { email: 1 },
    });
  }

  async findOne(id: string) {
    const ObjectId = mongoose.Types.ObjectId;
    if (!ObjectId.isValid(id)) {
      throw new NotFoundException('Lesson with ID not found');
    }
    const result = await this.lessonModel.findOne({ _id: new ObjectId(id) });
    if (!result) {
      throw new NotFoundException('Lesson with ID not found');
    }
    return result;
  }

  async update(id: string, updateLessonDto: UpdateLessonDto) {
    const ObjectId = mongoose.Types.ObjectId;
    const result = await this.lessonModel.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        ...updateLessonDto,
      },
      {
        new: true,
      },
    );
    if (!result) {
      throw new NotFoundException('Lesson with ID not found');
    }
  }

  async remove(id: string) {
    const ObjectId = mongoose.Types.ObjectId;
    const result = await this.lessonModel
      .findOneAndDelete({
        _id: new ObjectId(id),
      })
      .exec();
    if (!result) {
      throw new NotFoundException('Lesson with ID not found');
    }
  }
}
