# Bank Account API

A production-ready financial REST API built with **NestJS**, **TypeScript**, and **PostgreSQL** — fully containerized and deployed to AWS with automated CI/CD.

[![CI/CD Pipeline](https://github.com/RayRibeirost/generation_project_01_typescript_bank_account/actions/workflows/ci.yml/badge.svg)](https://github.com/RayRibeirost/generation_project_01_typescript_bank_account/actions/workflows/ci.yml)

---

## Overview

This project simulates core banking operations — account management, deposits, withdrawals, and transfers — with full ACID compliance, JWT authentication, and production-grade observability. Every infrastructure component is provisioned as code using Terraform.

**Live API:** `http://<EC2_PUBLIC_IP>:3000`  
**Swagger Docs:** `http://<EC2_PUBLIC_IP>:3000/api/docs`

---

## Architecture

```
                          ┌─────────────────────────────────────────┐
                          │              AWS (us-east-1)             │
                          │                                          │
  Client ──────────────── │ ── EC2 (t3.micro) ── Security Group ──  │
  HTTP :3000              │         │                                │
                          │    Docker Container                      │
                          │    NestJS API (Node 20)                  │
                          │         │                                │
                          │         └── Private Subnet ──────────── │
                          │              RDS PostgreSQL 16           │
                          │              (db.t3.micro)               │
                          │                                          │
                          │    CloudWatch Logs + Metrics             │
                          └─────────────────────────────────────────┘

  GitHub Actions CI/CD
  ┌─────────────────────────────────────────────────┐
  │  push to main                                   │
  │      → test (Jest + TypeScript check)           │
  │      → build & push Docker image to Docker Hub  │
  │      → deploy to EC2 via SSH                    │
  └─────────────────────────────────────────────────┘
```

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Framework | NestJS 11 | Modular architecture, DI, TypeScript-first |
| Language | TypeScript 5 | Static typing, compile-time safety |
| ORM | TypeORM 0.3 | STI inheritance, QueryRunner for ACID |
| Database | PostgreSQL 16 | ACID compliance, decimal precision |
| Auth | JWT + Passport | Stateless authentication |
| Docs | Swagger / OpenAPI | Interactive API documentation |
| Container | Docker multi-stage | Minimal production image (~150MB) |
| CI/CD | GitHub Actions | Automated test → build → deploy pipeline |
| IaC | Terraform | Reproducible AWS infrastructure |
| Cloud | AWS EC2 + RDS | Production deployment |
| Observability | CloudWatch + Winston | Structured logs, metrics, alerts |

---

## Features

- **ACID Transactions** — deposits, withdrawals, and transfers use QueryRunner to guarantee atomicity. If any step fails, the entire operation is rolled back.
- **Single Table Inheritance** — `CheckingAccount` and `SavingsAccount` share one database table with a type discriminator column, enabling unified queries across account types.
- **JWT Authentication** — stateless auth with configurable expiration. Password hashing with bcrypt (10 salt rounds).
- **Structured Logging** — every HTTP request is logged as JSON with `traceId`, `method`, `url`, `statusCode`, and `duration_ms` for CloudWatch Logs Insights queries.
- **Health Check** — `/health` endpoint verifies database connectivity, consumed by Docker HEALTHCHECK and AWS monitoring.
- **Infrastructure as Code** — VPC, subnets, EC2, RDS, and Security Groups fully defined in Terraform with remote state on S3.

---

## Project Structure

```
src/
├── app.module.ts                  # Root module
├── main.ts                        # Bootstrap — Helmet, ValidationPipe, Swagger, Winston
├── auth/
│   ├── controllers/auth.controller.ts
│   ├── services/auth.service.ts
│   ├── strategies/jwt.strategy.ts
│   ├── guards/jwt-auth.guard.ts
│   ├── dto/login.dto.ts
│   └── auth.module.ts
├── users/
│   ├── entities/user.entity.ts
│   ├── controllers/users.controller.ts
│   ├── services/users.service.ts
│   ├── dto/
│   └── users.module.ts
├── accounts/
│   ├── entities/
│   │   ├── account.entity.ts          # STI parent — @TableInheritance
│   │   ├── checking-account.entity.ts # @ChildEntity — limit field
│   │   └── savings-account.entity.ts  # @ChildEntity — anniversary field
│   ├── controllers/accounts.controller.ts
│   ├── services/accounts.service.ts
│   ├── dto/
│   └── accounts.module.ts
├── transactions/
│   ├── entities/transaction.entity.ts
│   ├── enums/transaction-type.enum.ts
│   ├── controllers/transactions.controller.ts
│   ├── services/transactions.service.ts  # QueryRunner ACID
│   ├── dto/
│   └── transactions.module.ts
└── common/
    ├── health/health.controller.ts
    ├── logger/logger.module.ts
    ├── interceptors/logging.interceptor.ts
    └── decorators/current-user.decorator.ts

infra/
├── main.tf        # VPC, subnets, EC2, RDS, Security Groups, EIP
├── variables.tf   # Typed variables with sensitive = true for secrets
├── outputs.tf     # EC2 IP, RDS endpoint, API URL
└── user_data.sh   # EC2 bootstrap — Docker install + container start
```

---

## API Endpoints

### Auth
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/auth/login` | Public | Authenticate and receive JWT token |

### Users
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/users` | Public | Create new user |
| GET | `/users` | JWT | List all users |
| GET | `/users/me` | JWT | Get authenticated user |
| GET | `/users/:id` | JWT | Get user by ID |
| PUT | `/users/:id` | JWT | Update user |
| DELETE | `/users/:id` | JWT | Delete user |

### Accounts
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/accounts` | JWT | Create bank account (checking or savings) |
| GET | `/accounts` | JWT | List all accounts |
| GET | `/accounts/my-accounts` | JWT | List authenticated user's accounts |
| GET | `/accounts/:id` | JWT | Get account by ID |
| DELETE | `/accounts/:id` | JWT | Deactivate account |

### Transactions
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/transactions` | JWT | Execute transaction (deposit, withdrawal, transfer) |
| GET | `/transactions/account/:accountId` | JWT | List account transactions |
| GET | `/transactions/:id` | JWT | Get transaction by ID |

---

## Running Locally

### Prerequisites
- Docker and Docker Compose
- Node.js 20+

### Setup

```bash
# Clone the repository
git clone https://github.com/RayRibeirost/generation_project_01_typescript_bank_account
cd generation_project_01_typescript_bank_account

# Create environment file
cp .env.example .env
# Edit .env with your values

# Start database
docker compose up postgres -d

# Install dependencies
npm install

# Start in development mode
npm run start:dev
```

### With Docker Compose (full stack)

```bash
docker compose up -d
```

Access:
- **API:** http://localhost:3000
- **Swagger:** http://localhost:3000/api/docs
- **pgAdmin:** http://localhost:5050

---

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
DATABASE_HOST=localhost
DATABASE_PORT=5433
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
DATABASE_NAME=bankdb
JWT_SECRET=your_jwt_secret_minimum_32_chars
JWT_EXPIRES_IN=1d
```

---

## CI/CD Pipeline

Every push to `main` triggers the GitHub Actions pipeline:

```
push to main
    ├── Job: test
    │     ├── Spin up PostgreSQL service container
    │     ├── npm ci
    │     ├── TypeScript type check (tsc --noEmit)
    │     ├── ESLint
    │     └── Jest
    │
    ├── Job: build (needs: test)
    │     ├── Docker multi-stage build
    │     └── Push to Docker Hub
    │           ├── :latest tag
    │           └── :<commit-sha> tag
    │
    └── Job: deploy (needs: build)
          └── SSH into EC2
                ├── docker pull latest
                ├── docker compose down
                ├── docker compose up -d
                └── docker system prune -f
```

Pull requests run only the `test` job — no build or deploy costs on PRs.

---

## Infrastructure (Terraform)

The entire AWS infrastructure is defined as code in `infra/`:

```
VPC (10.0.0.0/16)
├── Public Subnet (10.0.1.0/24)  — EC2 instance
├── Private Subnet 1 (10.0.2.0/24) — RDS (AZ-1)
└── Private Subnet 2 (10.0.3.0/24) — RDS (AZ-2)

Security Groups:
├── EC2: inbound 22 (SSH), 3000 (API) | outbound all
└── RDS: inbound 5432 from EC2 SG only | outbound all

Remote State: S3 + DynamoDB locking
```

```bash
cd infra
terraform init
terraform plan -var="db_username=..." -var="db_password=..." \
               -var="jwt_secret=..." -var="dockerhub_username=..."
terraform apply
```

---

## Observability

**Structured logs** — every HTTP request produces a JSON log entry:

```json
{
  "level": "info",
  "message": "HTTP Request",
  "traceId": "a1b2c3d4-...",
  "method": "POST",
  "url": "/transactions",
  "statusCode": 201,
  "duration_ms": 87,
  "timestamp": "2026-04-18T10:23:45.123Z"
}
```

**CloudWatch Logs Insights query** — filter errors in production:

```sql
fields @timestamp, traceId, method, url, statusCode, duration_ms
| filter statusCode >= 500
| sort @timestamp desc
| limit 20
```

**Metrics collected by CloudWatch Agent:**
- EC2 CPU utilization
- Memory usage percentage
- Disk usage percentage

---

## Key Technical Decisions

**Why Single Table Inheritance?**  
Checking and savings accounts share most fields. Financial operations only care about balance — not account type. STI allows a single query to fetch any account without JOINs, simplifying the TransactionsService significantly.

**Why QueryRunner for transactions?**  
The standard TypeORM repository commits each save independently. A transfer needs three atomic operations: debit origin, credit destination, create two transaction records. If any step fails, the QueryRunner rolls back everything. Without it, a network error mid-transfer could debit without crediting.

**Why multi-stage Docker build?**  
The builder stage needs TypeScript compiler, ts-node, and all devDependencies (~800MB). Production only needs the compiled `dist/` and runtime dependencies (~150MB). Multi-stage copies only what's needed, producing a smaller and more secure image.

---

## Author

**Raylander Ribeiro Ferreira**  
DevOps & Cloud Engineer | AWS SAA | AWS DVA  
[LinkedIn](https://linkedin.com/in/raylanderribeiro) · [GitHub](https://github.com/RayRibeirost)