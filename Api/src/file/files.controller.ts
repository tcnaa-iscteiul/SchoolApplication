import { Post, Controller, UseInterceptors, UploadedFiles, Get, HttpException, HttpStatus, Param, Res, Body, UploadedFile } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express'
import { MulterField } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import { ClassService } from 'src/classes/class.service';
import { UpdateLessonDto } from 'src/lessons/dto/update-lesson.dto';
import { UpdateStudentLessonDto } from 'src/lessons/dto/update-student-data-lesson';

export type MongoGridFSOptions = {
    id: string;
    filename: string;
    metadata?: object;
    contentType?: string;
    disableMD5?: boolean;
    aliases?: Array<string>;
    chunkSizeBytes?: number;
    start?: number;
    end?: number;
    revision?: number;
};

@Controller('/attachment/files')
export class FilesController {
    constructor(private classService: ClassService) {}
    
    @Post('')
    @UseInterceptors(FilesInterceptor('file'))
    async upload(@UploadedFiles()file, @Body() updateLesson) {
        //const updateLesson:UpdateStudentLessonDto = JSON.parse(lesson);
        //const {className, lessonID, studentSummaryId } = updateLesson;
        //const {className} = updateLesson;
        console.log(file);
        //console.log(file.id);
       // updateLesson = JSON.parse(updateLesson);
        const data:UpdateStudentLessonDto = JSON.parse(updateLesson.updateLesson);
        console.log(data);
        const {className,lessonID,studentSummaryId} = data;
        
        if(!className || !lessonID ||!studentSummaryId) {
            console.log('Please insert all the required fields');
            return new HttpException('Please insert all the required fields', HttpStatus.NOT_FOUND);
        }

        //const files = updateLesson.classWork as any;
        const response = [2,3,4];
        /*files.forEach(file => {
            const fileReponse = {
                originalname: file.originalname,
                encoding: file.encoding,
                mimetype: file.mimetype,
                id: file.id,
                filename: file.filename,
                metadata: file.metadata,
                bucketName: file.bucketName,
                chunkSize: file.chunkSize,
                size: file.size,
                md5: file.md5,
                uploadDate: file.uploadDate,
                contentType: file.contentType,
            };
            response.push(fileReponse);
        });*/
        if(response){
            //updateLesson.submmitedWork='teste';
            //updateLesson.presence=true;
            data.absence=file[0].id;
            console.log(response);
            return await this.classService.updateLessonStudent(data);
        }
    }

    @Get('download/')
        async downloadFile(@Param('id') id: string):Promise<any> {
        /*
        const file = await this.filesService.findInfo(id)        
        const filestream = await this.filesService.readStream(id)
        if(!filestream){
            throw new HttpException('An error occurred while retrieving file', HttpStatus.EXPECTATION_FAILED)
        } 
        res.header('Content-Type', file.contentType);
        res.header('Content-Disposition', 'attachment; filename=' + file.filename);
        return filestream.pipe(res) */
        const _id = new ObjectId(id);
    
        console.log(_id);
        //const db = mongoose.createConnection(process.env.DB_URL);
        //const db = mongoose.connection;
        //db.openUri(process.env.DB_URL, );

        //const resultados = await gridFsBucket.openDownloadStream(_id);
        //return db[0];
    }
}
