// =============================================================
// Reports — /sales/reports
// Design: Dark Glassmorphism Elite
// Shows: Composite report with multiple chart types
// =============================================================

import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ScatterChart, Scatter, ZAxis,
} from "recharts";
import { monthlyRevenue, salesTargets, formatCurrency } from "@/lib/mockData";
import { FileText, Download } from "lucide-react";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card rounded-lg p-3 text-xs space-y-1.5">
        <p className="font-semibold text-white/80">{label}</p>
        {payload.map((p: any, i: number) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: p.color || p.fill }} />
            <span className="text-white/50">{p.name}:</span>
            <span className="text-white font-medium">
              {typeof p.value === "number" && p.value > 1000 ? formatCurrency(p.value) : p.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// Scatter data: deals vs revenue per month
const scatterData = monthlyRevenue.map(m => ({
  deals: m.deals,
  revenue: m.revenue,
  month: m.month,
}));

export default function Reports() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            销售报告
          </h1>
          <p className="text-sm text-white/40 mt-1">综合销售绩效分析报告</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white/60 border border-white/12 hover:bg-white/6 transition-all">
          <Download size={14} />
          导出报告
        </button>
      </div>

      {/* Composed chart: Revenue + Deals */}
      <div className="glass-card rounded-xl p-5">
        <div className="flex items-center gap-2 mb-5">
          <FileText size={15} className="text-[oklch(0.62_0.22_250)]" />
          <h3 className="text-sm font-semibold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            营收与成交量综合视图
          </h3>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart data={monthlyRevenue} margin={{ top: 5, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.05)" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: "oklch(0.60 0.015 265)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="left" tick={{ fill: "oklch(0.60 0.015 265)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000000).toFixed(1)}M`} />
            <YAxis yAxisId="right" orientation="right" tick={{ fill: "oklch(0.60 0.015 265)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar yAxisId="left" dataKey="revenue" name="营收" fill="oklch(0.62 0.22 250 / 0.6)" radius={[4, 4, 0, 0]} />
            <Line yAxisId="right" type="monotone" dataKey="deals" name="成交量" stroke="oklch(0.65 0.18 290)" strokeWidth={2} dot={{ r: 3, fill: "oklch(0.65 0.18 290)" }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Two charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Sales rep performance */}
        <div className="glass-card rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            销售代表绩效对比
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <ComposedChart data={salesTargets} layout="vertical" margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.05)" horizontal={false} />
              <XAxis type="number" tick={{ fill: "oklch(0.60 0.015 265)", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000000).toFixed(1)}M`} />
              <YAxis type="category" dataKey="name" tick={{ fill: "oklch(0.60 0.015 265)", fontSize: 11 }} axisLine={false} tickLine={false} width={50} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="target" name="目标" fill="oklch(0.62 0.22 250 / 0.25)" radius={[0, 4, 4, 0]} />
              <Bar dataKey="achieved" name="完成" fill="oklch(0.62 0.22 250)" radius={[0, 4, 4, 0]} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Scatter: deals vs revenue */}
        <div className="glass-card rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            成交量与营收相关性
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <ScatterChart margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.05)" />
              <XAxis dataKey="deals" name="成交量" tick={{ fill: "oklch(0.60 0.015 265)", fontSize: 11 }} axisLine={false} tickLine={false} label={{ value: "成交量", position: "insideBottom", offset: -5, fill: "oklch(0.50 0.015 265)", fontSize: 10 }} />
              <YAxis dataKey="revenue" name="营收" tick={{ fill: "oklch(0.60 0.015 265)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000000).toFixed(1)}M`} />
              <ZAxis range={[40, 80]} />
              <Tooltip
                cursor={{ strokeDasharray: "3 3", stroke: "oklch(1 0 0 / 0.1)" }}
                content={({ active, payload }) => {
                  if (active && payload?.length) {
                    const d = payload[0].payload;
                    return (
                      <div className="glass-card rounded-lg p-2 text-xs">
                        <p className="text-white/60">{d.month}</p>
                        <p className="text-white">成交 {d.deals} 单</p>
                        <p className="text-white">{formatCurrency(d.revenue)}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Scatter data={scatterData} fill="oklch(0.62 0.22 250)" opacity={0.8} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary table */}
      <div className="glass-card rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          月度绩效汇总表
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-white/6">
                {["月份", "实际营收", "目标", "完成率", "成交量", "环比增长"].map(h => (
                  <th key={h} className="text-left pb-3 pr-4 text-white/35 font-medium uppercase tracking-wider text-[10px]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/4">
              {monthlyRevenue.map((m, i) => {
                const rate = ((m.revenue / m.target) * 100).toFixed(1);
                const prev = i > 0 ? monthlyRevenue[i - 1].revenue : m.revenue;
                const growth = (((m.revenue - prev) / prev) * 100).toFixed(1);
                const isOver = parseFloat(rate) >= 100;
                return (
                  <tr key={m.month} className="hover:bg-white/3 transition-colors">
                    <td className="py-3 pr-4 font-medium text-white/70">{m.month}</td>
                    <td className="py-3 pr-4 font-semibold text-white/80">{formatCurrency(m.revenue)}</td>
                    <td className="py-3 pr-4 text-white/45">{formatCurrency(m.target)}</td>
                    <td className="py-3 pr-4">
                      <span className={isOver ? "text-[oklch(0.72_0.18_160)] font-semibold" : "text-[oklch(0.80_0.18_80)]"}>
                        {rate}%
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-white/55">{m.deals}</td>
                    <td className="py-3">
                      <span className={parseFloat(growth) >= 0 ? "text-[oklch(0.72_0.18_160)]" : "text-[oklch(0.65_0.22_25)]"}>
                        {i === 0 ? "—" : `${parseFloat(growth) >= 0 ? "+" : ""}${growth}%`}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
