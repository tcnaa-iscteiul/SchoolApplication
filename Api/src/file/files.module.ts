import { Module } from '@nestjs/common'
import { FilesController } from './files.controller'
import { MulterModule } from '@nestjs/platform-express'
import { GridFsMulterConfigService } from './multer-config.service.ts'
import { ConfigModule } from '@nestjs/config'
import { ClassModule } from 'src/classes/class.module'
import { FilesService } from './files.service'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MulterModule.registerAsync({
      useClass: GridFsMulterConfigService,
    }),
    ClassModule,
  ],
  controllers: [FilesController],
  providers: [GridFsMulterConfigService, FilesController, FilesService],
  exports: [FilesController, FilesModule],
})
export class FilesModule {}
