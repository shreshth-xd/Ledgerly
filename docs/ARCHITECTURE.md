# Ledgerly Architecture

## Overview

Ledgerly is a personal finance management application that helps users track expenses, manage budgets, monitor recurring expenses, and gain insights into their spending habits.

The system follows a modern web application architecture with a clear separation between frontend, backend, database, and future AI services.

---

# Tech Stack

## Frontend

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* shadcn/ui

## Backend

* Next.js Route Handlers
* TypeScript

## Authentication

* Clerk

## Database

* PostgreSQL

## ORM

* Drizzle ORM

## Deployment

* TBD

---

# High Level Architecture

User
↓
Frontend (Next.js)
↓
API Layer
↓
Business Logic
↓
Drizzle ORM
↓
PostgreSQL

---

# Core Systems

## Authentication System

Responsible for:

* User sign in
* User sign up
* Session management
* Protected routes
* User synchronization with database

Documentation:

* AUTH_CONTEXT.md

---

## Expense Management System

Responsible for:

* Expense creation
* Expense updates
* Expense deletion
* Expense categorization
* Receipt attachment
* Expense search

Main Tables:

* users
* expenses
* categories

---

## Budget Management System

Responsible for:

* Overall budgets
* Category budgets
* Monthly budgets
* Weekly budgets
* Yearly budgets
* Custom range budgets

Main Tables:

* budgets

---

## Recurring Expense System

Responsible for:

* Subscription tracking
* Recurring expense templates
* Automatic future expense generation

Main Tables:

* recurring_expenses
* expenses

---

## AI System

Future module.

Responsible for:

* Receipt OCR
* Expense extraction
* Expense categorization
* Spending insights

Documentation:

* AI_CONTEXT.md

---

# Architectural Decisions

## Currency Support

Decision:

Multiple currencies per user.

Reason:

A user may manage expenses across different currencies simultaneously.

Analytics are filtered by currency.

---

## Budget Model

Decision:

Support both overall budgets and category budgets.

Reason:

Many users only want overall monthly budget tracking.

---

## Budget Overlaps

Decision:

Budget periods may overlap.

Reason:

Users may intentionally track different financial goals over the same time period.

---

## Recurring Expenses

Decision:

Future expenses are materialized.

Reason:

Reduces runtime query complexity and reporting overhead.

---

## Audit Logs

Decision:

Store audit logs for important actions.

Reason:

Provides observability and debugging support.

Audit logs are not considered permanent business data.

---

# Current Status

Completed:

* Database Design
* Feature Planning
* Design System
* Project Setup

In Progress:

* Frontend Development

Upcoming:

* Authentication
* Backend APIs
* AI Features
