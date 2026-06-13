import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  boolean,
  unique,
  numeric,
  text
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

  title: varchar("title", {
    length: 255,
  }).notNull(),

  description: text("description"),

  expenseDate: timestamp("expense_date")
    .notNull(),

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