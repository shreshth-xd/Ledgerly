"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Trash2, Edit, Car, Utensils, Film, Code, HelpCircle } from "lucide-react";


import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";

type Category = {
    id: string;
    name: string;
    expenses: number;
    isSystem: boolean;
};

type ApiCategory = {
    id: string;
    name: string;
    expenseCount: number;
    isSystem: boolean;
};

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
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
    const { getToken } = useAuth();

    const fetchCategories = useCallback(async () => {
        const token = await getToken();
        if (!token) {
            setLoading(false);
            return;
        }

        const res = await fetch("http://localhost:5000/categories", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            setLoading(false);
            return;
        }

        const data: ApiCategory[] = await res.json();
        setCategories(
            data.map((category) => ({
                id: category.id,
                name: category.name,
                expenses: Number(category.expenseCount),
                isSystem: category.isSystem,
            }))
        );
        setLoading(false);
    }, [getToken]);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const resetDialog = () => {
        setName("");
        setSelectedCategoryId(null);
    };

    const handleOpenChange = (open: boolean) => {
        setDialogOpen(open);
        if (!open) resetDialog();
    };

    const openCreateDialog = () => {
        resetDialog();
        setDialogOpen(true);
    };

    const openEditDialog = (category: Category) => {
        setSelectedCategoryId(category.id);
        setName(category.name);
        setDialogOpen(true);
    };

    const saveCategory = async () => {
        const trimmed = name.trim();
        if (!trimmed) return;

        const token = await getToken();
        const isEditing = selectedCategoryId !== null;

        const res = await fetch(
            isEditing
                ? `http://localhost:5000/categories/${selectedCategoryId}`
                : "http://localhost:5000/categories",
            {
                method: isEditing ? "PATCH" : "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name: trimmed }),
            }
        );

        if (!res.ok) return;

        setDialogOpen(false);
        resetDialog();
        await fetchCategories();
    };

    return (
        <main className="p-6 md:p-8 space-y-8 max-w-5xl mx-auto w-full">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-white tracking-tight">Category Registry</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Define taxonomies to classify transaction lines</p>
                </div>

                <Button
                    onClick={openCreateDialog}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg px-4 py-2 text-xs font-semibold flex items-center gap-1.5 shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                    <Plus className="size-4" /> Add Category
                </Button>
            </div>

            <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
                <DialogContent className="bg-[#0E1326] border-white/[0.08] text-white rounded-xl shadow-[0_10px_50px_rgba(0,0,0,0.5)]">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-bold text-white tracking-tight">
                            {selectedCategoryId ? "Edit Category" : "Create Category"}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 mt-2">
                        <Input
                            placeholder="Category Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-white/[0.02] border-white/[0.08] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white text-sm"
                        />

                        <Button
                            onClick={saveCategory}
                            disabled={!name.trim()}
                            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_4px_15px_rgba(99,102,241,0.2)] hover:scale-[1.01] active:scale-[0.99] transition-all"
                        >
                            Save Category
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {loading
                    ? Array.from({ length: 4 }).map((_, index) => (
                          <Skeleton
                              key={index}
                              className="h-[220px] rounded-xl bg-white/[0.04]"
                          />
                      ))
                    : categories.length === 0
                      ? (
                          <p className="col-span-full text-sm text-slate-400 text-center py-12">
                              No categories yet. Add one to get started.
                          </p>
                        )
                      : categories.map((category) => {
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
                                    onClick={() => openEditDialog(category)}
                                    disabled={category.isSystem}
                                    className="h-8 text-xs bg-white/[0.02] border-white/[0.08] hover:bg-white/[0.04] hover:text-white rounded-lg transition-colors disabled:opacity-40 disabled:pointer-events-none"
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
