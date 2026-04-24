// =============================================================
// Revenue Analysis — /dashboard/revenue
// Design: Dark Glassmorphism Elite
// Shows: Bar/Line charts, region breakdown, product revenue
// =============================================================

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line,
} from "recharts";
import { monthlyRevenue, regionRevenue, productRevenue, formatCurrency } from "@/lib/mockData";

const COLORS = [
  "oklch(0.62 0.22 250)",
  "oklch(0.65 0.18 290)",
  "oklch(0.70 0.20 200)",
  "oklch(0.72 0.18 160)",
  "oklch(0.68 0.22 320)",
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card rounded-lg p-3 text-xs space-y-1.5">
        <p className="font-semibold text-white/80">{label}</p>
        {payload.map((p: any, i: number) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-white/50">{p.name}:</span>
            <span className="text-white font-medium">
              {typeof p.value === "number" && p.value > 10000 ? formatCurrency(p.value) : p.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function Revenue() {
  const totalRevenue = monthlyRevenue.reduce((s, m) => s + m.revenue, 0);
  const totalTarget = monthlyRevenue.reduce((s, m) => s + m.target, 0);
  const achievementRate = ((totalRevenue / totalTarget) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          营收分析
        </h1>
        <p className="text-sm text-white/40 mt-1">2026 年度营收数据深度分析</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "年度总营收", value: formatCurrency(totalRevenue), sub: "实际完成" },
          { label: "年度目标", value: formatCurrency(totalTarget), sub: "既定目标" },
          { label: "目标完成率", value: `${achievementRate}%`, sub: "超额完成" },
        ].map((item) => (
          <div key={item.label} className="glass-card rounded-xl p-5">
            <p className="text-[10px] text-white/35 uppercase tracking-wider mb-2">{item.label}</p>
            <p className="text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {item.value}
            </p>
            <p className="text-xs text-[oklch(0.72_0.18_160)] mt-1">{item.sub}</p>
          </div>
        ))}
      </div>

      {/* Monthly bar chart */}
      <div className="glass-card rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          月度营收对比
        </h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={monthlyRevenue} margin={{ top: 5, right: 10, left: 0, bottom: 0 }} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.05)" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: "oklch(0.60 0.015 265)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "oklch(0.60 0.015 265)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="revenue" name="实际营收" fill="oklch(0.62 0.22 250)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="target" name="目标" fill="oklch(0.65 0.18 290 / 0.4)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Region + Product charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Region pie */}
        <div className="glass-card rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            区域营收分布
          </h3>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="50%" height={200}>
              <PieChart>
                <Pie
                  data={regionRevenue}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {regionRevenue.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {regionRevenue.map((r, i) => (
                <div key={r.region} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: COLORS[i % COLORS.length] }} />
                  <span className="text-xs text-white/60 flex-1">{r.region}</span>
                  <span className="text-xs font-semibold text-white/80">{r.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product bar */}
        <div className="glass-card rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            产品线营收
          </h3>
          <div className="space-y-3">
            {productRevenue.map((p, i) => {
              const max = Math.max(...productRevenue.map(x => x.revenue));
              const pct = (p.revenue / max) * 100;
              return (
                <div key={p.product}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-white/60 truncate max-w-[180px]">{p.product}</span>
                    <span className="text-xs font-semibold text-white/80 shrink-0 ml-2">{formatCurrency(p.revenue)}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/6 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, background: COLORS[i % COLORS.length] }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Deals trend */}
      <div className="glass-card rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          月度成交量趋势
        </h3>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={monthlyRevenue} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.05)" />
            <XAxis dataKey="month" tick={{ fill: "oklch(0.60 0.015 265)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "oklch(0.60 0.015 265)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="deals" name="成交量" stroke="oklch(0.70 0.20 200)" strokeWidth={2} dot={{ fill: "oklch(0.70 0.20 200)", r: 3 }} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
