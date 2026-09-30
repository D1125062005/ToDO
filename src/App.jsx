import { useState } from "react";
import { Plus } from "lucide-react";
import TodoItem from "./components/TodoItem";
import { PRIORITIES, PRIORITY_ORDER, FILTERS } from "./constants";

let nextId = 4;

export default function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "ส่งรายงานประจำสัปดาห์", done: false, priority: "high" },
    { id: 2, text: "ซื้อของเข้าบ้าน", done: false, priority: "medium" },
    { id: 3, text: "โทรหาคุณแม่", done: true, priority: "low" },
  ]);
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("medium");
  const [filter, setFilter] = useState("all");

  const add = () => {
    const t = text.trim();
    if (!t) return;
    setTodos((ts) => [{ id: nextId++, text: t, done: false, priority }, ...ts]);
    setText("");
  };
  const toggle = (id) =>
    setTodos((ts) => ts.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  const edit = (id, v) =>
    setTodos((ts) => ts.map((t) => (t.id === id ? { ...t, text: v } : t)));
  const cycle = (id) =>
    setTodos((ts) =>
      ts.map((t) =>
        t.id === id
          ? { ...t, priority: PRIORITY_ORDER[(PRIORITY_ORDER.indexOf(t.priority) + 1) % 3] }
          : t
      )
    );
  const remove = (id) => {
    setTodos((ts) => ts.map((t) => (t.id === id ? { ...t, removing: true } : t)));
    setTimeout(() => setTodos((ts) => ts.filter((t) => t.id !== id)), 250);
  };
  const clearDone = () => {
    setTodos((ts) => ts.map((t) => (t.done ? { ...t, removing: true } : t)));
    setTimeout(() => setTodos((ts) => ts.filter((t) => !t.done)), 250);
  };

  const remaining = todos.filter((t) => !t.done && !t.removing).length;
  const doneCount = todos.filter((t) => t.done && !t.removing).length;
  const visible = todos.filter(
    (t) => filter === "all" || (filter === "active" ? !t.done : t.done)
  );

  return (
    <div className="min-h-screen px-4 py-8 sm:py-14">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-1">รายการงานของฉัน</h1>
        <p className="text-slate-500 text-sm mb-6">จดสิ่งที่ต้องทำ แล้วติ๊กเมื่อทำเสร็จ</p>

        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-4 mb-5">
          <div className="flex gap-2">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && add()}
              placeholder="เพิ่มงานใหม่..."
              aria-label="เพิ่มงานใหม่"
              className="flex-1 min-w-0 px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 text-[15px]"
            />
            <button
              onClick={add}
              className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors"
            >
              <Plus size={17} />
              <span className="hidden sm:inline">เพิ่ม</span>
            </button>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-xs text-slate-500 mr-1">ความสำคัญ</span>
            {PRIORITY_ORDER.map((k) => (
              <button
                key={k}
                onClick={() => setPriority(k)}
                className={
                  "text-xs font-medium px-3 py-1.5 rounded-full ring-1 transition-colors " +
                  (priority === k ? PRIORITIES[k].on + " ring-transparent" : PRIORITIES[k].badge)
                }
              >
                {PRIORITIES[k].label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-1 p-1 bg-slate-200/70 rounded-xl mb-4" role="tablist">
          {FILTERS.map(([k, label]) => (
            <button
              key={k}
              role="tab"
              aria-selected={filter === k}
              onClick={() => setFilter(k)}
              className={
                "flex-1 py-2 rounded-lg text-sm font-medium transition-all " +
                (filter === k
                  ? "bg-white shadow-sm text-slate-900"
                  : "text-slate-500 hover:text-slate-700")
              }
            >
              {label}
            </button>
          ))}
        </div>

        <ul className="list-none p-0 m-0">
          {visible.map((t) => (
            <TodoItem
              key={t.id}
              todo={t}
              onToggle={toggle}
              onDelete={remove}
              onEdit={edit}
              onCyclePriority={cycle}
            />
          ))}
        </ul>

        {visible.length === 0 && (
          <div className="bg-white rounded-xl border border-dashed border-slate-300 text-center text-slate-500 text-sm py-10 px-4">
            {filter === "completed"
              ? "ยังไม่มีงานที่เสร็จ"
              : filter === "active"
              ? "ไม่มีงานค้าง เยี่ยมมาก!"
              : "ยังไม่มีงาน เพิ่มงานแรกของคุณด้านบน"}
          </div>
        )}

        <div className="flex items-center justify-between mt-4 px-1 text-sm">
          <span className="text-slate-600">
            เหลืออีก <b className="text-slate-900">{remaining}</b> งาน
          </span>
          <button
            onClick={clearDone}
            disabled={doneCount === 0}
            className="text-rose-600 hover:bg-rose-50 disabled:text-slate-300 disabled:hover:bg-transparent px-3 py-1.5 rounded-lg transition-colors"
          >
            ล้างที่เสร็จแล้ว{doneCount > 0 ? ` (${doneCount})` : ""}
          </button>
        </div>
        <p className="text-xs text-slate-400 mt-6 text-center">
          ดับเบิลคลิกที่ข้อความเพื่อแก้ไข · แตะป้ายความสำคัญเพื่อเปลี่ยนระดับ
        </p>
      </div>
    </div>
  );
}
