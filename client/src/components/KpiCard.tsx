// =============================================================
// KpiCard — Glass card for key performance indicators
// Design: Dark Glassmorphism Elite
// =============================================================

import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string;
  change?: number;
  changeLabel?: string;
  icon: React.ReactNode;
  accentColor?: "blue" | "purple" | "teal" | "green" | "pink";
  className?: string;
}

const accentMap = {
  blue: {
    icon: "bg-[oklch(0.62_0.22_250/0.15)] text-[oklch(0.75_0.20_250)] border-[oklch(0.62_0.22_250/0.25)]",
    glow: "shadow-[0_0_20px_oklch(0.62_0.22_250/0.15)]",
    bar: "bg-gradient-to-r from-[oklch(0.62_0.22_250)] to-[oklch(0.65_0.18_290)]",
  },
  purple: {
    icon: "bg-[oklch(0.65_0.18_290/0.15)] text-[oklch(0.75_0.16_290)] border-[oklch(0.65_0.18_290/0.25)]",
    glow: "shadow-[0_0_20px_oklch(0.65_0.18_290/0.15)]",
    bar: "bg-gradient-to-r from-[oklch(0.65_0.18_290)] to-[oklch(0.68_0.22_320)]",
  },
  teal: {
    icon: "bg-[oklch(0.70_0.20_200/0.15)] text-[oklch(0.78_0.18_200)] border-[oklch(0.70_0.20_200/0.25)]",
    glow: "shadow-[0_0_20px_oklch(0.70_0.20_200/0.15)]",
    bar: "bg-gradient-to-r from-[oklch(0.70_0.20_200)] to-[oklch(0.72_0.18_160)]",
  },
  green: {
    icon: "bg-[oklch(0.72_0.18_160/0.15)] text-[oklch(0.78_0.16_160)] border-[oklch(0.72_0.18_160/0.25)]",
    glow: "shadow-[0_0_20px_oklch(0.72_0.18_160/0.15)]",
    bar: "bg-gradient-to-r from-[oklch(0.72_0.18_160)] to-[oklch(0.75_0.20_140)]",
  },
  pink: {
    icon: "bg-[oklch(0.68_0.22_320/0.15)] text-[oklch(0.75_0.20_320)] border-[oklch(0.68_0.22_320/0.25)]",
    glow: "shadow-[0_0_20px_oklch(0.68_0.22_320/0.15)]",
    bar: "bg-gradient-to-r from-[oklch(0.68_0.22_320)] to-[oklch(0.65_0.18_290)]",
  },
};

export default function KpiCard({
  title,
  value,
  change,
  changeLabel,
  icon,
  accentColor = "blue",
  className,
}: KpiCardProps) {
  const accent = accentMap[accentColor];
  const isPositive = change !== undefined && change >= 0;

  return (
    <div
      className={cn(
        "glass-card rounded-xl p-5 relative overflow-hidden transition-all duration-300 hover:-translate-y-0.5",
        accent.glow,
        className
      )}
    >
      {/* Top accent bar */}
      <div className={cn("absolute top-0 left-0 right-0 h-0.5", accent.bar)} />

      {/* Background glow */}
      <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-10 blur-2xl"
        style={{ background: "oklch(0.62 0.22 250)" }} />

      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-white/45 uppercase tracking-wider mb-2">{title}</p>
          <p
            className="text-2xl font-bold text-white count-up"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {value}
          </p>
          {change !== undefined && (
            <div className="flex items-center gap-1.5 mt-2">
              {isPositive ? (
                <TrendingUp size={12} className="text-[oklch(0.72_0.18_160)]" />
              ) : (
                <TrendingDown size={12} className="text-[oklch(0.65_0.22_25)]" />
              )}
              <span
                className={cn(
                  "text-xs font-medium",
                  isPositive ? "text-[oklch(0.72_0.18_160)]" : "text-[oklch(0.65_0.22_25)]"
                )}
              >
                {isPositive ? "+" : ""}{change}%
              </span>
              {changeLabel && (
                <span className="text-xs text-white/30">{changeLabel}</span>
              )}
            </div>
          )}
        </div>

        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center border shrink-0", accent.icon)}>
          {icon}
        </div>
      </div>
    </div>
  );
}
