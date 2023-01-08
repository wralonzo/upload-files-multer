import { join } from 'path';
import { existsSync } from 'fs';
import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { createFile } from 'src/helper/file-filter';


@Injectable()
export class FilesService {
  public async create(name: string) {
    const fileName = `${ uuid() }.png`;
    const bufferAttachment = Buffer.from(
      name.replace(/^data:image\/\w+;base64,/, ''),
      'base64',
    );

    const path = join(__dirname, '../../static/uploads')
    await createFile(path, fileName, bufferAttachment);
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
