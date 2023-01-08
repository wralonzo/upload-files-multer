import { v4 as uuid } from 'uuid';
import { existsSync, writeFile, mkdirSync } from 'fs';

import { promisify } from 'util';

export const fileFilter = (req, file, callback) => {

    if( !file ) return callback( new Error('File is empty'), false );

    const fileExtension = file.mimetype.split('/')[1];

    const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];

    if( validExtensions.includes( fileExtension ) ) {
        callback( null, true );
    }else{
        req.fileValidationError = 'Invalid file type';
        return callback(new Error('Invalid file type'), false);
    }
  };

  export const fileNamer = (req, file, callback) => {

    if( !file ) return callback( new Error('File is empty'), false );

    const fileExtension = file.mimetype.split('/')[1];

    const fileName = `${ uuid() }.${ fileExtension }`;
    callback( null, fileName );
  };


  export const createFile = async (
    path: string,
    fileName: string,
    data: Buffer,
  ): Promise<void> => {
    if (!checkIfFileOrDirectoryExists(path)) {
      mkdirSync(path);
    }
  
    const writeFiles = promisify(writeFile);
  
    return await writeFiles(`${path}/${fileName}`, data, 'utf8');
  };

  export const checkIfFileOrDirectoryExists = (path: string): boolean => {
    const path_des =  existsSync(path);
    return path_des;
  };