import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accounts } from './entities/account.entity';
import { CheckingAccounts } from './entities/checking-account.entity';
import { SavingsAccounts } from './entities/savings-account.entity';
import { UsersModule } from '../users/users.module';
import { AccountsService } from './services/accounts.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Accounts, CheckingAccounts, SavingsAccounts]),
    UsersModule,
  ],
  providers: [AccountsService],
  exports: [AccountsService],
})
export class AccountsModule {}
