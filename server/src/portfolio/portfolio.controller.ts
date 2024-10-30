import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { Portfolio } from './portfolio.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Response } from 'express';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + extname(file.originalname);
          callback(null, file.fieldname + '-' + uniqueSuffix);
        },
      }),
    }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() portfolioData: Partial<Portfolio>,
  ) {
    portfolioData.imageUrl = file ? file.filename : null;
    return this.portfolioService.createPortfolio(portfolioData);
  }

  @Get()
  findAll() {
    return this.portfolioService.getPortfolios();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.portfolioService.getPortfolioById(id);
  }
  @Put('show-hidden')
  async showAllHiddenProjects(): Promise<void> {
    return this.portfolioService.showAllHiddenProjects();
  }
  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + extname(file.originalname);
          callback(null, file.fieldname + '-' + uniqueSuffix);
        },
      }),
    }),
  )
  async update(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() portfolioData: Partial<Portfolio>,
  ) {
    portfolioData.imageUrl = file ? file.filename : null;
    return this.portfolioService.updatePortfolio(id, portfolioData);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.portfolioService.deletePortfolio(id);
  }

  @Get('uploads/:filename')
  findUploadedFile(@Param('filename') filename: string, @Res() res: Response) {
    return res.sendFile(`./uploads/${filename}`, { root: '.' });
  }
  @Put(':id/toggle-visibility')
  async toggleVisibility(@Param('id') id: number) {
    return this.portfolioService.togglePortfolioVisibility(id);
  }
}
