import { ChildEntity, Column } from 'typeorm';
import { Accounts } from './account.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal } from 'class-validator';

@ChildEntity()
export class CheckingAccounts extends Accounts {
  @ApiProperty()
  @IsDecimal()
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  limit: number;
}
