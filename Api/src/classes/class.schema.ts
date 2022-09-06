import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Evaluations } from './dto/Evaluations.dto';
import { UserSearchDto } from 'src/users/dto/UserSearch.dto';
import { CreateLessonDto } from 'src/lessons/dto/create-lesson.dto';

export type ClassDocument = Class & Document;

const evaluationSchema = new mongoose.Schema({
  date: Date,
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  grade: Number,
});

const student = new mongoose.Schema({
  studentName: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  submmitedWork: String,
  presence: Boolean,
  absence: String,
});

const lessonSchema = new mongoose.Schema({
  date: Date,
  summary: String,
  classWork: String,
  students: [student],
});

@Schema()
export class Class {
  @Prop()
  id: string;

  @Prop({ unique: true, required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, type: Date })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  teacher: UserSearchDto;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
  students: [UserSearchDto];

  @Prop([lessonSchema])
  lessons: [CreateLessonDto];

  @Prop()
  evaluationDate: Date;

  @Prop([evaluationSchema])
  evaluations: Evaluations;
}
export const ClassSchema = SchemaFactory.createForClass(Class);

ClassSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

evaluationSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

lessonSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

student.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});
