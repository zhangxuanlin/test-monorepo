// =============================================================
// Customers — /crm/customers
// Design: Dark Glassmorphism Elite
// Shows: Searchable customer table with status filters
// =============================================================

import { useState } from "react";
import { customers, formatCurrency, statusColorMap, statusLabelMap, CustomerStatus } from "@/lib/mockData";
import { Search, Filter, ChevronUp, ChevronDown } from "lucide-react";

type SortKey = "name" | "totalRevenue" | "lastContact";

export default function Customers() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<CustomerStatus | "all">("all");
  const [sortKey, setSortKey] = useState<SortKey>("totalRevenue");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const filtered = customers
    .filter(c => {
      const matchSearch = c.name.includes(search) || c.company.includes(search) || c.email.includes(search);
      const matchStatus = statusFilter === "all" || c.status === statusFilter;
      return matchSearch && matchStatus;
    })
    .sort((a, b) => {
      const factor = sortDir === "desc" ? -1 : 1;
      if (sortKey === "name") return factor * a.name.localeCompare(b.name);
      if (sortKey === "totalRevenue") return factor * (a.totalRevenue - b.totalRevenue);
      if (sortKey === "lastContact") return factor * a.lastContact.localeCompare(b.lastContact);
      return 0;
    });

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("desc"); }
  };

  const SortIcon = ({ k }: { k: SortKey }) =>
    sortKey === k
      ? sortDir === "desc" ? <ChevronDown size={12} /> : <ChevronUp size={12} />
      : <ChevronDown size={12} className="opacity-20" />;

  const statusCounts = {
    all: customers.length,
    active: customers.filter(c => c.status === "active").length,
    inactive: customers.filter(c => c.status === "inactive").length,
    prospect: customers.filter(c => c.status === "prospect").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            客户列表
          </h1>
          <p className="text-sm text-white/40 mt-1">管理所有客户信息与互动记录</p>
        </div>
        <button className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-all"
          style={{ background: "linear-gradient(135deg, oklch(0.62 0.22 250), oklch(0.65 0.18 290))" }}>
          + 新增客户
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/8 text-sm flex-1 min-w-[200px] max-w-xs">
          <Search size={14} className="text-white/35 shrink-0" />
          <input
            className="bg-transparent text-white/80 placeholder-white/25 outline-none w-full text-sm"
            placeholder="搜索客户名称、公司..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Status tabs */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-white/4 border border-white/6">
          {(["all", "active", "inactive", "prospect"] as const).map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                statusFilter === s
                  ? "bg-[oklch(0.62_0.22_250/0.2)] text-[oklch(0.75_0.18_250)] border border-[oklch(0.62_0.22_250/0.3)]"
                  : "text-white/40 hover:text-white/65"
              }`}
            >
              {s === "all" ? "全部" : statusLabelMap[s]} ({statusCounts[s]})
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
                {[
                  { label: "客户", key: "name" as SortKey },
                  { label: "公司", key: null },
                  { label: "联系方式", key: null },
                  { label: "区域", key: null },
                  { label: "状态", key: null },
                  { label: "累计营收", key: "totalRevenue" as SortKey },
                  { label: "最近联系", key: "lastContact" as SortKey },
                ].map(col => (
                  <th
                    key={col.label}
                    className={`text-left px-5 py-4 text-white/35 font-medium uppercase tracking-wider text-[10px] ${col.key ? "cursor-pointer hover:text-white/55 select-none" : ""}`}
                    onClick={() => col.key && handleSort(col.key)}
                  >
                    <div className="flex items-center gap-1">
                      {col.label}
                      {col.key && <SortIcon k={col.key} />}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/4">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-white/3 transition-colors group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0"
                        style={{ background: "linear-gradient(135deg, oklch(0.62 0.22 250), oklch(0.65 0.18 290))" }}
                      >
                        {c.avatar}
                      </div>
                      <span className="font-medium text-white/80">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-white/60">{c.company}</td>
                  <td className="px-5 py-4">
                    <div className="text-white/55">{c.email}</div>
                    <div className="text-white/30 mt-0.5">{c.phone}</div>
                  </td>
                  <td className="px-5 py-4 text-white/50">{c.region}</td>
                  <td className="px-5 py-4">
                    <span className={statusColorMap[c.status]}>{statusLabelMap[c.status]}</span>
                  </td>
                  <td className="px-5 py-4 font-semibold text-white/80">
                    {c.totalRevenue > 0 ? formatCurrency(c.totalRevenue) : "—"}
                  </td>
                  <td className="px-5 py-4 text-white/40">{c.lastContact}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-white/25 text-sm">
                    未找到匹配的客户记录
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-white/6 flex items-center justify-between">
          <span className="text-xs text-white/30">共 {filtered.length} 条记录</span>
        </div>
      </div>
    </div>
  );
}
