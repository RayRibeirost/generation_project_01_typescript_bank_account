import { ChildEntity, Column } from 'typeorm';
import { Accounts } from './account.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

@ChildEntity()
export class SavingsAccounts extends Accounts {
  @ApiProperty()
  @IsNumber()
  @Column()
  anniversary: number;
}
