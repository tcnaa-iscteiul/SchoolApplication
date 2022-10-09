import { Injectable } from '@nestjs/common';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';

import { GridFsStorage } from 'multer-gridfs-storage/lib/gridfs';
//import {GridFsStorage} from 'multer-gridfs-storage';


//const GridFsStorage = require('multer-gridfs-storage');


export type MongoGridFSOptions = {
    _id?: string | number | object;
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

@Injectable()
export class GridFsMulterConfigService implements MulterOptionsFactory {
    gridFsStorage;
    gridFsBucket;
    constructor() {
        this.gridFsStorage = new GridFsStorage({
            url: process.env.DB_URL,
            file: (req, file) => {
                return new Promise((resolve, reject) => {
                    const filename:MongoGridFSOptions = file.originalname.trim();
                    const fileInfo = {
                      filename: filename
                    };
                    resolve(fileInfo);
                });
              }
        });
    }
  
    createMulterOptions(): MulterModuleOptions {
        return {
            storage: this.gridFsStorage,
        };
    }
}