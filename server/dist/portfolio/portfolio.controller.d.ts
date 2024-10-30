import { PortfolioService } from './portfolio.service';
import { Portfolio } from './portfolio.entity';
import { Response } from 'express';
export declare class PortfolioController {
    private readonly portfolioService;
    constructor(portfolioService: PortfolioService);
    create(file: Express.Multer.File, portfolioData: Partial<Portfolio>): Promise<Portfolio>;
    findAll(): Promise<Portfolio[]>;
    findOne(id: number): Promise<Portfolio>;
    showAllHiddenProjects(): Promise<void>;
    update(id: number, file: Express.Multer.File, portfolioData: Partial<Portfolio>): Promise<Portfolio>;
    remove(id: number): Promise<void>;
    findUploadedFile(filename: string, res: Response): void;
    toggleVisibility(id: number): Promise<Portfolio>;
}
