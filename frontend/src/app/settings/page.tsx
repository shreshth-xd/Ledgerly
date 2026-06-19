"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { User, ShieldAlert, Sliders, Save, Trash } from "lucide-react";

export default function SettingsPage() {
    return (
        <main className="p-6 md:p-8 space-y-8 max-w-3xl mx-auto w-full">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-white tracking-tight">System Settings</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Control your workspace and account preferences</p>
                </div>
            </div>

            {/* Profile Section */}
            <div className="bg-white/[0.02] border border-white/[0.08] rounded-xl p-6 space-y-6 shadow-[0_8px_30px_rgb(0,0,0,0.3)]">
                <div className="flex items-center gap-2.5 pb-4 border-b border-white/[0.04]">
                    <User className="size-5 text-indigo-400" />
                    <div>
                        <h3 className="font-bold text-white text-sm">Personal Profile</h3>
                        <p className="text-[11px] text-slate-400">Update your user identification details</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="grid gap-2">
                        <label className="text-xs font-semibold text-slate-300">Full Name</label>
                        <Input placeholder="Full Name" defaultValue="Alex Rivera" className="bg-white/[0.02] border-white/[0.08] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white text-sm" />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-xs font-semibold text-slate-300">Email Address</label>
                        <Input placeholder="Email" defaultValue="alex@example.com" className="bg-white/[0.02] border-white/[0.08] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white text-sm" />
                    </div>

                    <div className="grid gap-2">
                        <label className="text-xs font-semibold text-slate-300">Short Bio</label>
                        <Textarea placeholder="Bio" defaultValue="Personal finance enthusiast." className="bg-white/[0.02] border-white/[0.08] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white text-sm min-h-[100px]" />
                    </div>

                    <Button className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg px-4 py-2 text-xs font-semibold flex items-center gap-1.5 shadow-[0_4px_15px_rgba(99,102,241,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
                        <Save className="size-4" /> Save Profile
                    </Button>
                </div>
            </div>

            {/* Preferences Section */}
            <div className="bg-white/[0.02] border border-white/[0.08] rounded-xl p-6 space-y-6 shadow-[0_8px_30px_rgb(0,0,0,0.3)]">
                <div className="flex items-center gap-2.5 pb-4 border-b border-white/[0.04]">
                    <Sliders className="size-5 text-indigo-400" />
                    <div>
                        <h3 className="font-bold text-white text-sm">Preferences & Rules</h3>
                        <p className="text-[11px] text-slate-400">Customize notification parameters and interface details</p>
                    </div>
                </div>

                <div className="divide-y divide-white/[0.04] space-y-4">
                    <div className="flex items-center justify-between pt-0">
                        <div>
                            <span className="text-sm font-semibold text-slate-200">Strict Dark Mode</span>
                            <p className="text-xs text-slate-400 mt-0.5">Force charcoal theme system-wide</p>
                        </div>
                        <Switch defaultChecked disabled className="data-[state=checked]:bg-indigo-600" />
                    </div>

                    <div className="flex items-center justify-between pt-4">
                        <div>
                            <span className="text-sm font-semibold text-slate-200">Email Notifications</span>
                            <p className="text-xs text-slate-400 mt-0.5">Receive digests and summary metrics</p>
                        </div>
                        <Switch defaultChecked className="data-[state=checked]:bg-indigo-600" />
                    </div>

                    <div className="flex items-center justify-between pt-4">
                        <div>
                            <span className="text-sm font-semibold text-slate-200">Budget Alerts</span>
                            <p className="text-xs text-slate-400 mt-0.5">Notify when spent reaches 80% limit</p>
                        </div>
                        <Switch defaultChecked className="data-[state=checked]:bg-indigo-600" />
                    </div>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-500/[0.01] border border-red-500/20 rounded-xl p-6 space-y-6 shadow-[0_8px_30px_rgb(0,0,0,0.1)]">
                <div className="flex items-center gap-2.5 pb-4 border-b border-red-500/10">
                    <ShieldAlert className="size-5 text-red-400" />
                    <div>
                        <h3 className="font-bold text-red-400 text-sm">Danger Zone</h3>
                        <p className="text-[11px] text-red-400/75">Actions that can irreversibly delete data</p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <span className="text-sm font-semibold text-slate-200">Delete Account</span>
                        <p className="text-xs text-slate-400 mt-0.5">Delete all categories, budgets, and historical ledgers</p>
                    </div>
                    <Button variant="destructive" className="bg-red-600/10 border border-red-500/30 text-red-400 hover:bg-red-600 hover:text-white rounded-lg px-4 py-2 text-xs font-semibold flex items-center gap-1.5 transition-all">
                        <Trash className="size-4" /> Delete Account
                    </Button>
                </div>
            </div>
        </main>
    );
}
