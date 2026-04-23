import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transactions } from './entities/transaction.entity';
import { Accounts } from '../accounts/entities/account.entity';
import { TransactionService } from './services/transactions.service';
import { TransactionsController } from './controllers/transactions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Transactions, Accounts])],
  providers: [TransactionService],
  exports: [TransactionService],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
