import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { TransactionService } from '../services/transactions.service';
import { CreateTransactionDto } from '../dto/create-transaction.dto';

@ApiTags('transactions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionService) {}
  @Post()
  @ApiOperation({
    summary: 'Create transaction (deposit, withdraw or transfer)',
  })
  @ApiResponse({ status: 201, description: 'Transaction successfully done' })
  @ApiResponse({
    status: 400,
    description: 'Insuficient funds or invalid data',
  })
  @ApiResponse({ status: 404, description: 'Account not founded' })
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.createTransaction(createTransactionDto);
  }
  @Get('account/:accountId')
  @ApiOperation({ summary: 'List all account transactions' })
  findByAccount(@Param('accountId', ParseUUIDPipe) accountId: string) {
    return this.transactionsService.findTransactionByAccount(accountId);
  }
  @Get(':id')
  @ApiOperation({ summary: 'Find transaction by id' })
  @ApiResponse({ status: 404, description: 'Transaction not founded' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.transactionsService.findOneTransaction(id);
  }
}
