// =============================================================
// Leads — /crm/leads
// Design: Dark Glassmorphism Elite
// Shows: Lead cards with status pipeline view
// =============================================================

import { leads, statusColorMap, statusLabelMap, formatCurrency, LeadStatus } from "@/lib/mockData";
import { Zap, TrendingUp } from "lucide-react";

const STAGES: LeadStatus[] = ["new", "contacted", "qualified", "lost"];

export default function Leads() {
  const byStage = STAGES.reduce<Record<LeadStatus, typeof leads>>((acc, s) => {
    acc[s] = leads.filter(l => l.status === s);
    return acc;
  }, {} as any);

  const totalValue = leads.filter(l => l.status !== "lost").reduce((s, l) => s + l.value, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            线索管理
          </h1>
          <p className="text-sm text-white/40 mt-1">追踪并转化潜在商机</p>
        </div>
        <button className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-all"
          style={{ background: "linear-gradient(135deg, oklch(0.62 0.22 250), oklch(0.65 0.18 290))" }}>
          + 新增线索
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STAGES.map(s => (
          <div key={s} className="glass-card rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className={statusColorMap[s]}>{statusLabelMap[s]}</span>
              <span className="text-lg font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {byStage[s].length}
              </span>
            </div>
            <p className="text-xs text-white/35">
              {formatCurrency(byStage[s].reduce((sum, l) => sum + l.value, 0))}
            </p>
          </div>
        ))}
      </div>

      {/* Kanban-style columns */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {STAGES.map(stage => (
          <div key={stage} className="space-y-3">
            {/* Column header */}
            <div className="flex items-center justify-between px-1">
              <span className={statusColorMap[stage]}>{statusLabelMap[stage]}</span>
              <span className="text-xs text-white/30">{byStage[stage].length}</span>
            </div>

            {/* Cards */}
            {byStage[stage].map(lead => (
              <div
                key={lead.id}
                className="glass-card rounded-xl p-4 space-y-3 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-white/85">{lead.name}</p>
                    <p className="text-xs text-white/45 mt-0.5">{lead.company}</p>
                  </div>
                  <Zap size={14} className="text-[oklch(0.62_0.22_250/0.6)] shrink-0 mt-0.5" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/35">预估价值</span>
                    <span className="font-semibold text-white/75">{formatCurrency(lead.value)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/35">来源</span>
                    <span className="text-white/55">{lead.source}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/35">负责人</span>
                    <span className="text-white/55">{lead.assignedTo}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/6 text-[10px] text-white/25">
                  创建于 {lead.createdAt}
                </div>
              </div>
            ))}

            {byStage[stage].length === 0 && (
              <div className="rounded-xl border border-dashed border-white/8 p-6 text-center text-xs text-white/20">
                暂无线索
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pipeline value */}
      <div className="glass-card rounded-xl p-5 flex items-center gap-4">
        <TrendingUp size={20} className="text-[oklch(0.62_0.22_250)]" />
        <div>
          <p className="text-xs text-white/40">有效管道总价值（排除丢失）</p>
          <p className="text-xl font-bold text-white mt-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {formatCurrency(totalValue)}
          </p>
        </div>
      </div>
    </div>
  );
}
