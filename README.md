# 🏦 Bank Account Management System

> **Professional CLI-based banking domain project designed to demonstrate strong Object-Oriented Programming, domain modeling, and clean layered architecture within a financial context.**

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![OOP](https://img.shields.io/badge/Paradigm-Object--Oriented-important)
![CLI](https://img.shields.io/badge/Interface-CLI-lightgrey)

---

## 📌 Executive Summary

This project is a **Bank Account Management System** implemented as a **Command-Line Interface (CLI)** application using **TypeScript**. It models a realistic banking domain with different account types, balances, and operations, enforcing business rules through a clean and expressive **Object-Oriented design**.

The system emphasizes **architecture, domain modeling, and separation of concerns**, reflecting patterns commonly used in **fintechs, banks, and enterprise financial systems**.

---

## 🎯 Project Purpose

This project was built to:

- Demonstrate solid **Object-Oriented Programming (OOP)** fundamentals
- Model a **financial domain** using inheritance and polymorphism
- Apply a **layered architecture** with explicit responsibility boundaries
- Encapsulate business rules within domain entities
- Serve as a strong foundation for enterprise-grade system evolution

The CLI interface was deliberately chosen to prioritize **business logic and architectural clarity**.

---

## 🧠 Business Context

Banking systems operate under strict constraints related to consistency, correctness, and traceability. Even basic operations such as deposits and withdrawals must respect domain rules and invariants.

This system reflects real-world banking concerns by:

- Explicitly modeling **different bank account types**
- Centralizing balance validation and state changes inside domain entities
- Avoiding procedural logic and anemic models

---

## 🏗️ Architecture Overview

The application follows a **classic layered architecture**, commonly adopted in financial and enterprise systems:

```
┌────────────────────┐
│   CLI Interface    │
└─────────┬──────────┘
          │
┌─────────▼──────────┐
│   Controller       │  → Orchestrates user actions and workflows
└─────────┬──────────┘
          │
┌─────────▼──────────┐
│   Domain Model     │  → Business rules and entities
└─────────┬──────────┘
          │
┌─────────▼──────────┐
│   Repository       │  → Persistence abstraction (in-memory)
└────────────────────┘
```

### Architectural Characteristics

- Clear separation of concerns
- Domain-centric design
- Low coupling between layers
- Easy extensibility and refactoring

---

## 🧬 Domain Model & Object-Oriented Design

### Class Hierarchy

```
Account (Base Class)
├── CheckingAccount
└── SavingsAccount
```

### Design Principles Applied

- **Encapsulation**: Account state and balance updates are controlled internally
- **Inheritance**: Specialized account types extend a shared base class
- **Polymorphism**: Controllers and repositories interact with abstractions
- **Single Responsibility Principle**: Each class has a focused purpose

This design mirrors patterns found in **real-world banking and fintech systems**.

---

## ✨ Core Features

- Create bank accounts
- Support for multiple account types:
  - Checking accounts
  - Savings accounts
- Deposit funds
- Withdraw funds with domain validation
- Retrieve and display account balances
- In-memory persistence via repository pattern

---

## 📁 Project Structure (Detailed)

The structure below reflects the **actual layout of the project**, directly matching the contents of the ZIP file:

```
src/
├── model/
│   ├── Account.ts              # Base domain entity with shared banking logic
│   ├── CheckingAccount.ts      # Checking account specialization
│   └── SavingsAccount.ts       # Savings account specialization
│
├── controller/
│   └── AccountController.ts    # Orchestrates CLI commands and use cases
│
├── repository/
│   └── AccountRepository.ts    # In-memory persistence abstraction
│
├── util/
│   └── Colors.ts               # CLI output formatting utilities
│
└── index.ts                    # Application entry point and main menu loop
```

### Structural Rationale

- **model/**
  - Represents the banking domain
  - Encapsulates balance rules and account behavior
  - Avoids anemic domain models

- **controller/**
  - Acts as the application service layer
  - Coordinates user input with domain operations

- **repository/**
  - Abstracts persistence concerns
  - Enables future migration to databases or external services

- **util/**
  - Centralizes cross-cutting CLI concerns

- **index.ts**
  - Serves as the composition root
  - Wires together controllers, repositories, and the CLI flow

This organization mirrors patterns used in **enterprise financial software**.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Running the Application

```bash
npm run start
```

The application launches an interactive CLI menu for managing bank accounts.

---

## 🛠️ Technical Decisions

- **TypeScript** for type safety and maintainability
- **CLI interface** to emphasize domain logic
- **Repository pattern** to decouple persistence from business rules
- **Minimal dependencies** to highlight core engineering skills

These decisions align with technical evaluations used by **international consultancies and fintech companies**.

---

## 🔄 Extensibility & Future Improvements

This project was intentionally designed to be extensible. Potential improvements include:

- Persistent storage (SQL / NoSQL)
- Transaction history and audit logs
- Automated tests (unit and integration)
- REST or GraphQL API exposure
- Authentication and authorization
- Dockerization and CI/CD pipelines

---

## 👤 Author

**Raylander Ribeiro**  
Software Engineer

- Focus: Backend Development & Software Architecture
- Interests: Financial systems, clean code, domain-driven design

---

## 📄 License

This project is licensed under the MIT License.

---

> 💡 **Recruiter Note**: This project demonstrates solid architectural reasoning, Object-Oriented design, and domain modeling — skills that scale directly to enterprise banking and fintech systems.
