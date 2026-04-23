import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transactions } from './entities/transaction.entity';
import { Accounts } from '../accounts/entities/account.entity';
import { TransactionService } from './services/transactions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transactions, Accounts])],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionsModule {}
