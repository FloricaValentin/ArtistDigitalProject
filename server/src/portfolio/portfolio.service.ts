import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Portfolio } from './portfolio.entity';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(Portfolio)
    private portfolioRepository: Repository<Portfolio>,
  ) {}

  async createPortfolio(portfolioData: Partial<Portfolio>): Promise<Portfolio> {
    const portfolio = this.portfolioRepository.create(portfolioData);
    return this.portfolioRepository.save(portfolio);
  }

  async getPortfolios(): Promise<Portfolio[]> {
    return this.portfolioRepository.find();
  }

  async getPortfolioById(id: number): Promise<Portfolio> {
    return this.portfolioRepository.findOne({ where: { id } });
  }

  async updatePortfolio(
    id: number,
    portfolioData: Partial<Portfolio>,
  ): Promise<Portfolio> {
    const existingPortfolio = await this.portfolioRepository.findOne({
      where: { id },
    });
    if (!existingPortfolio) {
      throw new Error('Portfolio item not found');
    }

    if (!portfolioData.imageUrl) {
      portfolioData.imageUrl = existingPortfolio.imageUrl;
    }

    await this.portfolioRepository.update(id, portfolioData);
    return this.portfolioRepository.findOne({ where: { id } });
  }
  async deletePortfolio(id: number): Promise<void> {
    await this.portfolioRepository.delete(id);
  }
  async togglePortfolioVisibility(id: number): Promise<Portfolio> {
    const portfolio = await this.portfolioRepository.findOne({ where: { id } });
    if (!portfolio) throw new Error('Portfolio item not found');

    portfolio.isVisible = !portfolio.isVisible;
    await this.portfolioRepository.save(portfolio);
    return portfolio;
  }
  async showAllHiddenProjects(): Promise<void> {
    await this.portfolioRepository
      .createQueryBuilder()
      .update(Portfolio)
      .set({ isVisible: true })
      .where('isVisible = :isVisible', { isVisible: false })
      .execute();
  }
}
