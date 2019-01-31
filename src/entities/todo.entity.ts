import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Todo {
  // Use @PrimaryGeneratedColumn('uuid') to generate a UUID string instead of a number
  @PrimaryGeneratedColumn()
  // @ts-ignore
  public id: number;

  @Column()
  // @ts-ignore
  public todo: string;

  @Column()
  // @ts-ignore
  public done: boolean;

  @CreateDateColumn()
  // @ts-ignore
  public create_date: Date;

  @UpdateDateColumn()
  // @ts-ignore
  public update_date: Date;
}
