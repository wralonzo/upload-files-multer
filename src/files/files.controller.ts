import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFiles,
  Res,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter } from 'src/helper/file-filter';
import { FilesService } from './files.service';
import { fileNamer } from '../helper/file-filter';
import { Response } from 'express';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('files[]', 20, {
      fileFilter: fileFilter,
      limits: {
        fieldSize: 1000000,
      },
      storage: diskStorage({
        destination: './static/uploads',
        filename: fileNamer,
      }),
    }),
  )
  create(@UploadedFiles() files, @Body('hola12') body) {
    const responseUrl = files.map((image) => {
      return `http://localhost:3000/files/name/${image.filename}`;
    });

    return responseUrl;
  }

  @Get('name/:name')
  private async findOne(
    @Res() res: Response,
    @Param('name') name: string,
  ) {
    
   const path =  await this.filesService.findOne(name);

   res.sendFile(path);
  }

  @Post('base64')
  private async create64(@Body('base64') base64: string ){
    const data = await this.filesService.create(base64);
    return base64;
  }
}
