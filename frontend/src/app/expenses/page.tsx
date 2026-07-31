"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { 
  Car, 
  Utensils, 
  Film, 
  Code, 
  HelpCircle, 
  ChevronRight, 
  Search, 
  Plus, 
  Trash2, 
  Edit, 
  ChevronLeft
} from "lucide-react";

const expenses = [
    {
        id: 1,
        title: "Uber Ride",
        category: "Travel",
        amount: "₹250",
        currency: "INR",
        date: "2026-06-15",
    },
    {
        id: 2,
        title: "McDonald's",
        category: "Food",
        amount: "₹420",
        currency: "INR",
        date: "2026-06-14",
    },
    {
        id: 3,
        title: "Netflix",
        category: "Entertainment",
        amount: "₹649",
        currency: "INR",
        date: "2026-06-13",
    },
    {
        id: 4,
        title: "AWS",
        category: "Development",
        amount: "₹1200",
        currency: "INR",
        date: "2026-06-12",
    },
];

const categoryStyles: Record<string, { icon: any; color: string; bg: string; border: string }> = {
  Travel: {
    icon: Car,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
  },
  Food: {
    icon: Utensils,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  Entertainment: {
    icon: Film,
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
  },
  Development: {
    icon: Code,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
};

const getCategoryStyle = (category: string) => {
  return categoryStyles[category] || {
    icon: HelpCircle,
    color: "text-slate-400",
    bg: "bg-slate-500/10",
    border: "border-slate-500/20",
  };
};




export default function ExpensesPage() {

    return (
        <main className="p-6 md:p-8 space-y-8 max-w-5xl mx-auto w-full">
            {/* Header Actions */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-white tracking-tight">All Transactions</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Filter, search, and manage your ledger records</p>
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg px-4 py-2 text-xs font-semibold flex items-center gap-1.5 shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
                            <Plus className="size-4" /> Add Expense
                        </Button>
                    </DialogTrigger>

                    <DialogContent className="bg-[#0E1326] border-white/[0.08] text-white rounded-xl shadow-[0_10px_50px_rgba(0,0,0,0.5)]">
                        <DialogHeader>
                            <DialogTitle className="text-lg font-bold text-white tracking-tight">
                                Add Expense
                            </DialogTitle>
                        </DialogHeader>

                        <div className="space-y-4 mt-2">
                            <Input placeholder="Expense Title" className="bg-white/[0.02] border-white/[0.08] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white text-sm" />

                            <Input
                                type="number"
                                placeholder="Amount"
                                className="bg-white/[0.02] border-white/[0.08] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white text-sm"
                            />

                            <Select>
                                <SelectTrigger className="bg-white/[0.02] border-white/[0.08] text-slate-300 text-sm">
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>

                                <SelectContent className="bg-[#0E1326] border-white/[0.08] text-white">
                                    <SelectItem value="food" className="focus:bg-white/[0.05] focus:text-white text-sm">Food</SelectItem>
                                    <SelectItem value="travel" className="focus:bg-white/[0.05] focus:text-white text-sm">Travel</SelectItem>
                                    <SelectItem value="entertainment" className="focus:bg-white/[0.05] focus:text-white text-sm">Entertainment</SelectItem>
                                    <SelectItem value="development" className="focus:bg-white/[0.05] focus:text-white text-sm">Development</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select>
                                <SelectTrigger className="bg-white/[0.02] border-white/[0.08] text-slate-300 text-sm">
                                    <SelectValue placeholder="Currency" />
                                </SelectTrigger>

                                <SelectContent className="bg-[#0E1326] border-white/[0.08] text-white">
                                    <SelectItem value="inr" className="focus:bg-white/[0.05] focus:text-white text-sm">INR</SelectItem>
                                    <SelectItem value="usd" className="focus:bg-white/[0.05] focus:text-white text-sm">USD</SelectItem>
                                    <SelectItem value="eur" className="focus:bg-white/[0.05] focus:text-white text-sm">EUR</SelectItem>
                                </SelectContent>
                            </Select>

                            <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_4px_15px_rgba(99,102,241,0.2)] hover:scale-[1.01] active:scale-[0.99] transition-all">
                                Save Expense
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col gap-3 md:flex-row items-center">
                <div className="relative w-full md:max-w-sm">
                  <Search className="absolute left-3 top-2.5 size-4 text-slate-500" />
                  <Input
                      placeholder="Search expenses..."
                      className="pl-9 bg-white/[0.02] border-white/[0.08] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white text-sm placeholder-slate-500"
                  />
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  <Select>
                      <SelectTrigger className="w-full md:w-[160px] bg-white/[0.02] border-white/[0.08] text-slate-300 text-sm">
                          <SelectValue placeholder="Category" />
                      </SelectTrigger>

                      <SelectContent className="bg-[#0E1326] border-white/[0.08] text-white">
                          <SelectItem value="all" className="focus:bg-white/[0.05] focus:text-white text-sm">All Categories</SelectItem>
                          <SelectItem value="food" className="focus:bg-white/[0.05] focus:text-white text-sm">Food</SelectItem>
                          <SelectItem value="travel" className="focus:bg-white/[0.05] focus:text-white text-sm">Travel</SelectItem>
                          <SelectItem value="entertainment" className="focus:bg-white/[0.05] focus:text-white text-sm">Entertainment</SelectItem>
                          <SelectItem value="development" className="focus:bg-white/[0.05] focus:text-white text-sm">Development</SelectItem>
                      </SelectContent>
                  </Select>

                  <Select>
                      <SelectTrigger className="w-full md:w-[130px] bg-white/[0.02] border-white/[0.08] text-slate-300 text-sm">
                          <SelectValue placeholder="Currency" />
                      </SelectTrigger>

                      <SelectContent className="bg-[#0E1326] border-white/[0.08] text-white">
                          <SelectItem value="inr" className="focus:bg-white/[0.05] focus:text-white text-sm">INR</SelectItem>
                          <SelectItem value="usd" className="focus:bg-white/[0.05] focus:text-white text-sm">USD</SelectItem>
                          <SelectItem value="eur" className="focus:bg-white/[0.05] focus:text-white text-sm">EUR</SelectItem>
                      </SelectContent>
                  </Select>
                </div>
            </div>

            {/* Stacked List Cards */}
            <div className="bg-white/[0.02] border border-white/[0.08] rounded-xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.3)]">
                <div className="divide-y divide-white/[0.04]">
                    {expenses.map((expense) => {
                        const style = getCategoryStyle(expense.category);
                        const Icon = style.icon;

                        return (
                            <div 
                                key={expense.id}
                                className="flex items-center justify-between px-6 py-4.5 hover:bg-white/[0.02] transition-colors duration-200 cursor-pointer group"
                            >
                                <div className="flex items-center gap-4 min-w-0">
                                    <div className={`h-11 w-11 rounded-xl flex items-center justify-center ${style.bg} ${style.border} group-hover:scale-105 transition-transform duration-200 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]`}>
                                        <Icon className={`size-5 ${style.color}`} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-semibold text-slate-200 text-sm group-hover:text-white transition-colors truncate">
                                            {expense.title}
                                        </p>
                                        <div className="mt-1 flex items-center gap-2.5">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium border ${style.bg} ${style.color} ${style.border}`}>
                                                {expense.category}
                                            </span>
                                            <span className="text-[11px] text-slate-500 font-mono">
                                                {expense.date}
                                            </span>
                                            <span className="text-[10px] text-slate-600 px-1.5 py-0.5 rounded bg-white/[0.02] border border-white/[0.04] font-semibold">
                                                {expense.currency}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <p className="font-bold text-white text-base font-mono tracking-tight">
                                        {expense.amount}
                                    </p>
                                    
                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="h-8 w-8 text-slate-400 hover:text-white hover:bg-white/[0.05] rounded-lg"
                                        >
                                            <Edit className="size-3.5" />
                                        </Button>

                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="h-8 w-8 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg"
                                        >
                                            <Trash2 className="size-3.5" />
                                        </Button>
                                    </div>
                                    <ChevronRight className="size-4.5 text-slate-600 group-hover:text-slate-400 transition-colors group-hover:translate-x-0.5 duration-200" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-end gap-2.5">
                <Button variant="outline" className="bg-white/[0.02] border-white/[0.08] hover:bg-white/[0.04] text-slate-300 hover:text-white text-xs px-3.5 h-8.5 rounded-lg transition-colors">
                    Previous
                </Button>

                <Button variant="outline" className="bg-white/[0.02] border-white/[0.08] hover:bg-white/[0.04] text-slate-300 hover:text-white text-xs px-3.5 h-8.5 rounded-lg transition-colors">
                    Next
                </Button>
            </div>
        </main>
    );
}
