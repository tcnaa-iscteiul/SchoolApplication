import { Injectable } from '@nestjs/common'
import { CreateLessonDto } from './dto/create-lesson.dto'
import { UpdateLessonDto } from './dto/update-lesson.dto'
import { LessonsRepository } from './lessons.repository'

@Injectable()
export class LessonsService {
  constructor(private lessonRepository: LessonsRepository) {}

  create(createLessonDto: CreateLessonDto) {
    return this.lessonRepository.create(createLessonDto)
  }

  findAll() {
    return this.lessonRepository.findAll()
  }

  findOne(id: string) {
    return this.lessonRepository.findOne(id)
  }

  update(id: string, updateLessonDto: UpdateLessonDto) {
    return this.lessonRepository.update(id, updateLessonDto)
  }

  remove(id: string) {
    return this.lessonRepository.remove(id)
  }
}
