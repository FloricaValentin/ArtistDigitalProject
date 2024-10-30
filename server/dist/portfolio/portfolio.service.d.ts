import { Repository } from 'typeorm';
import { Portfolio } from './portfolio.entity';
export declare class PortfolioService {
    private portfolioRepository;
    constructor(portfolioRepository: Repository<Portfolio>);
    createPortfolio(portfolioData: Partial<Portfolio>): Promise<Portfolio>;
    getPortfolios(): Promise<Portfolio[]>;
    getPortfolioById(id: number): Promise<Portfolio>;
    updatePortfolio(id: number, portfolioData: Partial<Portfolio>): Promise<Portfolio>;
    deletePortfolio(id: number): Promise<void>;
    togglePortfolioVisibility(id: number): Promise<Portfolio>;
    showAllHiddenProjects(): Promise<void>;
}
