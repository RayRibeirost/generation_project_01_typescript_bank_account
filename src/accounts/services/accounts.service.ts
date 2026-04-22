import { AccountType, CreateAccountDto } from './../dto/create-account.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Accounts } from '../entities/account.entity';
import { Repository } from 'typeorm';
import { CheckingAccounts } from '../entities/checking-account.entity';
import { SavingsAccounts } from '../entities/savings-account.entity';
import { Users } from '../../users/entities/user.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Accounts)
    private readonly accountsRepository: Repository<Accounts>,
    @InjectRepository(CheckingAccounts)
    private readonly checkingRepository: Repository<CheckingAccounts>,
    @InjectRepository(SavingsAccounts)
    private readonly savingsRepository: Repository<SavingsAccounts>,
  ) {}

  async createAccount(
    createAccountDto: CreateAccountDto,
    user: Users,
  ): Promise<Accounts> {
    const accountNumber = await this.generateAccountNumber();
    if (createAccountDto.type === AccountType.CHECKING) {
      if (createAccountDto.limit === undefined) {
        throw new BadRequestException(
          'Limit is required for Checkings Account',
        );
      }
      const account = this.checkingRepository.create({
        accountNumber,
        bankBranch: createAccountDto.bankBranch,
        accountHolder: createAccountDto.accountHolder,
        limit: createAccountDto.limit,
        user,
      });
      return this.checkingRepository.save(account);
    }

    if (createAccountDto.type === AccountType.SAVINGS) {
      if (createAccountDto.anniversary === undefined) {
        throw new BadRequestException(
          'Anniversary is required for Savings Account',
        );
      }
      const account = this.savingsRepository.create({
        accountNumber,
        bankBranch: createAccountDto.bankBranch,
        accountHolder: createAccountDto.accountHolder,
        anniversary: createAccountDto.anniversary,
        user,
      });
      return this.savingsRepository.save(account);
    }
    throw new BadRequestException('Invalid Account Type');
  }
  async findAllAccounts(): Promise<Accounts[]> {
    return this.accountsRepository.find({
      relations: ['user', 'transactions'],
    });
  }
  async findOneAccount(id: string): Promise<Accounts> {
    const account = await this.accountsRepository.findOne({
      where: { id },
      relations: ['user', 'transactions'],
    });
    if (!account) throw new NotFoundException(`Account ${id} not founded.`);
    return account;
  }
  async findAccountByUser(userId: string): Promise<Accounts[]> {
    return this.accountsRepository.find({
      where: { user: { id: userId } },
      relations: ['transactions'],
    });
  }
  async deactivateAccount(id: string): Promise<Accounts> {
    const account = await this.findOneAccount(id);
    account.isActive = false;
    return this.accountsRepository.save(account);
  }
  private async generateAccountNumber(): Promise<number> {
    while (true) {
      const number = Math.floor(10000000 + Math.random() * 90000000);
      const existing = await this.accountsRepository.findOne({
        where: { accountNumber: number },
      });
      if (!existing) return number;
    }
  }
}
