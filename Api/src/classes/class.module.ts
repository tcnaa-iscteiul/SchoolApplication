import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Class, ClassSchema } from './class.schema';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';
import { ClassRepository } from './class.repository';
import { UserModule } from '../users/user.module';
import { LessonsModule } from 'src/lessons/lessons.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Class.name, schema: ClassSchema }]),
    forwardRef(() => UserModule),
    LessonsModule,
  ],
  controllers: [ClassController],
  providers: [ClassRepository, ClassService],
  exports: [ClassService, ClassRepository],
})
export class ClassModule {}
