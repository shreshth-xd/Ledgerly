"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Edit, AlertCircle, CheckCircle2 } from "lucide-react";

const budgets = [
    {
        id: 1,
        name: "Monthly Budget",
        spent: 18420,
        limit: 30000,
    },
    {
        id: 2,
        name: "Food Budget",
        spent: 6500,
        limit: 10000,
    },
    {
        id: 3,
        name: "Travel Budget",
        spent: 2200,
        limit: 5000,
    },
];

export default function BudgetsPage() {
    return (
        <main className="p-6 md:p-8 space-y-8 max-w-5xl mx-auto w-full">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-white tracking-tight">Active Budgets</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Control your limits and spending velocity</p>
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg px-4 py-2 text-xs font-semibold flex items-center gap-1.5 shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
                            <Plus className="size-4" /> Create Budget
                        </Button>
                    </DialogTrigger>

                    <DialogContent className="bg-[#0E1326] border-white/[0.08] text-white rounded-xl shadow-[0_10px_50px_rgba(0,0,0,0.5)]">
                        <DialogHeader>
                            <DialogTitle className="text-lg font-bold text-white tracking-tight">
                                Create Budget
                            </DialogTitle>
                        </DialogHeader>

                        <div className="space-y-4 mt-2">
                            <Input placeholder="Budget Name" className="bg-white/[0.02] border-white/[0.08] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white text-sm" />

                            <Input
                                type="number"
                                placeholder="Budget Limit"
                                className="bg-white/[0.02] border-white/[0.08] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white text-sm"
                            />

                            <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_4px_15px_rgba(99,102,241,0.2)] hover:scale-[1.01] active:scale-[0.99] transition-all">
                                Save Budget
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {budgets.map((budget) => {
                    const percentage = (budget.spent / budget.limit) * 100;
                    const remaining = budget.limit - budget.spent;
                    
                    let statusLabel = "On Track";
                    let statusColor = "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
                    let statusIcon = CheckCircle2;
                    let glowColor = "bg-emerald-500/5";

                    if (percentage >= 100) {
                        statusLabel = "Limit Exceeded";
                        statusColor = "text-rose-400 bg-rose-500/10 border-rose-500/20";
                        statusIcon = AlertCircle;
                        glowColor = "bg-rose-500/5";
                    } else if (percentage >= 80) {
                        statusLabel = "Approaching Limit";
                        statusColor = "text-amber-400 bg-amber-500/10 border-amber-500/20";
                        statusIcon = AlertCircle;
                        glowColor = "bg-amber-500/5";
                    }

                    const Icon = statusIcon;

                    return (
                        <div
                            key={budget.id}
                            className="relative overflow-hidden bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.15] rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.4),0_0_20px_rgba(99,102,241,0.03)] group"
                        >
                            <div className={`absolute -top-10 -right-10 w-28 h-28 ${glowColor} rounded-full blur-2xl transition-all duration-300 group-hover:scale-110`} />

                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="font-bold text-slate-200 group-hover:text-white transition-colors">
                                        {budget.name}
                                    </h3>
                                    <span className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase">
                                        MONTHLY CYCLE
                                    </span>
                                </div>

                                <div className={`flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-medium border ${statusColor}`}>
                                    <Icon className="size-3" />
                                    {statusLabel}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-end justify-between">
                                    <div>
                                        <span className="text-2xl font-bold text-white tracking-tight">
                                            ₹{budget.spent.toLocaleString()}
                                        </span>
                                        <span className="text-xs text-slate-400 ml-1">
                                            spent
                                        </span>
                                    </div>
                                    <span className="text-sm font-semibold text-slate-300 font-mono">
                                        {percentage.toFixed(0)}%
                                    </span>
                                </div>

                                <Progress value={percentage} className="h-2 bg-white/[0.04]" />
                            </div>

                            <div className="mt-4 flex justify-between items-center text-xs border-t border-white/[0.04] pt-4">
                                <div className="text-slate-400">
                                    Limit: <span className="font-bold text-slate-200">₹{budget.limit.toLocaleString()}</span>
                                </div>
                                <div className="text-slate-400">
                                    Remaining: <span className={`font-bold ${remaining < 0 ? 'text-rose-400' : 'text-emerald-400'}`}>₹{remaining.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="mt-5 flex gap-2 justify-end border-t border-white/[0.04] pt-4">
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
