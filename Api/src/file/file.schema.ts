import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type FileDocument = File & Document

@Schema()
export class File {
  @Prop()
  id: string

  @Prop()
  filename: string
  @Prop()
  metadata?: object
  @Prop()
  contentType?: string
  @Prop()
  disableMD5?: boolean
  @Prop()
  aliases?: Array<string>
  @Prop()
  chunkSizeBytes?: number
  @Prop()
  start?: number
  @Prop()
  end?: number
  @Prop()
  revision?: number
}
export const FileSchema = SchemaFactory.createForClass(File)

FileSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  },
})
