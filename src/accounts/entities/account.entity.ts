import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  TableInheritance,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from '../../users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

@Entity('tb_accounts')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Accounts {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column({ nullable: false, unique: true })
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  accountNumber: number;

  @Column({ nullable: false })
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  bankBranch: number;

  @ApiProperty()
  @Column({ length: 255 })
  accountHolder: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  @IsDecimal()
  @ApiProperty()
  balance: number;

  @Column({ default: true })
  @IsBoolean()
  @ApiProperty()
  isActive: boolean;

  @CreateDateColumn()
  @IsDate()
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @IsDate()
  @ApiProperty()
  updateAt: Date;

  @ManyToOne(() => Users, (user) => user.accounts, { onDelete: 'CASCADE' })
  @ApiProperty({ type: () => Users })
  user: Users;

  @OneToMany(() => Transactions, (transaction) => transaction.account)
  @ApiProperty()
  transactions: Transactions[];
}
