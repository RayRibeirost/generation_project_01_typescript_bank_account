import {
  Body,
  Controller,
  Delete,
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
import { AccountsService } from '../services/accounts.service';
import { CreateAccountDto } from '../dto/create-account.dto';
import { CurrentUser } from '../../common/decorators/current-user.decoratir';
import { Users } from '../../users/entities/user.entity';

@ApiTags('accounts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}
  @Post()
  @ApiOperation({ summary: 'Create new bank account' })
  @ApiResponse({
    status: 201,
    description: 'Bank account successfully created',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data for this account type',
  })
  create(
    @Body() createAccountDto: CreateAccountDto,
    @CurrentUser() user: Users,
  ) {
    return this.accountsService.createAccount(createAccountDto, user);
  }
  @Get()
  @ApiOperation({ summary: 'List all bank accounts' })
  findAll() {
    return this.accountsService.findAllAccounts();
  }
  @Get('my-accounts')
  @ApiOperation({ summary: "List all authenticated user's bank accounts" })
  getMyAccounts(@CurrentUser() user: Users) {
    return this.accountsService.findAccountByUser(user.id);
  }
  @Get(':id')
  @ApiOperation({ summary: 'Find bank account by ID' })
  @ApiResponse({ status: 404, description: 'Bank account not founded' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.accountsService.findOneAccount(id);
  }
  @Delete(':id')
  @ApiOperation({ summary: 'Deactivate bank account' })
  deactivate(@Param('id', ParseUUIDPipe) id: string) {
    return this.accountsService.deactivateAccount(id);
  }
}
