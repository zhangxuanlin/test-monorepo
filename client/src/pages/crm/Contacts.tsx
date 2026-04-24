// =============================================================
// Contacts — /crm/contacts
// Design: Dark Glassmorphism Elite
// Shows: Contact cards with company grouping
// =============================================================

import { useState } from "react";
import { contacts } from "@/lib/mockData";
import { Search, Mail, Phone, Building2 } from "lucide-react";

export default function Contacts() {
  const [search, setSearch] = useState("");

  const filtered = contacts.filter(c =>
    c.name.includes(search) || c.company.includes(search) || c.title.includes(search)
  );

  const AVATAR_COLORS = [
    "from-[oklch(0.62_0.22_250)] to-[oklch(0.65_0.18_290)]",
    "from-[oklch(0.65_0.18_290)] to-[oklch(0.68_0.22_320)]",
    "from-[oklch(0.70_0.20_200)] to-[oklch(0.72_0.18_160)]",
    "from-[oklch(0.72_0.18_160)] to-[oklch(0.70_0.20_200)]",
    "from-[oklch(0.68_0.22_320)] to-[oklch(0.62_0.22_250)]",
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            联系人
          </h1>
          <p className="text-sm text-white/40 mt-1">管理客户企业联系人信息</p>
        </div>
        <button className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-all"
          style={{ background: "linear-gradient(135deg, oklch(0.62 0.22 250), oklch(0.65 0.18 290))" }}>
          + 新增联系人
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/8 text-sm max-w-sm">
        <Search size={14} className="text-white/35 shrink-0" />
        <input
          className="bg-transparent text-white/80 placeholder-white/25 outline-none w-full text-sm"
          placeholder="搜索联系人..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 text-xs text-white/35">
        <span>共 {filtered.length} 位联系人</span>
        <span>·</span>
        <span>{new Set(filtered.map(c => c.company)).size} 家企业</span>
      </div>

      {/* Contact cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((c, i) => (
          <div
            key={c.id}
            className="glass-card rounded-xl p-5 space-y-4 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
          >
            {/* Avatar + name */}
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white bg-gradient-to-br shrink-0 ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}
              >
                {c.name[0]}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white/85 truncate">{c.name}</p>
                <p className="text-xs text-[oklch(0.62_0.22_250/0.8)] truncate">{c.title}</p>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-white/45">
                <Building2 size={12} className="shrink-0 text-white/25" />
                <span className="truncate">{c.company}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/45">
                <Mail size={12} className="shrink-0 text-white/25" />
                <span className="truncate">{c.email}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/45">
                <Phone size={12} className="shrink-0 text-white/25" />
                <span>{c.phone}</span>
              </div>
            </div>

            {/* Department tag */}
            <div className="pt-2 border-t border-white/6">
              <span className="badge-info text-[10px]">{c.department}</span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="glass-card rounded-xl p-12 text-center text-white/25 text-sm">
          未找到匹配的联系人
        </div>
      )}
    </div>
  );
}
