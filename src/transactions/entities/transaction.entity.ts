import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDecimal, IsEnum } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TransactionType } from '../enums/transaction-type.enum';
import { Accounts } from '../../accounts/entities/account.entity';

@Entity({ name: 'tb_transactions' })
export class Transactions {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @IsEnum(TransactionType)
  @Column({ type: 'enum', enum: TransactionType })
  type: TransactionType;

  @ApiProperty()
  @IsDecimal()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @ApiProperty()
  @IsDecimal()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  balanceBefore: number;

  @ApiProperty()
  @IsDecimal()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  balanceAfter: number;

  @ApiProperty()
  @Column({ nullable: true })
  description: string;

  @ApiProperty()
  @IsDate()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ type: () => Accounts })
  @ManyToOne(() => Accounts, (account) => account.transactions, {
    onDelete: 'CASCADE',
  })
  account: Accounts;

  @ApiProperty({ type: () => Accounts })
  @ManyToOne(() => Accounts, (account) => account.transactions, {
    onDelete: 'CASCADE',
  })
  relatedAccount?: Accounts;
}
