"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Edit, Calendar, Zap, Play, Server, HelpCircle } from "lucide-react";

const recurringExpenses = [
    {
        id: 1,
        name: "Netflix",
        amount: 649,
        frequency: "Monthly",
        active: true,
    },
    {
        id: 2,
        name: "Spotify",
        amount: 119,
        frequency: "Monthly",
        active: true,
    },
    {
        id: 3,
        name: "GitHub Copilot",
        amount: 850,
        frequency: "Monthly",
        active: false,
    },
];

const getSubscriptionIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("netflix") || n.includes("spotify") || n.includes("youtube")) {
        return { icon: Play, color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20" };
    }
    if (n.includes("copilot") || n.includes("aws") || n.includes("github") || n.includes("vercel")) {
        return { icon: Server, color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20" };
    }
    return { icon: Zap, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" };
};

export default function RecurringPage() {
    return (
        <main className="p-6 md:p-8 space-y-8 max-w-5xl mx-auto w-full">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-white tracking-tight">Recurring Expenses</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Manage active subscriptions and recurring billing</p>
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg px-4 py-2 text-xs font-semibold flex items-center gap-1.5 shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
                            <Plus className="size-4" /> Add Schedule
                        </Button>
                    </DialogTrigger>

                    <DialogContent className="bg-[#0E1326] border-white/[0.08] text-white rounded-xl shadow-[0_10px_50px_rgba(0,0,0,0.5)]">
                        <DialogHeader>
                            <DialogTitle className="text-lg font-bold text-white tracking-tight">
                                New Recurring Expense
                            </DialogTitle>
                        </DialogHeader>

                        <div className="space-y-4 mt-2">
                            <Input placeholder="Subscription Name" className="bg-white/[0.02] border-white/[0.08] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white text-sm" />

                            <Input
                                type="number"
                                placeholder="Amount"
                                className="bg-white/[0.02] border-white/[0.08] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white text-sm"
                            />

                            <Input 
                                placeholder="Frequency (e.g., Monthly)" 
                                className="bg-white/[0.02] border-white/[0.08] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white text-sm" 
                            />

                            <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_4px_15px_rgba(99,102,241,0.2)] hover:scale-[1.01] active:scale-[0.99] transition-all">
                                Save
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {recurringExpenses.map((expense) => {
                    const style = getSubscriptionIcon(expense.name);
                    const Icon = style.icon;

                    return (
                        <div
                            key={expense.id}
                            className="relative overflow-hidden bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.15] rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.4),0_0_20px_rgba(99,102,241,0.03)] group flex flex-col justify-between"
                        >
                            <div className="absolute -top-10 -right-10 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-all duration-300" />
                            
                            <div>
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`h-11 w-11 rounded-xl flex items-center justify-center ${style.bg} ${style.border} group-hover:scale-105 transition-transform duration-200 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]`}>
                                            <Icon className={`size-5 ${style.color}`} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-200 group-hover:text-white transition-colors text-base">
                                                {expense.name}
                                            </h3>
                                            <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                                                {expense.frequency}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded ${expense.active ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-500 bg-slate-500/10'}`}>
                                            {expense.active ? "Active" : "Paused"}
                                        </span>
                                        <Switch checked={expense.active} className="data-[state=checked]:bg-indigo-600" />
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <span className="text-2xl font-bold text-white tracking-tight">
                                        ₹{expense.amount.toLocaleString()}
                                    </span>
                                    <span className="text-xs text-slate-400 ml-1">
                                        per billing period
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 flex gap-2 justify-end border-t border-white/[0.04] pt-4">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-8 text-xs bg-white/[0.02] border-white/[0.08] hover:bg-white/[0.04] hover:text-white rounded-lg transition-colors"
                                >
                                    <Edit className="size-3.5 mr-1" /> Edit
                                </Button>

                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-8 text-xs text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                >
                                    <Trash2 className="size-3.5 mr-1" /> Delete
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </main>
    );
}
