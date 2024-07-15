import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Feed {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title!: string;

  @Column()
  pubDate!: string;

  @Column()
  author!: string;

  @Column()
  description!: string;

  @Column()
  link!: string;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ type: 'boolean', default: false })
  isRead!: boolean;

  @Column()
  tagName!: string;
}
