// =============================================================
// Pipeline — /sales/pipeline
// Design: Dark Glassmorphism Elite
// Shows: Visual funnel + deal cards by stage
// =============================================================

import { pipelineDeals, formatCurrency, statusLabelMap, PipelineStage } from "@/lib/mockData";
import { GitMerge, DollarSign } from "lucide-react";

const STAGES: PipelineStage[] = [
  "prospecting", "qualification", "proposal", "negotiation", "closed_won", "closed_lost",
];

const STAGE_COLORS: Record<PipelineStage, string> = {
  prospecting: "oklch(0.62 0.22 250)",
  qualification: "oklch(0.65 0.18 290)",
  proposal: "oklch(0.70 0.20 200)",
  negotiation: "oklch(0.80 0.18 80)",
  closed_won: "oklch(0.72 0.18 160)",
  closed_lost: "oklch(0.65 0.22 25)",
};

const STAGE_LABELS: Record<PipelineStage, string> = {
  prospecting: "开拓中",
  qualification: "资质认定",
  proposal: "提案阶段",
  negotiation: "谈判中",
  closed_won: "赢单",
  closed_lost: "丢单",
};

export default function Pipeline() {
  const byStage = STAGES.reduce<Record<PipelineStage, typeof pipelineDeals>>((acc, s) => {
    acc[s] = pipelineDeals.filter(d => d.stage === s);
    return acc;
  }, {} as any);

  const activeStages = STAGES.filter(s => s !== "closed_lost");
  const maxValue = Math.max(...activeStages.map(s => byStage[s].reduce((sum, d) => sum + d.value, 0)));
  const totalPipeline = pipelineDeals
    .filter(d => d.stage !== "closed_lost")
    .reduce((s, d) => s + d.value * (d.probability / 100), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            销售漏斗
          </h1>
          <p className="text-sm text-white/40 mt-1">可视化商机流转与转化率</p>
        </div>
        <div className="glass-card rounded-xl px-4 py-3 flex items-center gap-2">
          <DollarSign size={14} className="text-[oklch(0.62_0.22_250)]" />
          <div>
            <p className="text-[10px] text-white/35">加权管道价值</p>
            <p className="text-sm font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {formatCurrency(totalPipeline)}
            </p>
          </div>
        </div>
      </div>

      {/* Funnel visualization */}
      <div className="glass-card rounded-xl p-6">
        <h3 className="text-sm font-semibold text-white mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          漏斗概览
        </h3>
        <div className="space-y-2">
          {activeStages.map((stage, i) => {
            const stageDeals = byStage[stage];
            const stageValue = stageDeals.reduce((s, d) => s + d.value, 0);
            const pct = maxValue > 0 ? (stageValue / maxValue) * 100 : 0;
            const indent = i * 4;

            return (
              <div key={stage} className="flex items-center gap-4">
                <span className="text-xs text-white/40 w-20 shrink-0 text-right">{STAGE_LABELS[stage]}</span>
                <div className="flex-1 flex items-center gap-2">
                  <div
                    className="h-8 rounded-lg flex items-center px-3 transition-all duration-700"
                    style={{
                      width: `${Math.max(pct, 8)}%`,
                      marginLeft: `${indent}%`,
                      background: `${STAGE_COLORS[stage]}30`,
                      borderLeft: `3px solid ${STAGE_COLORS[stage]}`,
                    }}
                  >
                    <span className="text-xs font-semibold text-white/70 truncate">
                      {stageDeals.length} 单
                    </span>
                  </div>
                  <span className="text-xs text-white/40 shrink-0">{formatCurrency(stageValue)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Deal cards by stage */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {STAGES.map(stage => (
          <div key={stage} className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ background: STAGE_COLORS[stage] }} />
                <span className="text-xs font-medium text-white/60">{STAGE_LABELS[stage]}</span>
              </div>
              <span className="text-xs text-white/30">{byStage[stage].length}</span>
            </div>

            {byStage[stage].map(deal => (
              <div
                key={deal.id}
                className="glass-card rounded-xl p-4 space-y-3 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                style={{ borderLeft: `2px solid ${STAGE_COLORS[stage]}40` }}
              >
                <div>
                  <p className="text-sm font-semibold text-white/85">{deal.name}</p>
                  <p className="text-xs text-white/45 mt-0.5">{deal.company}</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {formatCurrency(deal.value)}
                  </span>
                  <div
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{
                      background: `${STAGE_COLORS[stage]}20`,
                      color: STAGE_COLORS[stage],
                      border: `1px solid ${STAGE_COLORS[stage]}40`,
                    }}
                  >
                    {deal.probability}%
                  </div>
                </div>

                <div className="h-1 rounded-full bg-white/6 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${deal.probability}%`, background: STAGE_COLORS[stage] }}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] text-white/30">
                  <span>{deal.assignedTo}</span>
                  <span>预计 {deal.expectedClose}</span>
                </div>
              </div>
            ))}

            {byStage[stage].length === 0 && (
              <div className="rounded-xl border border-dashed border-white/8 p-6 text-center text-xs text-white/20">
                暂无商机
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
