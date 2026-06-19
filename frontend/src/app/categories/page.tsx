"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Edit, Car, Utensils, Film, Code, HelpCircle } from "lucide-react";

const categories = [
    {
        id: 1,
        name: "Food",
        expenses: 42,
    },
    {
        id: 2,
        name: "Travel",
        expenses: 18,
    },
    {
        id: 3,
        name: "Entertainment",
        expenses: 11,
    },
    {
        id: 4,
        name: "Development",
        expenses: 7,
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

export default function CategoriesPage() {
    return (
        <main className="p-6 md:p-8 space-y-8 max-w-5xl mx-auto w-full">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-white tracking-tight">Category Registry</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Define taxonomies to classify transaction lines</p>
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg px-4 py-2 text-xs font-semibold flex items-center gap-1.5 shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
                            <Plus className="size-4" /> Add Category
                        </Button>
                    </DialogTrigger>

                    <DialogContent className="bg-[#0E1326] border-white/[0.08] text-white rounded-xl shadow-[0_10px_50px_rgba(0,0,0,0.5)]">
                        <DialogHeader>
                            <DialogTitle className="text-lg font-bold text-white tracking-tight">
                                Create Category
                            </DialogTitle>
                        </DialogHeader>

                        <div className="space-y-4 mt-2">
                            <Input placeholder="Category Name" className="bg-white/[0.02] border-white/[0.08] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white text-sm" />

                            <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_4px_15px_rgba(99,102,241,0.2)] hover:scale-[1.01] active:scale-[0.99] transition-all">
                                Save Category
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {categories.map((category) => {
                    const style = getCategoryStyle(category.name);
                    const Icon = style.icon;

                    return (
                        <div
                            key={category.id}
                            className="relative overflow-hidden bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.15] rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.4),0_0_20px_rgba(99,102,241,0.03)] group flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-start justify-between">
                                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${style.bg} ${style.border} group-hover:scale-105 transition-transform duration-200 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]`}>
                                        <Icon className={`size-5 ${style.color}`} />
                                    </div>

                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono border ${style.bg} ${style.color} ${style.border}`}>
                                        {category.expenses} entries
                                    </span>
                                </div>

                                <div className="mt-4">
                                    <h3 className="font-bold text-slate-200 group-hover:text-white transition-colors text-base">
                                        {category.name}
                                    </h3>
                                    <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                                        Expense allocation and budget rules apply.
                                    </p>
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
