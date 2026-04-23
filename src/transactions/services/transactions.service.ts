import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Transactions } from '../entities/transaction.entity';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { TransactionType } from '../enums/transaction-type.enum';
import { Accounts } from '../../accounts/entities/account.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transactions)
    private readonly transactionsRepository: Repository<Transactions>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async createTransaction(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transactions> {
    switch (createTransactionDto.type) {
      case TransactionType.DEPOSIT:
        return this.deposit(createTransactionDto);
      case TransactionType.WITHDRAW:
        return this.withdraw(createTransactionDto);
      case TransactionType.TRANSFER_OUT:
        return this.transfer(createTransactionDto);
      default:
        throw new BadRequestException('Invalid Transaction Type');
    }
  }
  async findTransactionByAccount(accountId: string): Promise<Transactions[]> {
    return this.transactionsRepository.find({
      where: { account: { id: accountId } },
      relations: ['account', 'relatedAccount'],
      order: { createdAt: 'DESC' },
    });
  }
  async findOneTransaction(id: string): Promise<Transactions> {
    const transaction = await this.transactionsRepository.findOne({
      where: { id },
      relations: ['accounts', 'relatedAccount'],
    });
    if (!transaction)
      throw new NotFoundException(`Transaction ${id} not founded.`);

    return transaction;
  }

  private async deposit(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transactions> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const account = await this.findActiveAccount(
        queryRunner,
        createTransactionDto.accountId,
      );
      const balanceBefore = Number(account.balance);
      account.balance = balanceBefore + createTransactionDto.amount;
      await queryRunner.manager.save(Accounts, account);
      const transaction = queryRunner.manager.create(Transactions, {
        type: TransactionType.DEPOSIT,
        amount: createTransactionDto.amount,
        balanceBefore,
        balanceAfter: account.balance,
        description: createTransactionDto.description ?? 'Deposit',
        account,
      });
      const saved = await queryRunner.manager.save(Transactions, transaction);
      await queryRunner.commitTransaction();
      return saved;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  private async withdraw(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transactions> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const account = await this.findActiveAccount(
        queryRunner,
        createTransactionDto.accountId,
      );
      const balanceBefore = Number(account.balance);
      if (balanceBefore < createTransactionDto.amount) {
        throw new BadRequestException('Insufficient funds');
      }
      account.balance = balanceBefore - createTransactionDto.amount;
      await queryRunner.manager.save(Accounts, account);
      const transaction = queryRunner.manager.create(Transactions, {
        type: TransactionType.WITHDRAW,
        amount: createTransactionDto.amount,
        balanceBefore,
        balanceAfter: account.balance,
        description: createTransactionDto.description ?? 'Withdraw',
        account,
      });
      const saved = await queryRunner.manager.save(Transactions, transaction);
      await queryRunner.commitTransaction();
      return saved;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  private async transfer(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transactions> {
    if (!createTransactionDto.relatedAccountId)
      throw new BadRequestException('Related account is required.');
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const origin = await this.findActiveAccount(
        queryRunner,
        createTransactionDto.accountId,
      );
      const destination = await this.findActiveAccount(
        queryRunner,
        createTransactionDto.relatedAccountId,
      );
      const originBalanceBefore = Number(origin.balance);
      const destinationBalanceBefore = Number(destination.balance);
      if (originBalanceBefore < createTransactionDto.amount)
        throw new BadRequestException('Insuficient funds for this transaction');
      origin.balance = originBalanceBefore - createTransactionDto.amount;
      await queryRunner.manager.save(Accounts, origin);
      destination.balance =
        destinationBalanceBefore + createTransactionDto.amount;
      await queryRunner.manager.save(Accounts, destination);
      const txOut = queryRunner.manager.create(Transactions, {
        type: TransactionType.TRANSFER_OUT,
        amount: createTransactionDto.amount,
        balanceBefore: originBalanceBefore,
        balanceAfter: origin.balance,
        description: createTransactionDto.description ?? 'Transfer Out',
        account: origin,
        relatedAccount: destination,
      });
      const txIn = queryRunner.manager.create(Transactions, {
        type: TransactionType.TRANSFER_IN,
        amount: createTransactionDto.amount,
        balanceBefore: destinationBalanceBefore,
        balanceAfter: destination.balance,
        description: createTransactionDto.description ?? 'Transfer In',
        account: destination,
        relatedAccount: origin,
      });
      await queryRunner.manager.save(Transactions, txOut);
      await queryRunner.manager.save(Transactions, txIn);
      await queryRunner.commitTransaction();
      return txOut;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
  private async findActiveAccount(
    qr: QueryRunner,
    accountId: string,
  ): Promise<Accounts> {
    const account = await qr.manager.findOne(Accounts, {
      where: { id: accountId },
    });
    if (!account)
      throw new NotFoundException(`Account ${accountId} not founded`);
    if (!account.isActive)
      throw new BadRequestException(`Account ${accountId} is inactive`);
    return account;
  }
}
