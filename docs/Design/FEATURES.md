# Features

This document describes the functional capabilities of Ledgerly.

---

# Authentication

Purpose:
Secure user access and account management.

Features:

* Clerk authentication
* Sign up
* Sign in
* Sign out
* Session management
* Protected routes
* User synchronization with Ledgerly database

---
# Dashboard

Purpose:
Provide a quick overview of financial health.

Features:

* Currency selector
* Current month's spending for selected currency
* Current month's budget for selected currency
* Remaining budget for selected currency
* Budget utilization percentage
* Recent expenses for selected currency
* Category spending breakdown
* Spending trends
* Active recurring expenses summary

Notes:

* Dashboard data is always scoped to a single currency.
* Users may switch currencies at any time.
* Analytics from different currencies are never combined.

---

# Expense Management

Purpose:
Allow users to record and manage expenses.

Features:

* Create expense
* Edit expense
* Delete expense
* Restore deleted expense
* Soft delete support
* Categorization
* Receipt uploads
* Expense descriptions
* Expense dates
* Expense history
* Currency assignment per expense

Notes:

* Every expense belongs to exactly one currency.
* Users may create expenses in multiple currencies.

---

# Budgets

Purpose:
Help users manage spending limits.

Features:

* Overall budgets
* Category-specific budgets
* Monthly budgets
* Weekly budgets
* Custom range budgets
* Budget utilization tracking
* Budget progress indicators
* Currency-specific budgets

Notes:

* Every budget belongs to exactly one currency.
* Budgets are evaluated only against expenses in the same currency.

---

# Analytics

Purpose:
Provide insights into spending behavior.

Features:

* Currency selector
* Category spending breakdown
* Monthly spending trends
* Budget utilization insights
* Recurring expense summaries

Notes:

* Analytics are always displayed for one currency at a time.
* Different currencies are never merged.
* No currency conversion is performed.

---

# Settings

Purpose:
Allow user customization.

Features:

* Theme selection
* Profile management
* Default dashboard currency

Theme Options:

* Light
* Dark
* System

---

# Categories

Purpose:
Organize expenses into meaningful groups.

Features:

* System categories
* Custom categories
* Nested categories
* Category hierarchy
* Category editing
* Category deletion
* Category browsing


# Recurring Expenses

Purpose:
Automate repeated expense tracking.

Features:

* Daily recurrence
* Weekly recurrence
* Monthly recurrence
* Quarterly recurrence
* Yearly recurrence
* Automatic expense generation
* Pause recurring expenses
* Resume recurring expenses
* Soft deletion support

---

# Search

Purpose:
Provide fast access to data.

Features:

* Global search
* Expense search
* Category search
* Budget search
* Recurring expense search

Future Possibilities:

* Keyboard shortcuts
* Command palette
* Quick navigation


---



# Audit System

Purpose:
Track important system events.

Features:

* Internal activity logging
* Entity change tracking
* Historical record keeping

Not User Visible

---

# AI Features

Purpose:
Provide intelligent financial assistance.

Status:
Planned

Potential Features:

* Expense categorization assistance
* Spending insights
* Budget recommendations
* Financial summaries
* Receipt extraction assistance

AI-related database structures will be designed when AI features are implemented.

---

# Future Features

Potential Future Enhancements:

* Keyboard shortcuts
* Command palette
* Advanced analytics
* Data export
* Financial reports
* Multi-language support
* Mobile application
* Notifications
* Smart budgeting suggestions
