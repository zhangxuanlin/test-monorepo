# Sales Dashboard 设计方案

## 路由结构规划

```
/                         → 重定向到 /dashboard
/dashboard                → 仪表板（主路由 1）
  /dashboard/overview     → 总览
  /dashboard/revenue      → 营收分析
  /dashboard/targets      → 目标追踪

/crm                      → 客户关系管理（主路由 2）
  /crm/customers          → 客户列表
  /crm/leads              → 线索管理
  /crm/contacts           → 联系人

/sales                    → 销售管理（主路由 3）
  /sales/orders           → 订单管理
  /sales/pipeline         → 销售漏斗
  /sales/reports          → 销售报告
```

---

<response>
<probability>0.07</probability>
<text>
<idea>
**Design Movement**: 新包豪斯数据主义（Neo-Bauhaus Data-ism）

**Core Principles**:
1. 功能即美学——每个视觉元素都服务于数据可读性
2. 强烈的几何网格，非对称分割布局
3. 高对比度的黑白底色配合单一强调色（深琥珀 #D97706）
4. 数字与文字的排版层次极为清晰

**Color Philosophy**:
- 背景：深炭灰 oklch(0.13 0.005 285)，营造专业沉稳感
- 前景：近白 oklch(0.92 0.005 65)
- 强调色：琥珀橙 oklch(0.65 0.18 65)，用于关键指标和 CTA
- 图表色板：从琥珀到深橙的渐变序列

**Layout Paradigm**:
- 左侧固定 64px 图标导航栏（超窄）
- 内容区采用不规则网格（CSS Grid with named areas）
- 顶部无传统 header，数据直接铺满视口

**Signature Elements**:
1. 数据卡片左上角的彩色竖条装饰（4px 宽）
2. 表格行悬停时的整行琥珀色左边框高亮
3. 图表区域的微噪点纹理背景

**Interaction Philosophy**:
- 所有过渡 200ms ease-out，快速响应
- 侧边栏展开时推挤内容而非覆盖
- 数据加载时骨架屏而非 spinner

**Animation**:
- 页面切换：内容区向右滑入 translateX(-12px) → 0
- 数字计数器：从 0 动画到目标值（1s ease-out）
- 图表：从底部生长动画

**Typography System**:
- 标题：IBM Plex Mono（等宽，强调数据精确性）
- 正文：Inter（清晰易读）
- 数字：IBM Plex Mono Bold，超大字号展示 KPI
</idea>
</text>
</response>

<response>
<probability>0.06</probability>
<text>
<idea>
**Design Movement**: 暗色玻璃态精英主义（Dark Glassmorphism Elite）

**Core Principles**:
1. 深色基底配毛玻璃卡片，营造层次感
2. 微妙的蓝紫渐变光晕作为空间深度提示
3. 数据密度高但视觉噪音低
4. 精致的边框光效（1px 半透明白色描边）

**Color Philosophy**:
- 背景：极深蓝黑 oklch(0.10 0.02 265)
- 卡片：oklch(0.18 0.015 265 / 0.6) + backdrop-blur
- 主色：电蓝 oklch(0.62 0.22 250)
- 辅助：薰衣草紫 oklch(0.65 0.18 290)

**Layout Paradigm**:
- 240px 左侧边栏（毛玻璃材质）
- 主内容区三列瀑布流网格
- 顶部 48px 状态栏（显示时间、用户、通知）

**Signature Elements**:
1. 卡片内部的微光渐变（左上角白色光斑）
2. 图表背景的六边形网格纹理（极低透明度）
3. 导航激活项的蓝色光晕扩散效果

**Interaction Philosophy**:
- 鼠标悬停时卡片轻微上浮（translateY -2px）
- 点击时涟漪效果从点击位置扩散
- 侧边栏折叠为 56px 图标模式

**Animation**:
- 数据卡片入场：staggered fade-in + scale(0.95→1)
- 图表绘制：路径描边动画
- 页面切换：交叉淡入淡出

**Typography System**:
- 标题：Space Grotesk（现代几何感）
- 正文：DM Sans（柔和易读）
- 数字 KPI：Space Grotesk Bold + 字母间距 -0.02em
</idea>
</text>
</response>

<response>
<probability>0.05</probability>
<text>
<idea>
**Design Movement**: 极简斯堪的纳维亚数据设计（Scandinavian Data Minimalism）

**Core Principles**:
1. 大量留白作为主动设计元素
2. 单色调为主，仅用颜色传达状态信息
3. 强调内容层级而非装饰
4. 清晰的视觉动线引导

**Color Philosophy**:
- 背景：暖白 oklch(0.98 0.003 65)
- 卡片：纯白 oklch(1 0 0)，细边框
- 主色：深森林绿 oklch(0.38 0.12 160)
- 数据色：绿/黄/红三色语义系统

**Layout Paradigm**:
- 200px 左侧边栏（白色，细分割线）
- 内容区宽松网格，大量留白
- 顶部 56px 面包屑导航栏

**Signature Elements**:
1. 细线图表（1.5px 描边，无填充）
2. 数据标签直接标注在图表上（无图例）
3. 状态指示点（8px 圆点，绿/黄/红）

**Interaction Philosophy**:
- 极简悬停效果（仅背景色变化）
- 无多余动画，专注数据
- 展开/折叠用 chevron 图标

**Animation**:
- 仅必要的过渡：200ms ease
- 数据更新时数字淡入淡出
- 无页面切换动画

**Typography System**:
- 全站：Geist（现代、清晰、专业）
- KPI 数字：Geist Mono
- 标签：Geist 12px uppercase letter-spacing
</idea>
</text>
</response>

---

## 选定方案

**选定：方案二 — 暗色玻璃态精英主义**

理由：对于销售分析仪表板，深色主题能减少长时间盯屏的视觉疲劳，毛玻璃层次感使数据卡片自然分组，蓝紫色调与"科技感、专业性"的内部工具定位高度契合。
