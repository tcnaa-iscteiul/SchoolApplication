import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectConnection } from '@nestjs/mongoose'
import mongoose, { Connection } from 'mongoose'
import { Db, GridFSBucketReadStream, MongoClient, ObjectID } from 'mongodb'
import { response } from 'express'
import { GridFsStorage } from 'multer-gridfs-storage'
import { MongoGridFS } from 'mongo-gridfs'

export type MongoGridFSOptions = {
  id: string
  filename: string
  metadata?: object
  contentType?: string
  disableMD5?: boolean
  aliases?: Array<string>
  chunkSizeBytes?: number
  start?: number
  end?: number
  revision?: number
}


@Injectable()
export class FilesService {
  private fileModel

  constructor(@InjectConnection() private readonly connection: mongoose.Connection) {
    //const url = mongoose.connection[0].
    /*  const db = async () => {
      const client =  await MongoClient.connect('mongodb://yourhost:27017');
      const db =  client.db('fs');
      this.fileModel = new GridFsStorage({ db, client});
    }
    db();*/
    // this.fileModel = new GridFsStorage(this.connection.db);

    //this.fileModel = new MongoGridFS(this.connection, 'fs');
    /*const connection = mongoose.connect('mongodb://yourhost:27017/database');*/
    //this.fileModel = new GridFsStorage({url.database})
  }

  //async readStream(id: string): Promise<GridFSBucketReadStream> {
  async readStream(id: string) {
    console.log(this.fileModel.findById(id))
    //return await this.fileModel.readFileStream(id);
  }

  // async findInfo(id: string): Promise<MongoGridFSOptions> {
  async findInfo(id: string) {
    //const db:Db =  await this.connection.config({useNewUrlParser: true});
    //this.fileModel = new MongoGridFS(db, 'fs');
    return this.fileModel.find()
    // all set!

    /* this.connection.collection("fs").findOne({_id:id}, function(err, result) {
      if (err) throw err;
      console.log(result.name);
      this.connection.close();
    });*/

    /* .findById(id).catch( err => {throw new HttpException('File not found', HttpStatus.NOT_FOUND)} )
      .then(result => result)
    return{
      id: id,
      filename: result.filename,
      metadata: result.metadata,
      contentType: result.contentType,
      disableMD5: result.disableMD5,
      aliases: result.aliases,
      chunkSizeBytes: result.chunkSizeBytes,
      start: result.number,
      end: result.number,
      revision: result.revision,


    /*  filename: result.filename,
      length: result.length,
      chunkSize: result.chunkSize,
      md5: result.md5,
      contentType: result.contentType      
    }*/
  }

  async deleteFile(id: string): Promise<boolean> {
    return await this.fileModel.delete(id)
  }
}
