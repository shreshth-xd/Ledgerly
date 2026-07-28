import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  boolean,
  unique,
  numeric,
  text,
  jsonb
} from "drizzle-orm/pg-core";

import { AnyPgColumn } from "drizzle-orm/pg-core";
import { index } from "drizzle-orm/pg-core";
import { pgEnum } from "drizzle-orm/pg-core";
import { date } from "drizzle-orm/pg-core";

export const budgetPeriodEnum = pgEnum("budget_period", [
  "WEEKLY",
  "MONTHLY",
  "QUARTERLY",
  "CUSTOM",
]);


export const recurringFrequencyEnum = pgEnum(
  "recurring_frequency",
  [
    "DAILY",
    "WEEKLY",
    "MONTHLY",
    "QUARTERLY",
    "YEARLY",
  ]
);

export const auditActionEnum = pgEnum("audit_action", [
  "CREATE",
  "UPDATE",
  "DELETE",
  "RESTORE",
]);

export const auditEntityEnum = pgEnum("audit_entity", [
  "USER",
  "CATEGORY",
  "EXPENSE",
  "BUDGET",
  "RECURRING_EXPENSE",
]);

export const currencyEnum = pgEnum("currency", [
"INR",
"USD",
"EUR",
"GBP",
"JPY",
"AUD",
"CAD",
"SGD",
"AED",
]);


// Users table
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),

  clerkUserId: varchar("clerk_user_id", {
    length: 255,
  }).unique(),

  email: varchar("email", {
    length: 255,
  }).notNull().unique(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});

// Categories table
export const categories = pgTable(
  "categories",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: uuid("user_id").references(() => users.id),

    name: varchar("name", {
      length: 100,
    }).notNull(),

    isSystem: boolean("is_system")
      .notNull()
      .default(false),

    parentCategoryId: uuid("parent_category_id").references((): AnyPgColumn => categories.id),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    uniqueUserCategoryName: unique(
      "unique_user_category_name"
    ).on(table.userId, table.name),
  })
);


// Expenses table
export const expenses = pgTable("expenses", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id").notNull().references(() => users.id),

  categoryId: uuid("category_id").notNull().references(() => categories.id),

  amount: numeric("amount", {
    precision: 12,
    scale: 2,
  }).notNull(),

  currency: currencyEnum("currency").default("INR").notNull(),

  title: varchar("title", {
    length: 255,
  }).notNull(),

  description: text("description"),

  expenseDate: timestamp("expense_date")
    .notNull(),
    
  recurringExpenseId: uuid(
    "recurring_expense_id"
  ).references(
    () => recurringExpenses.id
  ),

  receiptUrl: text("receipt_url"),

  aiGenerated: boolean("ai_generated")
    .notNull()
    .default(false),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),

  deletedAt: timestamp("deleted_at"),
},
(table) => ({
    userIdIdx: index("expenses_user_id_idx").on(table.userId),

    categoryIdIdx: index("expenses_category_id_idx").on(
      table.categoryId
    ),

    expenseDateIdx: index("expenses_expense_date_idx").on(
      table.expenseDate
    ),
  })
);



// Budgets table
export const budgets = pgTable(
  "budgets",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),

    categoryId: uuid("category_id")
      .references(() => categories.id),

    amount: numeric("amount", {
      precision: 12,
      scale: 2,
    }).notNull(),

    currency: currencyEnum("currency").default("INR").notNull(),

    periodType: budgetPeriodEnum("period_type")
      .notNull(),

    startDate: date("start_date")
      .notNull(),

    endDate: date("end_date")
      .notNull(),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull(),

    deletedAt: timestamp("deleted_at"),
  },
  (table) => ({
    uniqueBudgetPeriod: unique(
      "unique_budget_period"
    ).on(
      table.userId,
      table.categoryId,
      table.periodType,
      table.startDate,
      table.endDate
    ),

    userIdIdx: index("budgets_user_id_idx").on(
      table.userId
    ),

    categoryIdIdx: index(
      "budgets_category_id_idx"
    ).on(table.categoryId),

    periodTypeIdx: index(
      "budgets_period_type_idx"
    ).on(table.periodType),
  })
);




// Recurring expenses table
export const recurringExpenses = pgTable(
  "recurring_expenses",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),

    categoryId: uuid("category_id")
      .notNull()
      .references(() => categories.id),

    title: varchar("title", {
      length: 255,
    }).notNull(),

    description: text("description"),

    amount: numeric("amount", {
      precision: 12,
      scale: 2,
    }).notNull(),

    currency: currencyEnum("currency").default("INR").notNull(),

    frequency: recurringFrequencyEnum(
      "frequency"
    ).notNull(),

    startDate: date("start_date")
      .notNull(),

    endDate: date("end_date"),

    nextRunAt: timestamp("next_run_at")
      .notNull(),

    isActive: boolean("is_active")
      .default(true)
      .notNull(),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull(),

    deletedAt: timestamp("deleted_at"),
  },
  (table) => ({
    userIdIdx: index(
      "recurring_expenses_user_id_idx"
    ).on(table.userId),

    categoryIdIdx: index(
      "recurring_expenses_category_id_idx"
    ).on(table.categoryId),

    nextRunAtIdx: index(
      "recurring_expenses_next_run_at_idx"
    ).on(table.nextRunAt),

    activeIdx: index(
      "recurring_expenses_active_idx"
    ).on(table.isActive),
  })
);








// Audit logs table

export const auditLogs = pgTable(
  "audit_logs",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),

    entityType: auditEntityEnum("entity_type")
      .notNull(),

    entityId: uuid("entity_id")
      .notNull(),

    action: auditActionEnum("action")
      .notNull(),

    oldData: jsonb("old_data"),

    newData: jsonb("new_data"),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    userIdIdx: index("audit_logs_user_id_idx")
      .on(table.userId),

    entityTypeIdx: index("audit_logs_entity_type_idx")
      .on(table.entityType),

    entityIdIdx: index("audit_logs_entity_id_idx")
      .on(table.entityId),

    createdAtIdx: index("audit_logs_created_at_idx")
      .on(table.createdAt),
  })
);

// Type exports
export type User = typeof users.$inferSelect;

// TODO:
// PostgreSQL UNIQUE constraints treat NULL values as distinct.
// Our current unique constraint does not prevent duplicate
// overall budgets because overall budgets have category_id = NULL.
//
// Before production release, add a partial unique index:
//
// CREATE UNIQUE INDEX unique_overall_budget
// ON budgets (
//   user_id,
//   period_type,
//   start_date,
//   end_date
// )
// WHERE category_id IS NULL;