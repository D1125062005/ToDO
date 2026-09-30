export const PRIORITIES = {
  low:    { label: "ต่ำ",  badge: "bg-emerald-50 text-emerald-700 ring-emerald-200", on: "bg-emerald-500 text-white", bar: "bg-emerald-400" },
  medium: { label: "กลาง", badge: "bg-amber-50 text-amber-700 ring-amber-200",       on: "bg-amber-500 text-white",   bar: "bg-amber-400" },
  high:   { label: "สูง",  badge: "bg-rose-50 text-rose-700 ring-rose-200",          on: "bg-rose-500 text-white",    bar: "bg-rose-400" },
};
export const PRIORITY_ORDER = ["low", "medium", "high"];
export const FILTERS = [
  ["all", "ทั้งหมด"],
  ["active", "ยังไม่เสร็จ"],
  ["completed", "เสร็จแล้ว"],
];
