import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Portfolio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ nullable: true })
  imageUrl: string | null;

  @Column({ nullable: true })
  clientSiteLink: string;

  @Column({ default: true })
  isVisible: boolean;
}
