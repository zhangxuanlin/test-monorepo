// =============================================================
// Sales Analytics Dashboard — Mock CRM Data
// All data is simulated for demonstration purposes
// =============================================================

export type CustomerStatus = "active" | "inactive" | "prospect";
export type LeadStatus = "new" | "contacted" | "qualified" | "lost";
export type OrderStatus = "pending" | "processing" | "completed" | "cancelled";
export type PipelineStage = "prospecting" | "qualification" | "proposal" | "negotiation" | "closed_won" | "closed_lost";

// ── Customers ──────────────────────────────────────────────────
export interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: CustomerStatus;
  totalRevenue: number;
  lastContact: string;
  region: string;
  avatar: string;
}

export const customers: Customer[] = [
  { id: "c001", name: "张伟", company: "腾讯科技", email: "zhang.wei@tencent.com", phone: "138-0000-1234", status: "active", totalRevenue: 1250000, lastContact: "2026-04-20", region: "华南", avatar: "ZW" },
  { id: "c002", name: "李娜", company: "阿里巴巴", email: "li.na@alibaba.com", phone: "139-0000-5678", status: "active", totalRevenue: 980000, lastContact: "2026-04-18", region: "华东", avatar: "LN" },
  { id: "c003", name: "王强", company: "字节跳动", email: "wang.qiang@bytedance.com", phone: "136-0000-9012", status: "active", totalRevenue: 2100000, lastContact: "2026-04-22", region: "华北", avatar: "WQ" },
  { id: "c004", name: "刘洋", company: "美团", email: "liu.yang@meituan.com", phone: "137-0000-3456", status: "inactive", totalRevenue: 450000, lastContact: "2026-03-15", region: "华北", avatar: "LY" },
  { id: "c005", name: "陈静", company: "京东", email: "chen.jing@jd.com", phone: "135-0000-7890", status: "active", totalRevenue: 1680000, lastContact: "2026-04-21", region: "华北", avatar: "CJ" },
  { id: "c006", name: "赵磊", company: "小米科技", email: "zhao.lei@xiaomi.com", phone: "133-0000-2345", status: "prospect", totalRevenue: 0, lastContact: "2026-04-10", region: "华北", avatar: "ZL" },
  { id: "c007", name: "孙芳", company: "网易", email: "sun.fang@netease.com", phone: "132-0000-6789", status: "active", totalRevenue: 760000, lastContact: "2026-04-19", region: "华东", avatar: "SF" },
  { id: "c008", name: "周浩", company: "百度", email: "zhou.hao@baidu.com", phone: "131-0000-0123", status: "inactive", totalRevenue: 320000, lastContact: "2026-02-28", region: "华北", avatar: "ZH" },
  { id: "c009", name: "吴丽", company: "滴滴出行", email: "wu.li@didi.com", phone: "130-0000-4567", status: "active", totalRevenue: 890000, lastContact: "2026-04-23", region: "华北", avatar: "WL" },
  { id: "c010", name: "郑明", company: "拼多多", email: "zheng.ming@pinduoduo.com", phone: "158-0000-8901", status: "prospect", totalRevenue: 0, lastContact: "2026-04-15", region: "华东", avatar: "ZM" },
];

// ── Leads ──────────────────────────────────────────────────────
export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  source: string;
  status: LeadStatus;
  value: number;
  assignedTo: string;
  createdAt: string;
}

export const leads: Lead[] = [
  { id: "l001", name: "黄晓明", company: "华为技术", email: "huang@huawei.com", source: "官网表单", status: "qualified", value: 500000, assignedTo: "销售一组", createdAt: "2026-04-01" },
  { id: "l002", name: "马云飞", company: "中兴通讯", email: "ma@zte.com", source: "展会", status: "contacted", value: 280000, assignedTo: "销售二组", createdAt: "2026-04-05" },
  { id: "l003", name: "徐静蕾", company: "OPPO", email: "xu@oppo.com", source: "推荐", status: "new", value: 150000, assignedTo: "销售一组", createdAt: "2026-04-10" },
  { id: "l004", name: "林志颖", company: "vivo", email: "lin@vivo.com", source: "社交媒体", status: "lost", value: 320000, assignedTo: "销售三组", createdAt: "2026-03-20" },
  { id: "l005", name: "杨幂", company: "联想集团", email: "yang@lenovo.com", source: "邮件营销", status: "qualified", value: 780000, assignedTo: "销售二组", createdAt: "2026-04-08" },
  { id: "l006", name: "刘德华", company: "TCL科技", email: "liu@tcl.com", source: "官网表单", status: "contacted", value: 420000, assignedTo: "销售一组", createdAt: "2026-04-12" },
  { id: "l007", name: "张学友", company: "海尔集团", email: "zhang@haier.com", source: "展会", status: "new", value: 650000, assignedTo: "销售三组", createdAt: "2026-04-18" },
  { id: "l008", name: "谢霆锋", company: "格力电器", email: "xie@gree.com", source: "推荐", status: "qualified", value: 920000, assignedTo: "销售二组", createdAt: "2026-04-14" },
];

// ── Contacts ──────────────────────────────────────────────────
export interface Contact {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  department: string;
  linkedCustomerId?: string;
}

export const contacts: Contact[] = [
  { id: "ct001", name: "张伟", title: "采购总监", company: "腾讯科技", email: "zhang.wei@tencent.com", phone: "138-0000-1234", department: "采购部", linkedCustomerId: "c001" },
  { id: "ct002", name: "王芳", title: "IT经理", company: "腾讯科技", email: "wang.fang@tencent.com", phone: "138-0000-5678", department: "IT部", linkedCustomerId: "c001" },
  { id: "ct003", name: "李娜", title: "CEO", company: "阿里巴巴", email: "li.na@alibaba.com", phone: "139-0000-5678", department: "管理层", linkedCustomerId: "c002" },
  { id: "ct004", name: "王强", title: "CTO", company: "字节跳动", email: "wang.qiang@bytedance.com", phone: "136-0000-9012", department: "技术部", linkedCustomerId: "c003" },
  { id: "ct005", name: "陈静", title: "供应链总监", company: "京东", email: "chen.jing@jd.com", phone: "135-0000-7890", department: "供应链", linkedCustomerId: "c005" },
  { id: "ct006", name: "赵磊", title: "商务总监", company: "小米科技", email: "zhao.lei@xiaomi.com", phone: "133-0000-2345", department: "商务部", linkedCustomerId: "c006" },
  { id: "ct007", name: "孙芳", title: "产品经理", company: "网易", email: "sun.fang@netease.com", phone: "132-0000-6789", department: "产品部", linkedCustomerId: "c007" },
  { id: "ct008", name: "周浩", title: "技术总监", company: "百度", email: "zhou.hao@baidu.com", phone: "131-0000-0123", department: "技术部", linkedCustomerId: "c008" },
];

// ── Orders ──────────────────────────────────────────────────────
export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  product: string;
  amount: number;
  status: OrderStatus;
  createdAt: string;
  dueDate: string;
  region: string;
}

export const orders: Order[] = [
  { id: "o001", customerId: "c001", customerName: "腾讯科技", product: "企业SaaS套件 Pro", amount: 350000, status: "completed", createdAt: "2026-04-01", dueDate: "2026-04-15", region: "华南" },
  { id: "o002", customerId: "c003", customerName: "字节跳动", product: "数据分析平台", amount: 580000, status: "processing", createdAt: "2026-04-10", dueDate: "2026-04-30", region: "华北" },
  { id: "o003", customerId: "c002", customerName: "阿里巴巴", product: "CRM集成模块", amount: 220000, status: "completed", createdAt: "2026-03-20", dueDate: "2026-04-05", region: "华东" },
  { id: "o004", customerId: "c005", customerName: "京东", product: "供应链优化系统", amount: 460000, status: "pending", createdAt: "2026-04-18", dueDate: "2026-05-10", region: "华北" },
  { id: "o005", customerId: "c007", customerName: "网易", product: "营销自动化工具", amount: 180000, status: "completed", createdAt: "2026-04-05", dueDate: "2026-04-20", region: "华东" },
  { id: "o006", customerId: "c009", customerName: "滴滴出行", product: "企业SaaS套件 Basic", amount: 120000, status: "processing", createdAt: "2026-04-15", dueDate: "2026-04-28", region: "华北" },
  { id: "o007", customerId: "c004", customerName: "美团", product: "数据分析平台", amount: 280000, status: "cancelled", createdAt: "2026-03-10", dueDate: "2026-03-25", region: "华北" },
  { id: "o008", customerId: "c001", customerName: "腾讯科技", product: "安全合规模块", amount: 95000, status: "pending", createdAt: "2026-04-20", dueDate: "2026-05-05", region: "华南" },
  { id: "o009", customerId: "c003", customerName: "字节跳动", product: "AI助手集成", amount: 750000, status: "processing", createdAt: "2026-04-22", dueDate: "2026-05-20", region: "华北" },
  { id: "o010", customerId: "c002", customerName: "阿里巴巴", product: "企业SaaS套件 Pro", amount: 420000, status: "completed", createdAt: "2026-04-08", dueDate: "2026-04-22", region: "华东" },
];

// ── Pipeline ──────────────────────────────────────────────────
export interface PipelineDeal {
  id: string;
  name: string;
  company: string;
  value: number;
  stage: PipelineStage;
  probability: number;
  assignedTo: string;
  expectedClose: string;
}

export const pipelineDeals: PipelineDeal[] = [
  { id: "p001", name: "华为大客户合同", company: "华为技术", value: 2000000, stage: "negotiation", probability: 75, assignedTo: "王销售", expectedClose: "2026-05-15" },
  { id: "p002", name: "中兴年度服务", company: "中兴通讯", value: 800000, stage: "proposal", probability: 50, assignedTo: "李销售", expectedClose: "2026-05-30" },
  { id: "p003", name: "OPPO渠道合作", company: "OPPO", value: 450000, stage: "qualification", probability: 30, assignedTo: "张销售", expectedClose: "2026-06-10" },
  { id: "p004", name: "联想集团SaaS", company: "联想集团", value: 1200000, stage: "negotiation", probability: 80, assignedTo: "王销售", expectedClose: "2026-05-08" },
  { id: "p005", name: "TCL数字化转型", company: "TCL科技", value: 680000, stage: "proposal", probability: 55, assignedTo: "李销售", expectedClose: "2026-06-01" },
  { id: "p006", name: "海尔IoT平台", company: "海尔集团", value: 950000, stage: "closed_won", probability: 100, assignedTo: "张销售", expectedClose: "2026-04-20" },
  { id: "p007", name: "格力能源管理", company: "格力电器", value: 1500000, stage: "prospecting", probability: 15, assignedTo: "赵销售", expectedClose: "2026-07-01" },
  { id: "p008", name: "vivo营销系统", company: "vivo", value: 380000, stage: "closed_lost", probability: 0, assignedTo: "赵销售", expectedClose: "2026-04-15" },
];

// ── Revenue Chart Data ─────────────────────────────────────────
export const monthlyRevenue = [
  { month: "1月", revenue: 1200000, target: 1000000, deals: 18 },
  { month: "2月", revenue: 980000, target: 1100000, deals: 15 },
  { month: "3月", revenue: 1450000, target: 1200000, deals: 22 },
  { month: "4月", revenue: 1680000, target: 1300000, deals: 26 },
  { month: "5月", revenue: 1320000, target: 1400000, deals: 20 },
  { month: "6月", revenue: 1890000, target: 1500000, deals: 29 },
  { month: "7月", revenue: 2100000, target: 1600000, deals: 31 },
  { month: "8月", revenue: 1750000, target: 1700000, deals: 27 },
  { month: "9月", revenue: 2250000, target: 1800000, deals: 34 },
  { month: "10月", revenue: 2480000, target: 1900000, deals: 38 },
  { month: "11月", revenue: 2680000, target: 2000000, deals: 41 },
  { month: "12月", revenue: 3100000, target: 2200000, deals: 47 },
];

export const regionRevenue = [
  { region: "华北", value: 4200000, percentage: 35 },
  { region: "华东", value: 3600000, percentage: 30 },
  { region: "华南", value: 2400000, percentage: 20 },
  { region: "西部", value: 1200000, percentage: 10 },
  { region: "其他", value: 600000, percentage: 5 },
];

export const productRevenue = [
  { product: "企业SaaS套件 Pro", revenue: 4800000 },
  { product: "数据分析平台", revenue: 3200000 },
  { product: "CRM集成模块", revenue: 1800000 },
  { product: "AI助手集成", revenue: 2400000 },
  { product: "供应链优化系统", revenue: 1600000 },
];

// ── KPI Summary ───────────────────────────────────────────────
export const kpiData = {
  totalRevenue: 21880000,
  revenueGrowth: 23.5,
  totalCustomers: 248,
  customerGrowth: 12.8,
  totalDeals: 348,
  dealGrowth: 18.2,
  avgDealSize: 62874,
  conversionRate: 34.6,
  pipelineValue: 7960000,
  winRate: 68.5,
};

// ── Sales Targets ─────────────────────────────────────────────
export const salesTargets = [
  { name: "王销售", target: 3000000, achieved: 2650000, deals: 42 },
  { name: "李销售", target: 2500000, achieved: 2800000, deals: 38 },
  { name: "张销售", target: 2800000, achieved: 2100000, deals: 35 },
  { name: "赵销售", target: 2000000, achieved: 1850000, deals: 29 },
  { name: "刘销售", target: 2200000, achieved: 2400000, deals: 33 },
];

// ── Utility ───────────────────────────────────────────────────
export function formatCurrency(value: number): string {
  if (value >= 1000000) return `¥${(value / 1000000).toFixed(1)}M`;
  if (value >= 10000) return `¥${(value / 10000).toFixed(0)}万`;
  return `¥${value.toLocaleString()}`;
}

export function formatNumber(value: number): string {
  return value.toLocaleString("zh-CN");
}

export const statusColorMap: Record<string, string> = {
  active: "badge-success",
  inactive: "badge-danger",
  prospect: "badge-info",
  new: "badge-info",
  contacted: "badge-warning",
  qualified: "badge-success",
  lost: "badge-danger",
  pending: "badge-warning",
  processing: "badge-info",
  completed: "badge-success",
  cancelled: "badge-danger",
};

export const statusLabelMap: Record<string, string> = {
  active: "活跃",
  inactive: "非活跃",
  prospect: "潜在客户",
  new: "新线索",
  contacted: "已联系",
  qualified: "已认定",
  lost: "已流失",
  pending: "待处理",
  processing: "处理中",
  completed: "已完成",
  cancelled: "已取消",
  prospecting: "开拓中",
  qualification: "资质认定",
  proposal: "提案阶段",
  negotiation: "谈判中",
  closed_won: "赢单",
  closed_lost: "丢单",
};
