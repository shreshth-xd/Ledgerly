import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { DashboardSummaryCards } from "@/components/dashboard-summary-cards";
import { RecentExpensesTable } from "@/components/recent-expenses-table";

export default function Home() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <aside className="w-64 border-r bg-background">
          <div className="border-b px-6 py-4">
            <h1 className="text-xl font-bold">Ledgerly</h1>
          </div>

          <nav className="flex flex-col gap-1 p-3">
            <button className="rounded-md px-3 py-2 text-left hover:bg-accent">
              Dashboard
            </button>

            <button className="rounded-md px-3 py-2 text-left hover:bg-accent">
              Expenses
            </button>

            <button className="rounded-md px-3 py-2 text-left hover:bg-accent">
              Categories
            </button>

            <button className="rounded-md px-3 py-2 text-left hover:bg-accent">
              Budgets
            </button>

            <button className="rounded-md px-3 py-2 text-left hover:bg-accent">
              Recurring
            </button>

            <button className="rounded-md px-3 py-2 text-left hover:bg-accent">
              Settings
            </button>
          </nav>
        </aside>

        <div className="flex flex-1 flex-col">
          <header className="flex h-16 items-center justify-between border-b px-6">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <h2 className="font-semibold">Dashboard</h2>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                INR
              </span>

              <div className="h-8 w-8 rounded-full bg-muted" />
            </div>
          </header>

        <main className="flex-1 space-y-6 p-6">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>

            <p className="text-muted-foreground">
              Track your spending and budgets.
            </p>
          </div>

          <DashboardSummaryCards />
          <RecentExpensesTable />
        </main>
        
        </div>
      </div>
    </SidebarProvider>
  );
}