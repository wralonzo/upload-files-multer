import { join } from 'path';
import { existsSync } from 'fs';
import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { createFile } from 'src/helper/file-filter';


@Injectable()
export class FilesService {
  public async create(name: string) {


    const bufferImage = Buffer.from(
      name.replace(/^data:image\/\w+;base64,/, ''),
      'base64',
    );
    const mimeType = name.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0];
    const fileExtension = mimeType.split('/')[1];
    const fileName = `${ uuid() }.${fileExtension}`;

    const path = join(__dirname, '../../static/uploads')
    await createFile(path, fileName, bufferImage);
  }

  findAll() {
    
  }

  public async findOne(name: string) {
    const path = join(__dirname, '../../static/uploads', name)

    if(existsSync(path)){
      return path;
    }

    throw new BadRequestException('No image found');

  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
