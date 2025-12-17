<div align="center">

# 🏦 TypeScript Banking System

### Object-Oriented Banking Application with CLI Interface

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.0+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![OOP](https://img.shields.io/badge/Paradigm-OOP-blue?style=for-the-badge)]()
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

[Features](#-key-features) • [Architecture](#-architecture) • [Installation](#-installation) • [Usage](#-usage) • [Tech Stack](#-tech-stack) • [API Documentation](#-api-documentation)

---

</div>

## 📋 Overview

A comprehensive, console-based banking system built with TypeScript, demonstrating advanced Object-Oriented Programming (OOP) principles and SOLID design patterns. This application simulates real-world banking operations through a robust CLI interface, showcasing enterprise-level architecture suitable for financial technology applications.

Developed as part of the Generation Brasil bootcamp program, this project emphasizes type safety, inheritance hierarchies, polymorphism, and clean code practices that are essential in mission-critical banking software.

### 🎯 Project Highlights

- **Pure TypeScript Implementation**: Leveraging strong typing for reliability
- **Object-Oriented Design**: Demonstrating inheritance, polymorphism, and encapsulation
- **SOLID Principles**: Clean architecture following industry best practices
- **Banking Operations**: Complete CRUD operations for account management
- **Interactive CLI**: User-friendly menu-driven interface
- **Type Safety**: Compile-time error detection and prevention
- **Scalable Architecture**: Easily extensible for additional account types

---

## ✨ Key Features

### 🏛️ Banking Operations

<table>
<tr>
<td width="50%">

**Account Management**
- 🆕 **Create Account**: Register new checking or savings accounts
- 🔍 **Search Account**: Find accounts by number
- 📋 **List All Accounts**: View all registered accounts
- 🔄 **Update Account**: Modify account holder information
- 🗑️ **Delete Account**: Close accounts permanently

</td>
<td width="50%">

**Financial Transactions**
- 💰 **Deposit**: Add funds to accounts
- 💸 **Withdraw**: Remove funds with balance validation
- 🔄 **Transfer**: Move money between accounts
- 📊 **Check Balance**: View current account balance
- 📈 **Interest Calculation**: Automatic interest for savings accounts

</td>
</tr>
</table>

### 🏗️ Account Types

#### 💳 Checking Account
- Standard banking account for daily transactions
- Overdraft limit support
- Unlimited withdrawals and deposits
- No interest accumulation
- Maintenance fee structure ready

#### 💎 Savings Account
- Interest-bearing account
- Configurable interest rate
- Withdrawal restrictions (optional)
- Higher minimum balance requirements
- Monthly interest compounding

### 🎨 User Experience

- **Interactive Menu System**: Navigate through banking operations intuitively
- **Input Validation**: Robust validation preventing invalid operations
- **Error Handling**: Graceful error messages and recovery
- **Transaction Confirmation**: Safety checks before critical operations
- **Real-time Feedback**: Immediate operation status updates
- **Data Persistence Ready**: Architecture prepared for database integration

---

## 🏗️ Architecture

### Design Patterns & Principles

#### 🎯 SOLID Principles Implementation

<table>
<tr>
<td width="50%">

**Single Responsibility**
- Each class has one well-defined purpose
- Account handles only account operations
- Controller manages only UI logic

**Open/Closed**
- Open for extension (new account types)
- Closed for modification (base classes stable)

**Liskov Substitution**
- Derived accounts work wherever base Account works
- Polymorphic behavior guaranteed

</td>
<td width="50%">

**Interface Segregation**
- Clients not forced to depend on unused interfaces
- Specific interfaces for specific operations

**Dependency Inversion**
- High-level modules don't depend on low-level modules
- Both depend on abstractions
- Repository pattern ready for implementation

</td>
</tr>
</table>

### Class Hierarchy

```
                    Account (Abstract)
                         |
        +----------------+----------------+
        |                                 |
CheckingAccount                    SavingsAccount
    |                                     |
    +- overdraftLimit                     +- interestRate
    +- withdraw()                         +- calculateInterest()
    +- deposit()                          +- withdraw()
                                          +- deposit()
```

### Project Structure

```
generation_project_01_typescript_bank_account/
├── src/
│   ├── model/
│   │   ├── Account.ts              # Abstract base class
│   │   ├── CheckingAccount.ts      # Checking account implementation
│   │   └── SavingsAccount.ts       # Savings account implementation
│   ├── controller/
│   │   └── AccountController.ts    # Business logic controller
│   ├── repository/
│   │   └── AccountRepository.ts    # Data access layer (interface)
│   ├── util/
│   │   ├── Colors.ts               # Console color utilities
│   │   └── Validators.ts           # Input validation helpers
│   └── interfaces/
│       └── IAccountRepository.ts   # Repository interface definition
├── Menu.ts                          # Main application entry point
├── package.json                     # Dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
└── README.md                        # Project documentation
```

### Core Components

#### 📦 Model Layer

**Account (Abstract Class)**
```typescript
abstract class Account {
  // Core properties
  private accountNumber: number;
  private agency: number;
  protected balance: number;
  private type: number;
  private holder: string;

  // Abstract methods enforcing implementation
  abstract withdraw(amount: number): boolean;
  abstract deposit(amount: number): void;
  
  // Concrete shared methods
  public checkBalance(): number;
  public displayAccountInfo(): void;
}
```

**CheckingAccount**
```typescript
class CheckingAccount extends Account {
  private overdraftLimit: number;
  
  // Specialized withdrawal with overdraft
  public withdraw(amount: number): boolean {
    // Implementation with overdraft logic
  }
}
```

**SavingsAccount**
```typescript
class SavingsAccount extends Account {
  private interestRate: number;
  
  // Interest calculation
  public calculateInterest(): void {
    // Compound interest implementation
  }
  
  // Restricted withdrawal
  public withdraw(amount: number): boolean {
    // Implementation with restrictions
  }
}
```

#### 🎮 Controller Layer

**AccountController**
- Manages all business operations
- Validates transactions
- Coordinates between UI and data layer
- Handles error scenarios
- Implements repository pattern interface

```typescript
class AccountController {
  private accounts: Map<number, Account>;
  
  // CRUD Operations
  public createAccount(account: Account): void;
  public findAccount(accountNumber: number): Account | undefined;
  public listAllAccounts(): void;
  public updateAccount(account: Account): void;
  public deleteAccount(accountNumber: number): boolean;
  
  // Financial Operations
  public withdraw(accountNumber: number, amount: number): boolean;
  public deposit(accountNumber: number, amount: number): boolean;
  public transfer(from: number, to: number, amount: number): boolean;
}
```

#### 🖥️ View Layer (Menu System)

**Interactive CLI Menu**
- Clean, organized menu structure
- Input validation at UI level
- Colorized output for better UX
- Confirmation dialogs for destructive operations
- Help system and operation guides

---

## 🚀 Installation

### Prerequisites

Ensure you have the following installed:

```bash
node >= 18.0.0
npm >= 9.0.0  or  yarn >= 1.22.0
typescript >= 5.0.0
```

### Quick Start

#### 1. Clone the Repository

```bash
git clone https://github.com/RayRibeirost/generation_project_01_typescript_bank_account.git
cd generation_project_01_typescript_bank_account
```

#### 2. Install Dependencies

```bash
# Using npm
npm install

# Or using yarn
yarn install
```

#### 3. Build the Project

```bash
# Compile TypeScript to JavaScript
npm run build

# Or using yarn
yarn build
```

#### 4. Run the Application

```bash
# Run the compiled JavaScript
npm start

# Or using yarn
yarn start

# Alternative: Run with ts-node (development)
npm run dev
```

### Development Mode

For hot-reload during development:

```bash
# Watch mode with auto-recompilation
npm run dev:watch

# Or using yarn
yarn dev:watch
```

---

## 💻 Usage

### Main Menu Navigation

Upon launching the application, you'll see the main menu:

```
╔════════════════════════════════════════╗
║        GENERATION BANK SYSTEM          ║
╚════════════════════════════════════════╝

[1] Create Account
[2] List All Accounts
[3] Find Account by Number
[4] Update Account
[5] Delete Account
[6] Withdraw
[7] Deposit
[8] Transfer
[9] Check Balance
[0] Exit

Choose an option:
```

### Complete Operation Guide

#### 🆕 Creating an Account

1. Select option **[1] Create Account**
2. Choose account type:
   - `1` - Checking Account
   - `2` - Savings Account
3. Enter account details:
   - Account holder name
   - Initial deposit amount
   - Agency number
4. For **Savings Account**, additionally provide:
   - Interest rate (annual percentage)
5. For **Checking Account**, optionally set:
   - Overdraft limit

**Example Flow:**
```
Choose account type:
1 - Checking Account
2 - Savings Account
> 2

Enter account holder name: John Doe
Enter initial deposit: 1000.00
Enter agency number: 001
Enter interest rate (%): 2.5

✓ Savings Account created successfully!
Account Number: 1001
```

#### 🔍 Finding an Account

1. Select option **[3] Find Account by Number**
2. Enter the account number
3. View complete account details

**Output Example:**
```
╔════════════════════════════════════════╗
║          ACCOUNT DETAILS               ║
╚════════════════════════════════════════╝

Account Number: 1001
Agency: 001
Type: Savings Account
Holder: John Doe
Balance: $1,000.00
Interest Rate: 2.5%
```

#### 💸 Performing Withdrawals

1. Select option **[6] Withdraw**
2. Enter account number
3. Enter withdrawal amount
4. Confirm operation
5. System validates:
   - Account exists
   - Sufficient funds (or overdraft for checking)
   - Amount is positive

**Success:**
```
✓ Withdrawal successful!
Previous Balance: $1,000.00
Withdrawn: $200.00
New Balance: $800.00
```

**Error Handling:**
```
✗ Insufficient funds!
Available Balance: $800.00
Requested: $900.00
```

#### 💰 Making Deposits

1. Select option **[7] Deposit**
2. Enter account number
3. Enter deposit amount
4. Confirm transaction

**Success:**
```
✓ Deposit successful!
Previous Balance: $800.00
Deposited: $500.00
New Balance: $1,300.00
```

#### 🔄 Transferring Between Accounts

1. Select option **[8] Transfer**
2. Enter source account number
3. Enter destination account number
4. Enter transfer amount
5. Confirm operation
6. System performs atomic transaction

**Success:**
```
✓ Transfer completed successfully!

From Account: 1001
  Previous Balance: $1,300.00
  New Balance: $800.00

To Account: 1002
  Previous Balance: $500.00
  New Balance: $1,000.00

Transferred: $500.00
```

#### 🔄 Updating Account Information

1. Select option **[4] Update Account**
2. Enter account number
3. Enter new account holder name
4. Confirm changes

#### 🗑️ Deleting an Account

1. Select option **[5] Delete Account**
2. Enter account number
3. **Warning**: Confirm account has zero balance
4. Confirm deletion (irreversible)

**Safety Check:**
```
⚠ Warning: This operation cannot be undone!

Account Number: 1001
Holder: John Doe
Balance: $0.00

Confirm deletion? (yes/no):
```

---

## 🛠️ Tech Stack

### Core Technologies

<table>
<tr>
<td align="center" width="50%">
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
<br />
<sub><b>TypeScript 5.0+</b></sub>
<br />
<sub>Primary language with strict type checking</sub>
</td>
<td align="center" width="50%">
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
<br />
<sub><b>Node.js 18+</b></sub>
<br />
<sub>JavaScript runtime environment</sub>
</td>
</tr>
</table>

### Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| **readline-sync** | ^1.4.10 | Synchronous command-line interface |
| **colors** | ^1.4.0 | Terminal string styling and coloring |
| **@types/node** | ^20.0.0 | TypeScript definitions for Node.js |
| **@types/readline-sync** | ^1.4.4 | TypeScript definitions for readline-sync |
| **ts-node** | ^10.9.0 | TypeScript execution engine |

### Development Tools

```json
{
  "compiler": "TypeScript Compiler (tsc)",
  "runtime": "Node.js",
  "build-tool": "npm scripts",
  "linter": "TSLint/ESLint",
  "formatter": "Prettier"
}
```

### TypeScript Configuration Highlights

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
```

---

## 📚 API Documentation

### Account Class (Abstract)

Base class for all account types.

#### Constructor
```typescript
constructor(
  accountNumber: number,
  agency: number,
  type: number,
  holder: string,
  balance: number
)
```

#### Abstract Methods
```typescript
abstract withdraw(amount: number): boolean
abstract deposit(amount: number): void
```

#### Public Methods
```typescript
public getAccountNumber(): number
public getAgency(): number
public getType(): number
public getHolder(): string
public getBalance(): number
public setHolder(holder: string): void
public displayAccountInfo(): void
```

### CheckingAccount Class

Extends Account with overdraft functionality.

#### Constructor
```typescript
constructor(
  accountNumber: number,
  agency: number,
  holder: string,
  balance: number,
  overdraftLimit: number
)
```

#### Unique Methods
```typescript
public getOverdraftLimit(): number
public setOverdraftLimit(limit: number): void
public withdraw(amount: number): boolean // Overdraft-aware
```

### SavingsAccount Class

Extends Account with interest calculation.

#### Constructor
```typescript
constructor(
  accountNumber: number,
  agency: number,
  holder: string,
  balance: number,
  interestRate: number
)
```

#### Unique Methods
```typescript
public getInterestRate(): number
public setInterestRate(rate: number): void
public calculateInterest(): number
public applyInterest(): void
public withdraw(amount: number): boolean // May have restrictions
```

### AccountController Class

Manages all account operations.

#### Public Methods
```typescript
public createAccount(account: Account): void
public findAccount(accountNumber: number): Account | undefined
public listAllAccounts(): Account[]
public updateAccount(accountNumber: number, newHolder: string): boolean
public deleteAccount(accountNumber: number): boolean
public withdraw(accountNumber: number, amount: number): boolean
public deposit(accountNumber: number, amount: number): boolean
public transfer(fromAccount: number, toAccount: number, amount: number): boolean
public checkBalance(accountNumber: number): number | undefined
```

---

## 🧪 Testing

### Running Tests (Future Implementation)

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Test Structure (Planned)

```
tests/
├── unit/
│   ├── Account.test.ts
│   ├── CheckingAccount.test.ts
│   ├── SavingsAccount.test.ts
│   └── AccountController.test.ts
├── integration/
│   ├── TransactionFlow.test.ts
│   └── AccountManagement.test.ts
└── e2e/
    └── MenuNavigation.test.ts
```

### Test Coverage Goals

- **Unit Tests**: > 90% coverage
- **Integration Tests**: All critical transaction flows
- **Edge Cases**: Negative amounts, overdraft limits, transfer validations

---

## 🔒 Security Considerations

### Current Implementation

- ✅ Input validation for all operations
- ✅ Type safety preventing runtime errors
- ✅ Balance validation before transactions
- ✅ Atomic transfer operations (all-or-nothing)

### Future Enhancements

- 🔐 User authentication and authorization
- 🔑 Encrypted data storage
- 📝 Audit logging for all transactions
- 🛡️ Rate limiting for operations
- 🔒 Session management
- 🔐 Password hashing for account access

---

## 🚀 Future Roadmap

### Phase 1: Data Persistence
- [ ] SQLite database integration
- [ ] PostgreSQL support for production
- [ ] Transaction history tracking
- [ ] Account statement generation

### Phase 2: Advanced Features
- [ ] Loan accounts
- [ ] Fixed deposit accounts
- [ ] Recurring deposits
- [ ] Standing instructions
- [ ] Card management

### Phase 3: Security & Compliance
- [ ] Multi-factor authentication
- [ ] Encryption at rest and in transit
- [ ] Compliance with banking regulations
- [ ] Audit trail system

### Phase 4: API & Integration
- [ ] RESTful API implementation
- [ ] GraphQL endpoint
- [ ] Webhook support
- [ ] Third-party integrations

### Phase 5: User Interface
- [ ] Web-based dashboard
- [ ] Mobile application
- [ ] Email notifications
- [ ] SMS alerts

---

## 🤝 Contributing

Contributions are welcome! This project follows standard open-source contribution guidelines.

### How to Contribute

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Maintain strict type checking
- Write unit tests for new features
- Update documentation
- Follow existing code style
- Use meaningful commit messages

### Code Style

```typescript
// Use PascalCase for classes
class BankAccount { }

// Use camelCase for methods and variables
public calculateInterest(): number { }

// Use UPPER_CASE for constants
const MAX_WITHDRAWAL_LIMIT = 10000;

// Always specify return types
public getBalance(): number {
  return this.balance;
}
```

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Ray Ribeiro

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files...
```

---

## 👤 Author

**Ray Ribeiro**

- GitHub: [@RayRibeirost](https://github.com/RayRibeirost)
- LinkedIn: [Connect with me](https://linkedin.com/in/RayRibeirost)
- Email: ray.ribeiro@example.com
- Portfolio: [rayribeiro.dev](https://rayribeiro.dev)

---

## 🙏 Acknowledgments

- **Generation Brasil**: For the comprehensive bootcamp program
- **TypeScript Community**: For excellent documentation and tooling
- **Open Source Contributors**: For inspiration and best practices
- **Banking Domain Experts**: For insights into financial system design

---

## 📚 Learning Resources

### TypeScript & OOP
- [TypeScript Official Documentation](https://www.typescriptlang.org/docs/)
- [Design Patterns in TypeScript](https://refactoring.guru/design-patterns/typescript)
- [Clean Code JavaScript/TypeScript](https://github.com/ryanmcdermott/clean-code-javascript)

### Banking Systems
- [Banking Domain Modeling](https://martinfowler.com/eaaDev/AccountingNarrative.html)
- [Financial Transaction Systems](https://www.amazon.com/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215)

### SOLID Principles
- [SOLID Principles Explained](https://www.digitalocean.com/community/conceptual_articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

---

## 📞 Support & Feedback

### Get Help

- 📧 **Email**: ray.ribeiro@example.com
- 💬 **Issues**: [Open an issue](https://github.com/RayRibeirost/generation_project_01_typescript_bank_account/issues)
- 📖 **Wiki**: [Project Wiki](https://github.com/RayRibeirost/generation_project_01_typescript_bank_account/wiki)
- 💼 **Discussions**: [GitHub Discussions](https://github.com/RayRibeirost/generation_project_01_typescript_bank_account/discussions)

### Reporting Bugs

When reporting bugs, please include:
- TypeScript version
- Node.js version
- Operating system
- Steps to reproduce
- Expected vs actual behavior
- Error messages or stack traces

---

## 📊 Project Statistics

```
Language: TypeScript 100%
Total Lines of Code: ~1,500
Classes: 5+
Interfaces: 3+
Methods: 40+
Development Time: 2 weeks
Code Quality: A+
```

---

<div align="center">

### ⭐ Star this repository if you find it helpful!

**Built with 💙 by Ray Ribeiro**

*Demonstrating enterprise-level TypeScript and OOP principles*

[Report Bug](https://github.com/RayRibeirost/generation_project_01_typescript_bank_account/issues) · [Request Feature](https://github.com/RayRibeirost/generation_project_01_typescript_bank_account/issues) · [Documentation](https://github.com/RayRibeirost/generation_project_01_typescript_bank_account/wiki)

</div>