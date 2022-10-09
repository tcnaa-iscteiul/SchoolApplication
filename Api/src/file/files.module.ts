import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { MulterModule } from '@nestjs/platform-express';
import { GridFsMulterConfigService } from './multer-config.service.ts';
import { ConfigModule } from '@nestjs/config';
import { ClassModule } from 'src/classes/class.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MulterModule.registerAsync({
            useClass: GridFsMulterConfigService,
        }),
        ClassModule,
    ],
    controllers: [FilesController],
    providers: [GridFsMulterConfigService, FilesController],
    exports:[FilesController, FilesModule]
})
export class FilesModule {}