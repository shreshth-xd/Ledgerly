# Users

Purpose:
Stores application users synced from Clerk.

## Columns

* id (UUID, PK)
* clerk_user_id (Unique)
* email (Unique)
* created_at
* updated_at

---

# Categories

Purpose:
Stores both system-defined and user-defined categories used for expense classification.

## Relationships

users (1) ──────── (N) categories

categories (1) ──────── (N) categories
parent           children

## Foreign Keys

* user_id → users.id
* parent_category_id → categories.id

## Business Rules

### System Categories

* Available to all users
* Created by Ledgerly
* Cannot be renamed
* Cannot be deleted
* Can have child categories

### Custom Categories

* Created by users
* Can be renamed
* Can be deleted
* Can have child categories

### Category Name Uniqueness

Category names must be unique per user.

Valid:

User A:

* Anime Merch
* DevFest Travel

User B:

* Anime Merch

Invalid:

User A:

* Anime Merch
* Anime Merch

### Hierarchical Categories

Categories support parent-child relationships.

Examples:

Food
├── Restaurants
├── Groceries
└── Snacks

Travel
├── Flights
└── Hotels

A category may have:

* Zero children
* One child
* Many children

System categories and custom categories can both act as parents.

## Columns

* id (UUID, PK)
* user_id (Nullable UUID)
* name (VARCHAR 100)
* is_system (BOOLEAN)
* parent_category_id (Nullable UUID)
* created_at
* updated_at

## Examples

Food (System)
├── Restaurants
├── Groceries
└── Snacks

Travel (System)
├── Flights
└── Hotels

Food (System)
└── Anime Cafe Visits (Custom)

Travel (System)
└── DevFest Conferences (Custom)

---

# Expenses

Purpose:
Stores all expense records created by users.

## Relationships

users (1) ──────── (N) expenses

categories (1) ──────── (N) expenses

## Foreign Keys

* user_id → users.id
* category_id → categories.id

## Business Rules

* Every expense belongs to exactly one user.
* Every expense belongs to exactly one category.
* An expense may have one receipt.
* An expense cannot have multiple receipts.
* Soft deletes are supported.
* Expense date is independent of record creation date.
* AI-generated expenses are tracked separately.

## Columns

* id (UUID, PK)
* user_id (UUID)
* category_id (UUID)
* amount (NUMERIC 12,2)
* title (VARCHAR 255)
* description (TEXT, nullable)
* expense_date (TIMESTAMP)
* receipt_url (TEXT, nullable)
* ai_generated (BOOLEAN)
* created_at
* updated_at
* deleted_at (nullable)

## Indexes

### expenses_user_id_idx

Purpose:
Fast retrieval of all expenses belonging to a user.

### expenses_category_id_idx

Purpose:
Fast retrieval of all expenses belonging to a category.

### expenses_expense_date_idx

Purpose:
Fast retrieval of expenses within a date range.

## Examples

Expense:

* Title: Uber Ride
* Amount: 250.00
* Category: Travel
* Expense Date: 2026-06-15

Expense:

* Title: McDonald's Dinner
* Amount: 420.00
* Category: Food > Restaurants
* Receipt: Uploaded








# Budgets

Purpose:
Stores user-defined budgets for overall spending and category-specific spending.

## Relationships

users (1) ──────── (N) budgets

categories (1) ──────── (N) budgets

## Foreign Keys

- user_id → users.id
- category_id → categories.id

## Business Rules

- Supports overall budgets.
- Supports category-specific budgets.
- Supports both simultaneously.
- Budgets may overlap in time.
- Users may edit budgets.
- No budget revision history is stored.
- Soft deletes are supported.

## Budget Types

- WEEKLY
- MONTHLY
- QUARTERLY
- CUSTOM

## Overall Budgets

Overall budgets are represented by:

category_id = NULL

Example:

₹50,000 Monthly Budget

## Category Budgets

Category budgets are represented by:

category_id = Category UUID

Example:

Food Budget → ₹10,000

Travel Budget → ₹5,000

## Uniqueness Constraint

A user cannot create duplicate budgets for the same:

- category
- period type
- start date
- end date

Examples:

Valid:

Food
MONTHLY
2026-06-01 → 2026-06-30

Travel
MONTHLY
2026-06-01 → 2026-06-30

Invalid:

Food
MONTHLY
2026-06-01 → 2026-06-30

Food
MONTHLY
2026-06-01 → 2026-06-30

## Columns

- id (UUID, PK)
- user_id (UUID)
- category_id (Nullable UUID)
- amount (NUMERIC 12,2)
- period_type (ENUM)
- start_date
- end_date
- created_at
- updated_at
- deleted_at

## Indexes

budgets_user_id_idx

Purpose:
Fast retrieval of budgets belonging to a user.

budgets_category_id_idx

Purpose:
Fast retrieval of budgets belonging to a category.

budgets_period_type_idx

Purpose:
Fast retrieval of budgets by period type.







# Recurring Expenses

Purpose:
Stores recurring expense templates that automatically generate expense records.

## Relationships

users (1) ──────── (N) recurring_expenses

categories (1) ──────── (N) recurring_expenses

recurring_expenses (1) ──────── (N) expenses

## Foreign Keys

* user_id → users.id
* category_id → categories.id

## Business Rules

* Recurring expenses act as templates.
* Ledgerly automatically generates expense records.
* Generated expenses participate in analytics and budgeting.
* Generated expenses become independent records.
* Editing a recurring template affects only future generated expenses.
* Editing a generated expense affects only that expense.
* Past occurrences are never generated automatically.
* Soft deletes are supported.

## Frequency Types

* DAILY
* WEEKLY
* MONTHLY
* QUARTERLY
* YEARLY

## Scheduling

Recurring schedules are derived from:

* start_date
* frequency

No additional scheduling metadata is stored.

## Columns

* id (UUID, PK)
* user_id (UUID)
* category_id (UUID)
* title (VARCHAR 255)
* description (TEXT, nullable)
* amount (NUMERIC 12,2)
* frequency (ENUM)
* start_date
* end_date (nullable)
* next_run_at
* is_active
* created_at
* updated_at
* deleted_at

## Indexes

recurring_expenses_user_id_idx

Purpose:
Fast retrieval of recurring expenses belonging to a user.

recurring_expenses_category_id_idx

Purpose:
Fast retrieval by category.

recurring_expenses_next_run_at_idx

Purpose:
Fast scheduler lookup of due recurring expenses.

recurring_expenses_active_idx

Purpose:
Fast filtering of active recurring expenses.

















## Future Improvement

Overall budgets use:

category_id = NULL

PostgreSQL treats NULL values as distinct in UNIQUE constraints.

Because of this, duplicate overall budgets are not fully prevented by the current uniqueness constraint.

Before production release, a partial unique index should be added to enforce:

- One overall budget per user
- Per period
- Per date range
