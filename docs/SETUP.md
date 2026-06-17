# Ledgerly Setup

## Prerequisites

Required:

* Node.js
* npm
* Docker
* PostgreSQL

---

# Clone Repository

```bash
git clone <repository-url>
cd Ledgerly
```

---

# Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

# Environment Variables

Create:

```text
.env
```

Populate required variables.

See:

* AUTH_CONTEXT.md
* DATABASE.md

---

# Start PostgreSQL

Example:

```bash
docker compose up -d
```

or

```bash
docker start postgres
```

depending on environment.

---

# Generate Drizzle Migration

```bash
npm run db:generate
```

---

# Apply Migration

```bash
npm run db:migrate
```

---

# Start Development Server

```bash
npm run dev
```

---

# Frontend URL

```text
http://localhost:3000
```

---

# Documentation

Product Requirements:

* PRD.md

Architecture:

* ARCHITECTURE.md

Database:

* DATABASE.md

Features:

* Design/FEATURES.md

Design System:

* Design/DESIGN_SYSTEM.md

Authentication:

* AUTH_CONTEXT.md

AI Features:

* AI_CONTEXT.md

Tasks:

* TASKS.md

```
```
