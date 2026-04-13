import { ApiProperty } from '@nestjs/swagger';
import { TransactionType } from '../enums/transaction-type.enum';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({ enum: TransactionType })
  @IsEnum(TransactionType)
  @IsNotEmpty()
  type: TransactionType;

  @ApiProperty({ example: 100.0 })
  @IsNumber()
  @Min(0.01)
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ example: 'related-account-uuid', required: false })
  @IsUUID()
  @IsOptional()
  relatedAccountId?: string;

  @ApiProperty({ example: 'Rent bill', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}
