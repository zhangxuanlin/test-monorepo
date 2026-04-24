// =============================================================
// DashboardLayout — Persistent sidebar + main content area
// Design: Dark Glassmorphism Elite
// Sidebar: 240px fixed, glass background
// =============================================================

import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  TrendingUp,
  Target,
  Users,
  Zap,
  Contact,
  ShoppingCart,
  GitMerge,
  BarChart3,
  ChevronRight,
  Bell,
  Search,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const SIDEBAR_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663595681188/Utuucis6EMLXNfoB5TBr9f/sidebar-bg-diuvJ2xs3gSQvE7wTPdan2.webp";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    title: "仪表板",
    items: [
      { label: "总览", href: "/dashboard/overview", icon: <LayoutDashboard size={16} /> },
      { label: "营收分析", href: "/dashboard/revenue", icon: <TrendingUp size={16} /> },
      { label: "目标追踪", href: "/dashboard/targets", icon: <Target size={16} /> },
    ],
  },
  {
    title: "客户关系",
    items: [
      { label: "客户列表", href: "/crm/customers", icon: <Users size={16} /> },
      { label: "线索管理", href: "/crm/leads", icon: <Zap size={16} /> },
      { label: "联系人", href: "/crm/contacts", icon: <Contact size={16} /> },
    ],
  },
  {
    title: "销售管理",
    items: [
      { label: "订单管理", href: "/sales/orders", icon: <ShoppingCart size={16} /> },
      { label: "销售漏斗", href: "/sales/pipeline", icon: <GitMerge size={16} /> },
      { label: "销售报告", href: "/sales/reports", icon: <BarChart3 size={16} /> },
    ],
  },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (href: string) => location === href || location.startsWith(href);

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "oklch(0.10 0.022 265)" }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-30 w-60 flex flex-col transition-transform duration-300 ease-out",
          "border-r border-white/8",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
        style={{
          backgroundImage: `url(${SIDEBAR_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Sidebar overlay for readability */}
        <div className="absolute inset-0 bg-[oklch(0.10_0.022_265/0.88)]" />

        {/* Sidebar content */}
        <div className="relative flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 px-5 py-5 border-b border-white/8">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
              style={{ background: "linear-gradient(135deg, oklch(0.62 0.22 250), oklch(0.65 0.18 290))" }}
            >
              SA
            </div>
            <div>
              <p className="text-sm font-semibold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                SalesAnalytics
              </p>
              <p className="text-[10px] text-white/40">内部管理系统</p>
            </div>
          </div>

          {/* Nav groups */}
          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
            {navGroups.map((group) => (
              <div key={group.title}>
                <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/30">
                  {group.title}
                </p>
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const active = isActive(item.href);
                    return (
                      <Link key={item.href} href={item.href}>
                        <div
                          className={cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                            active
                              ? "bg-[oklch(0.62_0.22_250/0.18)] text-[oklch(0.80_0.18_250)] border border-[oklch(0.62_0.22_250/0.25)]"
                              : "text-white/50 hover:bg-white/6 hover:text-white/85"
                          )}
                        >
                          <span className={cn("transition-colors", active ? "text-[oklch(0.75_0.20_250)]" : "text-white/40 group-hover:text-white/60")}>
                            {item.icon}
                          </span>
                          <span className="flex-1">{item.label}</span>
                          {active && <ChevronRight size={12} className="text-[oklch(0.62_0.22_250)]" />}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Bottom user area */}
          <div className="px-3 py-4 border-t border-white/8 space-y-1">
            <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/40 hover:text-white/70 hover:bg-white/6 w-full transition-all">
              <Settings size={15} />
              <span>系统设置</span>
            </button>
            <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/40 hover:text-white/70 hover:bg-white/6 w-full transition-all">
              <LogOut size={15} />
              <span>退出登录</span>
            </button>
            <div className="flex items-center gap-3 px-3 py-2 mt-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[oklch(0.62_0.22_250)] to-[oklch(0.65_0.18_290)] flex items-center justify-center text-white text-xs font-bold">
                A
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-white/80 truncate">Admin User</p>
                <p className="text-[10px] text-white/35 truncate">admin@company.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center gap-4 px-6 py-3.5 border-b border-white/8 bg-[oklch(0.12_0.020_265/0.8)] backdrop-blur-xl shrink-0">
          <button
            className="lg:hidden text-white/50 hover:text-white transition-colors"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/8 text-white/40 text-sm">
              <Search size={14} />
              <span>搜索客户、订单...</span>
              <span className="ml-auto text-[10px] bg-white/8 px-1.5 py-0.5 rounded">⌘K</span>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* Notification */}
            <button className="relative w-9 h-9 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/8 transition-all">
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[oklch(0.62_0.22_250)]" />
            </button>

            {/* Breadcrumb hint */}
            <div className="hidden md:flex items-center gap-1 text-xs text-white/30 px-3 py-1.5 rounded-lg bg-white/4 border border-white/6">
              {navGroups.flatMap(g => g.items).find(i => isActive(i.href))?.label ?? "仪表板"}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="page-enter">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
