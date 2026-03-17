import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Accounts } from '../../accounts/entities/account.entity';

@Entity({ name: 'tb_users' })
export class Users {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @IsNotEmpty()
  @Column({ nullable: false })
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @Column({ nullable: false, unique: true })
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @Column({ nullable: false, select: false })
  @ApiProperty()
  password: string;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;

  @OneToMany(() => Accounts, (account) => account.user)
  @ApiProperty()
  accounts: Accounts[];
}
