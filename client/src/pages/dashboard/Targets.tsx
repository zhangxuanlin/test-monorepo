// =============================================================
// Targets — /dashboard/targets
// Design: Dark Glassmorphism Elite
// Shows: Individual sales rep targets, progress bars, leaderboard
// =============================================================

import { salesTargets, formatCurrency } from "@/lib/mockData";
import { Trophy, Medal } from "lucide-react";
import { RadialBarChart, RadialBar, ResponsiveContainer, Tooltip } from "recharts";

const RANK_COLORS = [
  "oklch(0.80 0.18 80)",   // gold
  "oklch(0.75 0.08 265)",  // silver
  "oklch(0.70 0.15 50)",   // bronze
  "oklch(0.62 0.22 250)",
  "oklch(0.65 0.18 290)",
];

export default function Targets() {
  const sorted = [...salesTargets].sort((a, b) => (b.achieved / b.target) - (a.achieved / a.target));

  const teamTarget = salesTargets.reduce((s, r) => s + r.target, 0);
  const teamAchieved = salesTargets.reduce((s, r) => s + r.achieved, 0);
  const teamRate = ((teamAchieved / teamTarget) * 100).toFixed(1);

  const radialData = [{ name: "完成率", value: parseFloat(teamRate), fill: "oklch(0.62 0.22 250)" }];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          目标追踪
        </h1>
        <p className="text-sm text-white/40 mt-1">销售团队目标完成情况</p>
      </div>

      {/* Team summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="glass-card rounded-xl p-5 flex items-center gap-5">
          <div className="w-28 h-28 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%" cy="50%"
                innerRadius="65%" outerRadius="100%"
                data={radialData}
                startAngle={90} endAngle={90 - 360 * (parseFloat(teamRate) / 100)}
              >
                <RadialBar dataKey="value" cornerRadius={4} background={{ fill: "oklch(1 0 0 / 0.05)" }} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div>
            <p className="text-[10px] text-white/35 uppercase tracking-wider mb-1">团队完成率</p>
            <p className="text-3xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {teamRate}%
            </p>
            <p className="text-xs text-[oklch(0.72_0.18_160)] mt-1">超额完成目标</p>
          </div>
        </div>

        <div className="glass-card rounded-xl p-5">
          <p className="text-[10px] text-white/35 uppercase tracking-wider mb-2">团队目标</p>
          <p className="text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {formatCurrency(teamTarget)}
          </p>
          <p className="text-xs text-white/40 mt-1">5 位销售代表合计</p>
        </div>

        <div className="glass-card rounded-xl p-5">
          <p className="text-[10px] text-white/35 uppercase tracking-wider mb-2">实际完成</p>
          <p className="text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {formatCurrency(teamAchieved)}
          </p>
          <p className="text-xs text-[oklch(0.72_0.18_160)] mt-1">
            超额 {formatCurrency(teamAchieved - teamTarget)}
          </p>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="glass-card rounded-xl p-5">
        <div className="flex items-center gap-2 mb-5">
          <Trophy size={16} className="text-[oklch(0.80_0.18_80)]" />
          <h3 className="text-sm font-semibold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            销售排行榜
          </h3>
        </div>

        <div className="space-y-4">
          {sorted.map((rep, i) => {
            const rate = (rep.achieved / rep.target) * 100;
            const isOver = rate >= 100;
            return (
              <div key={rep.name} className="flex items-center gap-4">
                {/* Rank */}
                <div className="w-8 shrink-0 flex justify-center">
                  {i < 3 ? (
                    <Medal size={18} style={{ color: RANK_COLORS[i] }} />
                  ) : (
                    <span className="text-sm font-bold text-white/25">{i + 1}</span>
                  )}
                </div>

                {/* Avatar */}
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0"
                  style={{ background: `linear-gradient(135deg, ${RANK_COLORS[i]}, oklch(0.65 0.18 290))` }}
                >
                  {rep.name[0]}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-white/80">{rep.name}</span>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-white/40">{rep.deals} 单</span>
                      <span className={isOver ? "text-[oklch(0.72_0.18_160)] font-semibold" : "text-white/60"}>
                        {rate.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/6 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${Math.min(rate, 100)}%`,
                        background: isOver
                          ? `linear-gradient(90deg, oklch(0.72 0.18 160), oklch(0.75 0.20 140))`
                          : `linear-gradient(90deg, ${RANK_COLORS[i]}, oklch(0.65 0.18 290))`,
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] text-white/30">
                      已完成 {formatCurrency(rep.achieved)}
                    </span>
                    <span className="text-[10px] text-white/25">
                      目标 {formatCurrency(rep.target)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quarterly breakdown */}
      <div className="glass-card rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          季度目标拆解
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {["Q1", "Q2", "Q3", "Q4"].map((q, i) => {
            const rates = [112, 98, 125, 108];
            const values = [5200000, 4800000, 6100000, 5780000];
            const isOver = rates[i] >= 100;
            return (
              <div key={q} className="rounded-xl p-4 border border-white/8 bg-white/3">
                <p className="text-xs font-semibold text-white/40 mb-2">{q}</p>
                <p className="text-xl font-bold text-white mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {rates[i]}%
                </p>
                <p className="text-xs text-white/40 mb-3">{formatCurrency(values[i])}</p>
                <div className="h-1 rounded-full bg-white/6 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.min(rates[i], 100)}%`,
                      background: isOver ? "oklch(0.72 0.18 160)" : "oklch(0.62 0.22 250)",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
