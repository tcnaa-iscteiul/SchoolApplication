import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import * as mongoose from 'mongoose'

export type LessonDocument = Lesson & Document

@Schema()
export class Lesson {
  @Prop()
  id: string

  @Prop({ type: Date })
  date: Date

  @Prop({ required: true })
  summary: string

  @Prop()
  classWork: string

  @Prop([
    {
      type: new mongoose.Schema({
        studentName: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        submmitedWork: String,
        presence: Boolean,
        absence: { myJsonProperty: Object },
      }),
    },
  ])
  students: [
    {
      studentName: string
      submmitedWork: string
      presence: boolean
      abcence: JSON
    },
  ]
}

export const LessonSchema = SchemaFactory.createForClass(Lesson)

LessonSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  },
})
