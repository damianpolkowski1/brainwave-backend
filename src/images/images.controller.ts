import { Controller, Get, Res, Param } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';

@Controller('images')
export class ImagesController {
  @Get(':imageName')
  serveImage(@Res() res: Response, @Param('imageName') imageName: string) {
    const imagePath = path.join(__dirname, '../..', 'uploads', imageName);
    return res.sendFile(imagePath);
  }
}
