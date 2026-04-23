import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export enum AccountType {
  CHECKING = 'checking',
  SAVINGS = 'savings',
}

export class CreateAccountDto {
  @ApiProperty({ enum: AccountType })
  @IsEnum(AccountType)
  @IsNotEmpty()
  type: AccountType;

  @ApiProperty({ example: 1001 })
  @IsNumber()
  @IsNotEmpty()
  bankBranch: number;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  accountHolder: string;

  @ApiProperty({ example: 500, required: false })
  @IsNumber()
  @Min(0)
  limit?: number;

  @ApiProperty({ example: 15, required: false })
  @IsNumber()
  @Min(1)
  anniversary?: number;
}
