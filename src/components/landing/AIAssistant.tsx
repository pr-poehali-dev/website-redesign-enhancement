import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { QUICK_QUESTIONS, NORM_DOCS, getAIAnswer } from "./data";

type Message = { role: "user" | "ai"; text: string };

export function NormDocs() {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "hsl(240 12% 10%)", border: "1px solid rgba(124,58,237,0.15)" }}>
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between p-6 text-left group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(124,58,237,0.2)" }}>
            <Icon name="ScrollText" size={18} className="text-purple-400" />
          </div>
          <div>
            <div className="font-oswald font-bold text-white text-lg">Нормативные документы</div>
            <div className="text-xs" style={{ color: "#9ca3af" }}>{NORM_DOCS.length} документов · нажмите для раскрытия</div>
          </div>
        </div>
        <Icon name={open ? "ChevronUp" : "ChevronDown"} size={20} className="text-purple-400 transition-transform" />
      </button>
      {open && (
        <div className="px-6 pb-6 animate-fade-in">
          <div className="h-px mb-5" style={{ background: "rgba(124,58,237,0.2)" }} />
          <ol className="space-y-3">
            {NORM_DOCS.map((doc, i) => (
              <li key={i} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: "#d1d5db" }}>
                <span className="font-oswald font-bold shrink-0 text-base" style={{ color: "#a78bfa" }}>{i + 1}.</span>
                {doc}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: "Привет! Я ИИ-ассистент Лаборатории педагогического дизайна ЦДЮТТ «Охта». Спросите меня о площадке, методах работы или ближайших событиях. 🚀" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const send = async (text?: string) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;
    setInput("");
    setMessages(p => [...p, { role: "user", text: msg }]);
    setLoading(true);
    await new Promise(r => setTimeout(r, 600 + Math.random() * 700));
    setMessages(p => [...p, { role: "ai", text: getAIAnswer(msg) }]);
    setLoading(false);
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-80 md:w-96 animate-scale-in shadow-2xl">
          <div className="rounded-2xl overflow-hidden" style={{ background: "hsl(240 12% 8%)", border: "1px solid rgba(124,58,237,0.35)" }}>
            <div className="p-4 flex items-center gap-3" style={{ background: "linear-gradient(135deg,#7c3aed,#2563eb)" }}>
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl">🤖</div>
              <div>
                <div className="font-oswald font-semibold text-white">ИИ-ассистент</div>
                <div className="text-xs text-white/70">Лаборатория пед. дизайна</div>
              </div>
              <button onClick={() => setOpen(false)} className="ml-auto text-white/70 hover:text-white">
                <Icon name="X" size={18} />
              </button>
            </div>
            <div className="h-64 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] p-3 text-sm leading-relaxed ${m.role === "user" ? "chat-bubble-user text-white" : "chat-bubble-ai text-gray-200"}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="chat-bubble-ai p-3 flex gap-1 items-center">
                    <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>
            {messages.length <= 2 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1">
                {QUICK_QUESTIONS.map((q, i) => (
                  <button key={i} onClick={() => send(q)}
                    className="text-xs px-2 py-1 rounded-full hover:scale-105 transition-all"
                    style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", color: "#a78bfa" }}>
                    {q}
                  </button>
                ))}
              </div>
            )}
            <div className="p-3 border-t" style={{ borderColor: "rgba(124,58,237,0.2)" }}>
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && send()}
                  placeholder="Задайте вопрос..."
                  className="flex-1 rounded-xl px-3 py-2 text-sm outline-none text-white placeholder-gray-500"
                  style={{ background: "hsl(240 12% 15%)", border: "1px solid rgba(124,58,237,0.2)" }}
                />
                <button onClick={() => send()} className="w-9 h-9 rounded-xl flex items-center justify-center btn-glow shrink-0">
                  <Icon name="Send" size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(v => !v)}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-2xl flex items-center justify-center btn-glow animate-pulse-glow shadow-2xl"
      >
        {open ? <Icon name="X" size={22} /> : <span className="text-2xl">🤖</span>}
      </button>
    </>
  );
}
