import { useEffect, useRef, useState } from "react";
import { Check, Trash2 } from "lucide-react";
import { PRIORITIES } from "../constants";

export default function TodoItem({ todo, onToggle, onDelete, onEdit, onCyclePriority }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const save = () => {
    const t = draft.trim();
    if (t) onEdit(todo.id, t);
    else setDraft(todo.text);
    setEditing(false);
  };

  const p = PRIORITIES[todo.priority];

  return (
    <li
      className={
        "todo enter relative flex items-center gap-3 bg-white rounded-xl shadow-sm border border-slate-100 pl-4 pr-3 py-3 mb-2 overflow-hidden" +
        (todo.removing ? " removing" : "")
      }
    >
      <span className={"absolute left-0 top-0 bottom-0 w-1 " + p.bar} />

      <button
        onClick={() => onToggle(todo.id)}
        aria-label="ทำเครื่องหมายว่าเสร็จ"
        className={
          "shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors " +
          (todo.done
            ? "bg-indigo-600 border-indigo-600 text-white"
            : "border-slate-300 hover:border-indigo-400 text-transparent")
        }
      >
        <Check size={14} strokeWidth={3} />
      </button>

      <div className="flex-1 min-w-0">
        {editing ? (
          <input
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={save}
            onKeyDown={(e) => {
              if (e.key === "Enter") save();
              if (e.key === "Escape") {
                setDraft(todo.text);
                setEditing(false);
              }
            }}
            className="w-full px-2 py-1 -my-1 rounded-md border border-indigo-300 outline-none ring-2 ring-indigo-100 text-[15px]"
          />
        ) : (
          <span
            onDoubleClick={() => {
              setDraft(todo.text);
              setEditing(true);
            }}
            title="ดับเบิลคลิกเพื่อแก้ไข"
            className={
              "block text-[15px] break-words cursor-text select-none " +
              (todo.done ? "line-through text-slate-400" : "text-slate-800")
            }
          >
            {todo.text}
          </span>
        )}
      </div>

      <button
        onClick={() => onCyclePriority(todo.id)}
        title="แตะเพื่อเปลี่ยนความสำคัญ"
        className={"shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ring-1 " + p.badge}
      >
        {p.label}
      </button>

      <button
        onClick={() => onDelete(todo.id)}
        aria-label="ลบ"
        className="shrink-0 p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
      >
        <Trash2 size={17} />
      </button>
    </li>
  );
}
