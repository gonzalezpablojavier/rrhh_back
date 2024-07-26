// imagen.controller.ts
import { Controller, Post, UploadedFile, UseInterceptors, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagenService } from './imagen.service';

@Controller('imagen')
export class ImagenController {
  constructor(private readonly imagenService: ImagenService) {}

  @Post('upload/:colaboradorID')
  @UseInterceptors(FileInterceptor('foto'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('colaboradorID') colaboradorID: string
  ) {
    const imageUrl = await this.imagenService.uploadImage(file, colaboradorID);
    return { imageUrl };
  }
}