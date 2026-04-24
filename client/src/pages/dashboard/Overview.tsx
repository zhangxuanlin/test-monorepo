// =============================================================
// Dashboard Overview — /dashboard/overview
// Design: Dark Glassmorphism Elite
// Shows: KPI cards, revenue trend, recent orders, top customers
// =============================================================

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell,
} from "recharts";
import {
  DollarSign, Users, ShoppingCart, TrendingUp,
  ArrowUpRight, Clock,
} from "lucide-react";
import KpiCard from "@/components/KpiCard";
import {
  kpiData, monthlyRevenue, orders, customers,
  formatCurrency, statusColorMap, statusLabelMap,
} from "@/lib/mockData";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663595681188/Utuucis6EMLXNfoB5TBr9f/dashboard-hero-KPR8nTFJ9ct3rPQ35FwpUn.webp";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card rounded-lg p-3 text-xs space-y-1.5">
        <p className="font-semibold text-white/80">{label}</p>
        {payload.map((p: any, i: number) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-white/50">{p.name}:</span>
            <span className="text-white font-medium">{formatCurrency(p.value)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function Overview() {
  const recentOrders = orders.slice(0, 5);
  const topCustomers = customers
    .filter(c => c.totalRevenue > 0)
    .sort((a, b) => b.totalRevenue - a.totalRevenue)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          minHeight: "160px",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.10_0.022_265/0.85)] via-[oklch(0.10_0.022_265/0.5)] to-transparent" />
        <div className="relative px-8 py-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-[oklch(0.62_0.22_250)] mb-1">
            Sales Analytics Dashboard
          </p>
          <h1
            className="text-2xl font-bold text-white mb-1"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            数据总览
          </h1>
          <p className="text-sm text-white/50">
            2026年度销售数据实时监控 · 最后更新：{new Date().toLocaleDateString("zh-CN")}
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="年度总营收"
          value={formatCurrency(kpiData.totalRevenue)}
          change={kpiData.revenueGrowth}
          changeLabel="同比"
          icon={<DollarSign size={18} />}
          accentColor="blue"
        />
        <KpiCard
          title="客户总数"
          value={kpiData.totalCustomers.toString()}
          change={kpiData.customerGrowth}
          changeLabel="同比"
          icon={<Users size={18} />}
          accentColor="purple"
        />
        <KpiCard
          title="成交订单"
          value={kpiData.totalDeals.toString()}
          change={kpiData.dealGrowth}
          changeLabel="同比"
          icon={<ShoppingCart size={18} />}
          accentColor="teal"
        />
        <KpiCard
          title="赢单率"
          value={`${kpiData.winRate}%`}
          change={4.2}
          changeLabel="同比"
          icon={<TrendingUp size={18} />}
          accentColor="green"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue trend - 2/3 width */}
        <div className="lg:col-span-2 glass-card rounded-xl p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-semibold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                月度营收趋势
              </h3>
              <p className="text-xs text-white/40 mt-0.5">实际营收 vs 目标</p>
            </div>
            <span className="badge-info text-[10px]">2026年</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlyRevenue} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.62 0.22 250)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.62 0.22 250)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="targetGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.65 0.18 290)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="oklch(0.65 0.18 290)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.05)" />
              <XAxis dataKey="month" tick={{ fill: "oklch(0.60 0.015 265)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "oklch(0.60 0.015 265)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" name="实际营收" stroke="oklch(0.62 0.22 250)" strokeWidth={2} fill="url(#revenueGrad)" />
              <Area type="monotone" dataKey="target" name="目标" stroke="oklch(0.65 0.18 290)" strokeWidth={1.5} strokeDasharray="4 4" fill="url(#targetGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Top customers - 1/3 width */}
        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-semibold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              头部客户
            </h3>
            <span className="text-xs text-white/30">按营收</span>
          </div>
          <div className="space-y-3">
            {topCustomers.map((c, i) => (
              <div key={c.id} className="flex items-center gap-3">
                <span className="text-xs text-white/25 w-4 shrink-0">{i + 1}</span>
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0"
                  style={{ background: `linear-gradient(135deg, oklch(0.62 0.22 ${250 + i * 15}), oklch(0.65 0.18 ${290 + i * 10}))` }}
                >
                  {c.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-white/80 truncate">{c.company}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <div
                      className="h-1 rounded-full bg-[oklch(0.62_0.22_250/0.3)]"
                      style={{ width: `${(c.totalRevenue / 2100000) * 100}%`, maxWidth: "80px" }}
                    />
                  </div>
                </div>
                <span className="text-xs font-semibold text-white/70 shrink-0">
                  {formatCurrency(c.totalRevenue)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="glass-card rounded-xl p-5">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-semibold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            近期订单
          </h3>
          <div className="flex items-center gap-1 text-xs text-white/40">
            <Clock size={12} />
            <span>最近 5 条</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-white/6">
                {["订单号", "客户", "产品", "金额", "状态", "日期"].map(h => (
                  <th key={h} className="text-left pb-3 pr-4 text-white/35 font-medium uppercase tracking-wider text-[10px]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/4">
              {recentOrders.map(o => (
                <tr key={o.id} className="hover:bg-white/3 transition-colors group">
                  <td className="py-3 pr-4 font-mono text-white/50">{o.id}</td>
                  <td className="py-3 pr-4 font-medium text-white/80">{o.customerName}</td>
                  <td className="py-3 pr-4 text-white/55 max-w-[160px] truncate">{o.product}</td>
                  <td className="py-3 pr-4 font-semibold text-white/80">{formatCurrency(o.amount)}</td>
                  <td className="py-3 pr-4">
                    <span className={statusColorMap[o.status]}>
                      {statusLabelMap[o.status]}
                    </span>
                  </td>
                  <td className="py-3 text-white/40">{o.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "平均订单金额", value: formatCurrency(kpiData.avgDealSize), sub: "单笔均值" },
          { label: "转化率", value: `${kpiData.conversionRate}%`, sub: "线索转客户" },
          { label: "管道价值", value: formatCurrency(kpiData.pipelineValue), sub: "在途商机" },
          { label: "活跃客户", value: customers.filter(c => c.status === "active").length.toString(), sub: `共 ${customers.length} 位客户` },
        ].map((item) => (
          <div key={item.label} className="glass-card rounded-xl p-4 flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-white/35 uppercase tracking-wider mb-1">{item.label}</p>
              <p className="text-lg font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {item.value}
              </p>
              <p className="text-[10px] text-white/30 mt-0.5">{item.sub}</p>
            </div>
            <ArrowUpRight size={14} className="text-[oklch(0.62_0.22_250/0.5)] shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
