// =============================================================
// Orders — /sales/orders
// Design: Dark Glassmorphism Elite
// Shows: Full order table with status filter and search
// =============================================================

import { useState } from "react";
import { orders, formatCurrency, statusColorMap, statusLabelMap, OrderStatus } from "@/lib/mockData";
import { Search, ShoppingCart } from "lucide-react";

export default function Orders() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");

  const filtered = orders.filter(o => {
    const matchSearch = o.customerName.includes(search) || o.product.includes(search) || o.id.includes(search);
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalAmount = filtered.reduce((s, o) => s + o.amount, 0);

  const statusCounts = {
    all: orders.length,
    pending: orders.filter(o => o.status === "pending").length,
    processing: orders.filter(o => o.status === "processing").length,
    completed: orders.filter(o => o.status === "completed").length,
    cancelled: orders.filter(o => o.status === "cancelled").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            订单管理
          </h1>
          <p className="text-sm text-white/40 mt-1">追踪所有销售订单状态</p>
        </div>
        <button className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-all"
          style={{ background: "linear-gradient(135deg, oklch(0.62 0.22 250), oklch(0.65 0.18 290))" }}>
          + 新建订单
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "待处理", count: statusCounts.pending, color: "oklch(0.80 0.18 80)" },
          { label: "处理中", count: statusCounts.processing, color: "oklch(0.62 0.22 250)" },
          { label: "已完成", count: statusCounts.completed, color: "oklch(0.72 0.18 160)" },
          { label: "已取消", count: statusCounts.cancelled, color: "oklch(0.65 0.22 25)" },
        ].map(item => (
          <div key={item.label} className="glass-card rounded-xl p-4 flex items-center gap-3">
            <div className="w-2 h-8 rounded-full shrink-0" style={{ background: item.color }} />
            <div>
              <p className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {item.count}
              </p>
              <p className="text-xs text-white/40">{item.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/8 text-sm flex-1 min-w-[200px] max-w-xs">
          <Search size={14} className="text-white/35 shrink-0" />
          <input
            className="bg-transparent text-white/80 placeholder-white/25 outline-none w-full text-sm"
            placeholder="搜索订单号、客户、产品..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-1 p-1 rounded-lg bg-white/4 border border-white/6">
          {(["all", "pending", "processing", "completed", "cancelled"] as const).map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                statusFilter === s
                  ? "bg-[oklch(0.62_0.22_250/0.2)] text-[oklch(0.75_0.18_250)] border border-[oklch(0.62_0.22_250/0.3)]"
                  : "text-white/40 hover:text-white/65"
              }`}
            >
              {s === "all" ? `全部 (${statusCounts.all})` : `${statusLabelMap[s]} (${statusCounts[s as OrderStatus]})`}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-white/6">
                {["订单号", "客户", "产品", "金额", "区域", "状态", "创建日期", "截止日期"].map(h => (
                  <th key={h} className="text-left px-5 py-4 text-white/35 font-medium uppercase tracking-wider text-[10px]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/4">
              {filtered.map(o => (
                <tr key={o.id} className="hover:bg-white/3 transition-colors">
                  <td className="px-5 py-4 font-mono text-white/50">{o.id}</td>
                  <td className="px-5 py-4 font-medium text-white/80">{o.customerName}</td>
                  <td className="px-5 py-4 text-white/55 max-w-[180px]">
                    <span className="truncate block">{o.product}</span>
                  </td>
                  <td className="px-5 py-4 font-semibold text-white/80">{formatCurrency(o.amount)}</td>
                  <td className="px-5 py-4 text-white/50">{o.region}</td>
                  <td className="px-5 py-4">
                    <span className={statusColorMap[o.status]}>{statusLabelMap[o.status]}</span>
                  </td>
                  <td className="px-5 py-4 text-white/40">{o.createdAt}</td>
                  <td className="px-5 py-4 text-white/40">{o.dueDate}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center text-white/25 text-sm">
                    未找到匹配的订单
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-white/6 flex items-center justify-between">
          <span className="text-xs text-white/30">共 {filtered.length} 条订单</span>
          <span className="text-xs font-semibold text-white/60">
            合计：{formatCurrency(totalAmount)}
          </span>
        </div>
      </div>
    </div>
  );
}
