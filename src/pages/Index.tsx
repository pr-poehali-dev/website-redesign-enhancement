import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

/* ─── Images ─── */
const IMG_HERO = "https://cdn.poehali.dev/projects/1c015a27-63aa-4d64-8203-0abbad0db560/files/3d25f0c7-8819-4a1d-a14f-431c446785f4.jpg";
const IMG_LAB  = "https://cdn.poehali.dev/projects/1c015a27-63aa-4d64-8203-0abbad0db560/files/6723381e-cd2f-48c6-8071-4d03b7ce9cae.jpg";
const IMG_SEM  = "https://cdn.poehali.dev/projects/1c015a27-63aa-4d64-8203-0abbad0db560/files/90a4f7f3-d0d3-4c9f-a63b-022b47a7efac.jpg";

/* ─── Nav ─── */
const NAV_ITEMS = [
  { id: "about",     label: "О площадке" },
  { id: "lab",       label: "Лаборатория" },
  { id: "projects",  label: "Проекты" },
  { id: "timeline",  label: "Этапы" },
  { id: "team",      label: "Команда" },
  { id: "materials", label: "Материалы" },
  { id: "contacts",  label: "Контакты" },
];

/* ─── Lab Modules ─── */
const LAB_MODULES = [
  {
    emoji: "🎨",
    title: "Педагогический дизайн",
    color: "from-violet-600 to-purple-600",
    desc: "Системный подход к проектированию образовательного процесса: от анализа потребностей до оценки результатов.",
    tools: ["ADDIE-модель", "Rapid Prototyping", "UX в образовании", "Learning Canvas"],
  },
  {
    emoji: "🔬",
    title: "Методическая лаборатория",
    color: "from-blue-600 to-cyan-600",
    desc: "Пространство для апробации и экспертизы авторских методических разработок педагогов учреждения.",
    tools: ["Методический анализ", "Peer Review", "Экспертиза программ", "Банк практик"],
  },
  {
    emoji: "💡",
    title: "Инновационная мастерская",
    color: "from-cyan-600 to-teal-500",
    desc: "Создание и тестирование инновационных образовательных форматов, адаптированных под ДО.",
    tools: ["Design Thinking", "Agile в педагогике", "EdTech-инструменты", "Геймификация"],
  },
  {
    emoji: "🌐",
    title: "Сетевой хаб",
    color: "from-indigo-600 to-blue-600",
    desc: "Профессиональное сообщество педагогов района: обмен опытом, совместные проекты, менторство.",
    tools: ["Communities of Practice", "Наставничество", "Проектные группы", "Горизонтальное обучение"],
  },
];

/* ─── Design Approach Steps ─── */
const DESIGN_STEPS = [
  { num: "01", title: "Анализ", icon: "Search", desc: "Диагностика потребностей педагогов и образовательных дефицитов" },
  { num: "02", title: "Проектирование", icon: "PenTool", desc: "Создание концепции и структуры образовательного продукта" },
  { num: "03", title: "Разработка", icon: "Cpu", desc: "Создание контента, методических материалов и инструментов" },
  { num: "04", title: "Апробация", icon: "FlaskConical", desc: "Пилотное внедрение и сбор обратной связи от участников" },
  { num: "05", title: "Оценка", icon: "BarChart3", desc: "Анализ эффективности и корректировка образовательного продукта" },
];

/* ─── Timeline ─── */
const TIMELINE = [
  {
    year: "2023",
    quarter: "I полугодие",
    title: "Запуск площадки",
    desc: "Формирование команды, разработка концепции инновационной площадки. Первый установочный семинар для участников.",
    badge: "Старт",
    color: "#7c3aed",
  },
  {
    year: "2023",
    quarter: "II полугодие",
    title: "Диагностический этап",
    desc: "Анализ методической службы учреждения. Выявление точек роста и профессиональных дефицитов педагогов.",
    badge: "Исследование",
    color: "#2563eb",
  },
  {
    year: "2024",
    quarter: "I квартал",
    title: "Открытие Лаборатории",
    desc: "Создание Лаборатории педагогического дизайна. Первые авторские методические разработки команды.",
    badge: "Прорыв",
    color: "#0891b2",
  },
  {
    year: "2024",
    quarter: "II квартал",
    title: "Районные мастер-классы",
    desc: "Серия открытых мастер-классов для педагогов Красногвардейского района. 40+ участников, 8 мероприятий.",
    badge: "Масштаб",
    color: "#059669",
  },
  {
    year: "2024",
    quarter: "IV квартал",
    title: "Победа во Всероссийском конкурсе",
    desc: "Призовое место во Всероссийском конкурсе «Инновации в образовании — 2024». Признание на федеральном уровне.",
    badge: "🏆 Победа",
    color: "#d97706",
  },
  {
    year: "2025",
    quarter: "I полугодие",
    title: "Итоговый семинар",
    desc: "Районная конференция «Фронтиры-2025». Представление результатов работы площадки, обмен опытом с коллегами.",
    badge: "Итоги",
    color: "#7c3aed",
  },
];

/* ─── Projects ─── */
const PROJECTS = [
  { icon: "Lightbulb",     tag: "Методология",  title: "Педагогический дизайн",            desc: "Системная разработка и внедрение принципов педагогического дизайна в работу методической службы ДО.",                   year: "2023–2025", status: "Активный" },
  { icon: "GraduationCap", tag: "Образование",  title: "Развитие методической службы",     desc: "Трансформация методической работы: от традиционных форматов к проектной и исследовательской деятельности.",             year: "2023–2025", status: "Активный" },
  { icon: "Cpu",           tag: "Технологии",   title: "Цифровые инструменты педагога",    desc: "Освоение и практическое применение EdTech-сервисов: Miro, Canva, Notion, интерактивные доски и AI-ассистенты.",          year: "2024",      status: "Завершён" },
  { icon: "Network",       tag: "Партнёрство",  title: "Сетевое взаимодействие",           desc: "Профессиональное сообщество педагогов ДО Красногвардейского района. Горизонтальное обучение и обмен практиками.",         year: "2024–2025", status: "Активный" },
  { icon: "BookOpen",      tag: "Исследования", title: "Банк лучших практик",              desc: "Сбор, описание и тиражирование лучших педагогических практик методической службы в системе ДО Санкт-Петербурга.",          year: "2025",      status: "Планируется" },
  { icon: "Trophy",        tag: "Конкурсы",     title: "Конкурсная деятельность",          desc: "Подготовка и сопровождение педагогов в конкурсах профессионального мастерства: районных, городских, всероссийских.",      year: "2023–2025", status: "Активный" },
];

/* ─── News ─── */
const NEWS = [
  {
    date: "15 апреля 2025",
    tag: "Конференция",
    title: "Итоговая конференция «Фронтиры-2025»",
    desc: "Районная конференция по итогам работы инновационной площадки. Более 40 педагогов представили результаты инновационной деятельности.",
    hot: true,
  },
  {
    date: "28 февраля 2025",
    tag: "Публикация",
    title: "Методические рекомендации 2025",
    desc: "Обновлённый сборник методических рекомендаций по педагогическому дизайну для педагогов дополнительного образования.",
    hot: false,
  },
  {
    date: "10 декабря 2024",
    tag: "🏆 Победа",
    title: "Призовое место во Всероссийском конкурсе",
    desc: "Команда площадки заняла призовое место во Всероссийском конкурсе «Инновации в образовании — 2024» в номинации «Методическая деятельность».",
    hot: false,
  },
  {
    date: "5 ноября 2024",
    tag: "Мастер-класс",
    title: "Серия мастер-классов по пед. дизайну",
    desc: "Цикл из 4 открытых мастер-классов для педагогов района. Темы: ADDIE-модель, Learning Canvas, геймификация, обратная связь.",
    hot: false,
  },
];

/* ─── Team ─── */
const TEAM = [
  {
    name: "Руководитель площадки",
    role: "Директор ЦДЮТТ «Охта»",
    quote: "Инновации начинаются с готовности меняться самому",
    emoji: "👩‍💼",
    color: "from-purple-600 to-blue-600",
    resp: ["Стратегическое руководство", "Взаимодействие с партнёрами", "Экспертиза результатов"],
  },
  {
    name: "Методист-координатор",
    role: "Главный методист",
    quote: "Хорошо спроектированный урок — это произведение искусства",
    emoji: "👩‍🏫",
    color: "from-blue-600 to-cyan-600",
    resp: ["Координация методической работы", "Педагогическое проектирование", "Сопровождение педагогов"],
  },
  {
    name: "Педагог-инноватор",
    role: "Старший педагог",
    quote: "Каждый ребёнок — исследователь от природы",
    emoji: "🧑‍💻",
    color: "from-cyan-600 to-teal-600",
    resp: ["Разработка программ", "Апробация инноваций", "Цифровые инструменты"],
  },
  {
    name: "Аналитик-исследователь",
    role: "Методист по качеству",
    quote: "Данные помогают видеть то, что интуиция пропускает",
    emoji: "📊",
    color: "from-violet-600 to-purple-600",
    resp: ["Мониторинг качества", "Анализ результатов", "Отчётность и публикации"],
  },
];

/* ─── Materials ─── */
const MATERIALS = [
  { icon: "FileText",      title: "Программа инновационной площадки 2023–2025",         type: "PDF",  size: "2.4 МБ",  cat: "Документы" },
  { icon: "BookOpen",      title: "Методические рекомендации по педагогическому дизайну", type: "PDF",  size: "1.8 МБ",  cat: "Методика" },
  { icon: "Layout",        title: "Шаблоны Learning Canvas для педагогов",               type: "PDF",  size: "0.9 МБ",  cat: "Инструменты" },
  { icon: "Presentation",  title: "Презентации семинаров 2024",                          type: "ZIP",  size: "15 МБ",   cat: "Мероприятия" },
  { icon: "Video",         title: "Видеозапись итогового семинара «Фронтиры-2025»",      type: "MP4",  size: "—",       cat: "Мероприятия" },
  { icon: "ClipboardList", title: "Отчёт за 2023–2024 учебный год",                     type: "PDF",  size: "3.1 МБ",  cat: "Документы" },
  { icon: "BarChart2",     title: "Результаты диагностики методической службы",          type: "PDF",  size: "1.2 МБ",  cat: "Исследования" },
  { icon: "Link",          title: "Полезные EdTech-ресурсы и сервисы",                   type: "HTML", size: "—",       cat: "Инструменты" },
];

const MAT_CATS = ["Все", "Документы", "Методика", "Инструменты", "Мероприятия", "Исследования"];

/* ─── Partners ─── */
const PARTNERS = [
  { name: "Комитет по образованию СПб",  icon: "Building2" },
  { name: "АППО",                        icon: "GraduationCap" },
  { name: "ГБУ ДПО «ИМЦ»",             icon: "BookOpen" },
  { name: "Красногвардейский р-н",       icon: "MapPin" },
  { name: "РГПУ им. Герцена",            icon: "University" },
  { name: "Сетевые ОУ района",           icon: "Network" },
];

/* ─── AI quick answers ─── */
const QUICK_QUESTIONS = [
  "Что такое педагогический дизайн?",
  "Как вступить в площадку?",
  "Когда ближайшее мероприятие?",
  "Как скачать материалы?",
];

type Message = { role: "user" | "ai"; text: string };

function getAIAnswer(msg: string): string {
  const m = msg.toLowerCase();
  if (m.includes("педагогический дизайн") || m.includes("пед. дизайн") || m.includes("пед дизайн"))
    return "Педагогический дизайн (Instructional Design) — это системный подход к созданию эффективных образовательных программ и материалов. В основе — модель ADDIE: Analysis (анализ), Design (проектирование), Development (разработка), Implementation (внедрение), Evaluation (оценка). Наша лаборатория применяет эти принципы для совершенствования методической работы в ДО.";
  if (m.includes("вступить") || m.includes("участвовать") || m.includes("присоединиться") || m.includes("вступление"))
    return "Для участия в инновационной площадке обратитесь к методистам ЦДЮТТ «Охта» через форму в разделе «Контакты» или напишите на email. Площадка открыта для педагогов дополнительного образования Красногвардейского района и партнёрских учреждений.";
  if (m.includes("мероприятие") || m.includes("семинар") || m.includes("ближайш") || m.includes("конкурс") || m.includes("событие"))
    return "Анонсы мероприятий публикуются в разделе «Новости». В 2025 году прошла итоговая конференция «Фронтиры-2025». Следите за обновлениями — мы планируем серию новых мастер-классов и воркшопов по педагогическому дизайну.";
  if (m.includes("скачать") || m.includes("материал") || m.includes("документ") || m.includes("файл"))
    return "Все документы в разделе «Материалы»: программа площадки, методические рекомендации, Learning Canvas, презентации семинаров и отчёты. Нажмите на нужный документ — откроется для скачивания.";
  if (m.includes("addie") || m.includes("модель"))
    return "Модель ADDIE — классическая модель педагогического дизайна: 1) Analyse — анализ аудитории и целей, 2) Design — проектирование структуры, 3) Develop — создание контента, 4) Implement — внедрение, 5) Evaluate — оценка эффективности. Мы обучаем педагогов работать с этой моделью на практике.";
  if (m.includes("learning canvas") || m.includes("канвас"))
    return "Learning Canvas — инструмент визуального проектирования учебного занятия на одном листе. Помогает педагогу продумать цели, деятельность учеников, методы оценивания и ресурсы в единой логике. Шаблоны доступны в разделе «Материалы».";
  if (m.includes("команда") || m.includes("кто") || m.includes("педагог") || m.includes("руководит"))
    return "Команда площадки: руководитель (директор ЦДЮТТ «Охта»), методист-координатор, педагог-инноватор и аналитик-исследователь. Каждый отвечает за своё направление: стратегия, методика, апробация, аналитика. Подробнее — в разделе «Команда».";
  if (m.includes("контакт") || m.includes("адрес") || m.includes("телефон") || m.includes("почт") || m.includes("написать"))
    return "Адрес: Санкт-Петербург, Красногвардейский район. Учреждение: ГБУ ДО ЦДЮТТ «Охта». Email: info@center-okhta.spb.ru. Сайт учреждения: center-okhta.spb.ru. Используйте форму обратной связи в разделе «Контакты» — мы ответим в течение рабочего дня.";
  if (m.includes("результат") || m.includes("достижени") || m.includes("победа") || m.includes("итог"))
    return "Результаты 2023–2025: создана Лаборатория педагогического дизайна, проведено 10+ семинаров и мастер-классов, в сети площадки 40+ педагогов, опубликованы методические рекомендации, завоёвано призовое место во Всероссийском конкурсе «Инновации в образовании — 2024».";
  if (m.includes("привет") || m.includes("здравствуй") || m.includes("добр") || m.includes("hello"))
    return "Здравствуйте! Я ИИ-ассистент Лаборатории педагогического дизайна ЦДЮТТ «Охта». Готов ответить на вопросы о площадке, педагогическом дизайне, методах работы и мероприятиях. Спрашивайте!";
  if (m.includes("спасибо") || m.includes("благодар") || m.includes("отлично") || m.includes("помог"))
    return "Пожалуйста! Рад был помочь. Если возникнут ещё вопросы — всегда на связи. Успехов в педагогической деятельности! 🎓";
  return "Интересный вопрос! По этой теме рекомендую обратиться к методистам ЦДЮТТ «Охта» через форму «Контакты» — они дадут исчерпывающий ответ. Также посмотрите раздел «Материалы» — там есть методические рекомендации и полезные ресурсы.";
}

/* ═══════════ AI CHAT ═══════════ */
function AIAssistant() {
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

/* ═══════════ MAIN ═══════════ */
export default function Index() {
  const [activeSection, setActiveSection] = useState("about");
  const [mobileMenu, setMobileMenu]       = useState(false);
  const [activeStep, setActiveStep]       = useState(0);
  const [matFilter, setMatFilter]         = useState("Все");
  const [formSent, setFormSent]           = useState(false);
  const [contactForm, setContactForm]     = useState({ name: "", org: "", email: "", message: "" });
  const [expandedTeam, setExpandedTeam]   = useState<number | null>(null);

  /* scroll spy */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 130;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_ITEMS[i].id);
        if (el && el.offsetTop <= y) { setActiveSection(NAV_ITEMS[i].id); break; }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* auto-advance ADDIE steps */
  useEffect(() => {
    const t = setInterval(() => setActiveStep(s => (s + 1) % DESIGN_STEPS.length), 3000);
    return () => clearInterval(t);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenu(false);
  };

  const filteredMats = matFilter === "Все" ? MATERIALS : MATERIALS.filter(m => m.cat === matFilter);

  return (
    <div className="min-h-screen font-golos" style={{ background: "hsl(240 15% 6%)" }}>

      {/* ── NAV ── */}
      <nav className="nav-glass fixed top-0 left-0 right-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo("about")}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#7c3aed,#2563eb)" }}>
                <span className="text-white font-oswald font-bold text-sm">ФР</span>
              </div>
              <div className="hidden sm:block">
                <div className="font-oswald font-semibold text-white text-sm leading-tight">Фронтиры развития</div>
                <div className="text-xs" style={{ color: "#a78bfa" }}>Лаборатория пед. дизайна</div>
              </div>
            </div>
            <div className="hidden xl:flex items-center gap-0.5">
              {NAV_ITEMS.map(item => (
                <button key={item.id} onClick={() => scrollTo(item.id)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                  style={activeSection === item.id
                    ? { background: "rgba(124,58,237,0.2)", color: "#a78bfa" }
                    : { color: "#9ca3af" }}>
                  {item.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => scrollTo("contacts")} className="hidden sm:flex btn-glow text-white text-xs font-medium px-4 py-2 rounded-xl">
                Связаться
              </button>
              <button onClick={() => setMobileMenu(v => !v)} className="xl:hidden p-2" style={{ color: "#9ca3af" }}>
                <Icon name={mobileMenu ? "X" : "Menu"} size={22} />
              </button>
            </div>
          </div>
        </div>
        {mobileMenu && (
          <div className="xl:hidden px-4 pb-4 space-y-1 animate-fade-in">
            {NAV_ITEMS.map(item => (
              <button key={item.id} onClick={() => scrollTo(item.id)}
                className="block w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-white/5 transition-all"
                style={{ color: "#d1d5db" }}>
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ══════════ HERO ══════════ */}
      <section id="about" className="hero-bg grid-pattern min-h-screen flex items-center pt-16 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl animate-float" style={{ background: "radial-gradient(circle,#7c3aed,transparent)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl animate-float" style={{ background: "radial-gradient(circle,#2563eb,transparent)", animationDelay: "2s" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="tag-badge inline-flex items-center gap-1.5 mb-6 animate-fade-in-up stagger-1 opacity-0">
              <Icon name="Zap" size={12} />
              Районная инновационная площадка · ГБУ ДО ЦДЮТТ «Охта»
            </div>
            <h1 className="font-oswald text-5xl md:text-6xl font-bold leading-none mb-3 animate-fade-in-up stagger-2 opacity-0">
              <span className="gradient-text">Фронтиры</span>
              <br />
              <span className="text-white">развития</span>
            </h1>
            <p className="font-oswald text-xl text-purple-300 mb-4 animate-fade-in-up stagger-2 opacity-0">
              Лаборатория педагогического дизайна
            </p>
            <p className="leading-relaxed mb-8 animate-fade-in-up stagger-3 opacity-0" style={{ color: "#d1d5db" }}>
              Мы трансформируем методическую службу дополнительного образования через педагогический дизайн —
              системный, творческий и человекоцентричный подход к созданию образовательных программ.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-8 animate-fade-in-up stagger-3 opacity-0">
              {[
                { n: "2023", l: "год основания" },
                { n: "40+", l: "педагогов" },
                { n: "6", l: "проектов" },
              ].map((s, i) => (
                <div key={i} className="text-center p-3 rounded-xl" style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.15)" }}>
                  <div className="font-oswald font-bold text-2xl gradient-text">{s.n}</div>
                  <div className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>{s.l}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 animate-fade-in-up stagger-4 opacity-0">
              <button onClick={() => scrollTo("lab")} className="btn-glow text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2">
                <Icon name="FlaskConical" size={18} />
                Лаборатория
              </button>
              <button onClick={() => scrollTo("contacts")}
                className="text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-white/10 transition-all"
                style={{ border: "1px solid rgba(167,139,250,0.3)" }}>
                <Icon name="MessageSquare" size={18} />
                Написать нам
              </button>
            </div>
          </div>

          <div className="hidden lg:block relative animate-fade-in-up stagger-5 opacity-0">
            <div className="rounded-2xl overflow-hidden animate-float"
              style={{ boxShadow: "0 0 60px rgba(124,58,237,0.3)", border: "1px solid rgba(124,58,237,0.2)" }}>
              <img src={IMG_HERO} alt="Площадка" className="w-full object-cover h-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="font-oswald text-white font-bold text-lg">Красногвардейский район</div>
                <div className="text-sm" style={{ color: "#d1d5db" }}>Санкт-Петербург · 2023–2025</div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 rounded-xl p-3 animate-float"
              style={{ background: "linear-gradient(135deg,#7c3aed,#2563eb)", animationDelay: "1s", boxShadow: "0 8px 32px rgba(124,58,237,0.5)" }}>
              <div className="text-white text-center">
                <div className="font-oswald font-bold text-2xl">🏆</div>
                <div className="text-xs opacity-80">Инновации-2024</div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce" style={{ color: "#6b7280" }}>
          <span className="text-xs">Прокрутите вниз</span>
          <Icon name="ChevronDown" size={16} />
        </div>
      </section>

      {/* ══════════ ВИДЕО ══════════ */}
      <section id="video" className="py-20" style={{ background: "hsl(240 12% 8%)" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="tag-badge inline-flex items-center gap-1.5 mb-4">
              <Icon name="Play" size={12} />
              Видеообзор
            </div>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white mb-3">
              Посмотрите на <span className="gradient-text">ЦДЮТТ «Охта»</span>
            </h2>
            <p style={{ color: "#9ca3af" }}>Обзор центра — пространство, где рождаются инновации в образовании</p>
          </div>
          <div className="relative rounded-2xl overflow-hidden animate-float"
            style={{ boxShadow: "0 0 60px rgba(124,58,237,0.25)", border: "1px solid rgba(124,58,237,0.2)", aspectRatio: "16/9" }}>
            <iframe
              src="https://vkvideo.ru/video_ext.php?oid=-186027058&id=456239117&hd=2&autoplay=0"
              width="100%"
              height="100%"
              className="absolute inset-0 w-full h-full"
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══════════ ЛАБОРАТОРИЯ ══════════ */}
      <section id="lab" className="py-24" style={{ background: "hsl(240 12% 8%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <div className="tag-badge inline-flex items-center gap-1.5 mb-5">
                <Icon name="FlaskConical" size={12} />
                Ключевой проект
              </div>
              <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                Лаборатория<br /><span className="gradient-text">педагогического</span><br />дизайна
              </h2>
              <p className="leading-relaxed mb-6" style={{ color: "#d1d5db" }}>
                Лаборатория — это творческое пространство, где педагоги учатся проектировать
                эффективные образовательные программы с использованием современных методологий
                и инструментов педагогического дизайна.
              </p>
              <p className="leading-relaxed" style={{ color: "#9ca3af" }}>
                Здесь теория встречается с практикой: педагоги разрабатывают, тестируют
                и совершенствуют свои программы в поддерживающей профессиональной среде.
              </p>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(124,58,237,0.2)" }}>
                <img src={IMG_LAB} alt="Лаборатория" className="w-full object-cover h-64" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl" />
              </div>
              <div className="absolute -bottom-3 -right-3 rounded-xl p-4" style={{ background: "linear-gradient(135deg,rgba(124,58,237,0.9),rgba(37,99,235,0.9))", backdropFilter: "blur(10px)" }}>
                <div className="text-white font-oswald font-bold text-lg">ADDIE</div>
                <div className="text-white/80 text-xs">Базовая модель</div>
              </div>
            </div>
          </div>

          {/* Lab modules */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
            {LAB_MODULES.map((m, i) => (
              <div key={i} className="card-glow rounded-2xl p-6 group cursor-default">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-4 bg-gradient-to-br ${m.color}`}>
                  {m.emoji}
                </div>
                <h3 className="font-oswald font-semibold text-white text-lg mb-2 group-hover:text-purple-300 transition-colors">{m.title}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#9ca3af" }}>{m.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {m.tools.map((t, j) => (
                    <span key={j} className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.25)", color: "#c4b5fd" }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ADDIE process */}
          <div className="rounded-2xl p-8" style={{ background: "hsl(240 12% 10%)", border: "1px solid rgba(124,58,237,0.15)" }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,rgba(124,58,237,0.3),rgba(37,99,235,0.3))" }}>
                <Icon name="GitBranch" size={18} className="text-purple-400" />
              </div>
              <div>
                <h3 className="font-oswald text-2xl font-bold text-white">Как мы работаем</h3>
                <p className="text-sm" style={{ color: "#9ca3af" }}>Модель ADDIE в практике лаборатории</p>
              </div>
            </div>
            <div className="grid md:grid-cols-5 gap-3">
              {DESIGN_STEPS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className="rounded-xl p-4 text-left transition-all duration-300"
                  style={{
                    background: activeStep === i ? "linear-gradient(135deg,rgba(124,58,237,0.3),rgba(37,99,235,0.2))" : "rgba(124,58,237,0.05)",
                    border: activeStep === i ? "1px solid rgba(124,58,237,0.5)" : "1px solid rgba(124,58,237,0.1)",
                    transform: activeStep === i ? "scale(1.03)" : "scale(1)",
                  }}>
                  <div className="font-oswald font-bold text-xl mb-1" style={{ color: activeStep === i ? "#a78bfa" : "#6b7280" }}>{s.num}</div>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name={s.icon as "Search"} size={16} style={{ color: activeStep === i ? "#a78bfa" : "#6b7280" } as React.CSSProperties} fallback="Star" />
                    <span className="font-semibold text-sm" style={{ color: activeStep === i ? "#f3f4f6" : "#9ca3af" }}>{s.title}</span>
                  </div>
                  {activeStep === i && (
                    <p className="text-xs leading-relaxed animate-fade-in" style={{ color: "#d1d5db" }}>{s.desc}</p>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══════════ PROJECTS ══════════ */}
      <section id="projects" className="py-24 hero-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="tag-badge inline-block mb-4">Наша работа</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white mb-4">
              Инновационные <span className="gradient-text">проекты</span>
            </h2>
            <p style={{ color: "#9ca3af" }} className="max-w-2xl mx-auto">
              Практические разработки, меняющие методическую службу дополнительного образования
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((p, i) => (
              <div key={i} className="card-glow rounded-2xl p-6 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,rgba(124,58,237,0.3),rgba(37,99,235,0.3))" }}>
                    <Icon name={p.icon} size={22} className="text-purple-400" fallback="Star" />
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    p.status === "Активный"     ? "text-green-400 bg-green-400/10 border border-green-400/20"
                    : p.status === "Завершён"   ? "text-blue-400 bg-blue-400/10 border border-blue-400/20"
                                                : "text-yellow-400 bg-yellow-400/10 border border-yellow-400/20"
                  }`}>{p.status}</span>
                </div>
                <div className="tag-badge inline-block mb-2">{p.tag}</div>
                <h3 className="font-oswald font-semibold text-white text-xl mb-2 group-hover:text-purple-300 transition-colors">{p.title}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#9ca3af" }}>{p.desc}</p>
                <div className="flex items-center gap-1 text-xs" style={{ color: "#6b7280" }}>
                  <Icon name="Calendar" size={12} />{p.year}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══════════ TIMELINE ══════════ */}
      <section id="timeline" className="py-24" style={{ background: "hsl(240 12% 8%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="tag-badge inline-block mb-4">История</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white mb-4">
              Этапы <span className="gradient-text">работы</span>
            </h2>
            <p style={{ color: "#9ca3af" }} className="max-w-2xl mx-auto">
              Путь от идеи до признания — ключевые вехи инновационной площадки
            </p>
          </div>

          <div className="relative">
            {/* vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px" style={{ background: "linear-gradient(to bottom, transparent, rgba(124,58,237,0.5) 10%, rgba(124,58,237,0.5) 90%, transparent)" }} />

            <div className="space-y-10">
              {TIMELINE.map((t, i) => (
                <div key={i} className={`relative flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  {/* dot */}
                  <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full -translate-x-1/2 mt-2 z-10"
                    style={{ background: t.color, boxShadow: `0 0 12px ${t.color}` }} />

                  {/* date — desktop only, opposite side */}
                  <div className={`hidden md:flex md:w-1/2 ${i % 2 === 0 ? "justify-end pr-10" : "justify-start pl-10"} items-start pt-1`}>
                    <div className="text-right">
                      <div className="font-oswald font-bold text-2xl text-white">{t.year}</div>
                      <div className="text-sm" style={{ color: "#9ca3af" }}>{t.quarter}</div>
                    </div>
                  </div>

                  {/* card */}
                  <div className={`ml-14 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pl-10" : "md:pr-10"}`}>
                    <div className="card-glow rounded-xl p-5 hover:scale-[1.02] transition-all duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                          style={{ background: `${t.color}20`, border: `1px solid ${t.color}40`, color: t.color }}>
                          {t.badge}
                        </span>
                        <span className="md:hidden text-xs" style={{ color: "#6b7280" }}>{t.year} · {t.quarter}</span>
                      </div>
                      <h3 className="font-oswald font-semibold text-white text-lg mb-1">{t.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: "#9ca3af" }}>{t.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══════════ SEMINAR IMAGE + NEWS ══════════ */}
      <section className="py-24 hero-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* News */}
            <div>
              <div className="tag-badge inline-block mb-4">Актуально</div>
              <h2 className="font-oswald text-4xl font-bold text-white mb-8">
                Новости и <span className="gradient-text">события</span>
              </h2>
              <div className="space-y-4">
                {NEWS.map((n, i) => (
                  <div key={i} className="card-glow rounded-xl p-5 group cursor-pointer">
                    <div className="flex items-center gap-2 mb-2">
                      {n.hot && <span className="text-xs px-2 py-0.5 rounded-full text-red-400 bg-red-400/10 border border-red-400/20 font-medium">🔥 Новое</span>}
                      <span className="tag-badge">{n.tag}</span>
                      <span className="text-xs ml-auto" style={{ color: "#6b7280" }}>{n.date}</span>
                    </div>
                    <h3 className="font-oswald font-semibold text-white text-base mb-1.5 group-hover:text-purple-300 transition-colors leading-tight">{n.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#9ca3af" }}>{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image + quote */}
            <div className="space-y-6">
              <div className="relative rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(124,58,237,0.2)" }}>
                <img src={IMG_SEM} alt="Семинар" className="w-full object-cover h-64" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="font-oswald text-white font-bold">Семинары и мастер-классы</div>
                  <div className="text-sm" style={{ color: "#d1d5db" }}>Красногвардейский район, 2024</div>
                </div>
              </div>

              {/* Key quote */}
              <div className="rounded-2xl p-6" style={{ background: "linear-gradient(135deg,rgba(124,58,237,0.1),rgba(37,99,235,0.1))", border: "1px solid rgba(124,58,237,0.2)" }}>
                <Icon name="Quote" size={28} className="text-purple-400 mb-3" />
                <blockquote className="text-lg leading-relaxed text-white font-medium mb-3">
                  «Педагогический дизайн — это не про красивые слайды. Это про то, чтобы учёба действительно работала.»
                </blockquote>
                <div className="text-sm" style={{ color: "#a78bfa" }}>— Команда Лаборатории пед. дизайна</div>
              </div>

              {/* Stats mini */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { n: "10+", l: "семинаров проведено" },
                  { n: "40+", l: "педагогов в сети" },
                  { n: "🏆 1", l: "место Всероссийский" },
                  { n: "6", l: "инновационных проектов" },
                ].map((s, i) => (
                  <div key={i} className="stat-card">
                    <div className="font-oswald font-bold text-2xl gradient-text mb-1">{s.n}</div>
                    <div className="text-xs" style={{ color: "#9ca3af" }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══════════ TEAM ══════════ */}
      <section id="team" className="py-24" style={{ background: "hsl(240 12% 8%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="tag-badge inline-block mb-4">Люди</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white mb-4">
              Команда <span className="gradient-text">площадки</span>
            </h2>
            <p style={{ color: "#9ca3af" }} className="max-w-xl mx-auto">
              Профессионалы, которые превращают идеи педагогического дизайна в реальные практики
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
            {TEAM.map((m, i) => (
              <button key={i} onClick={() => setExpandedTeam(expandedTeam === i ? null : i)}
                className="card-glow rounded-2xl p-6 text-left group transition-all duration-300"
                style={expandedTeam === i ? { border: "1px solid rgba(167,139,250,0.5)", boxShadow: "0 0 30px rgba(124,58,237,0.2)" } : {}}>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4 bg-gradient-to-br ${m.color}`}>
                  {m.emoji}
                </div>
                <h3 className="font-oswald font-semibold text-white text-base mb-1 group-hover:text-purple-300 transition-colors">{m.name}</h3>
                <div className="tag-badge inline-block mb-3">{m.role}</div>
                {expandedTeam === i ? (
                  <div className="animate-fade-in space-y-2">
                    <p className="text-sm italic mb-3" style={{ color: "#c4b5fd" }}>«{m.quote}»</p>
                    <div className="space-y-1">
                      {m.resp.map((r, j) => (
                        <div key={j} className="flex items-center gap-2 text-xs" style={{ color: "#d1d5db" }}>
                          <div className="w-1 h-1 rounded-full bg-purple-400" />
                          {r}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-xs" style={{ color: "#6b7280" }}>Нажмите для подробностей</p>
                )}
              </button>
            ))}
          </div>

          {/* Partners */}
          <div className="rounded-2xl p-8" style={{ background: "hsl(240 12% 10%)", border: "1px solid rgba(124,58,237,0.15)" }}>
            <h3 className="font-oswald text-2xl font-bold text-white text-center mb-6">Партнёры площадки</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {PARTNERS.map((p, i) => (
                <div key={i} className="rounded-xl p-3 text-center group hover:scale-105 transition-all cursor-default"
                  style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.15)" }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2"
                    style={{ background: "rgba(124,58,237,0.2)" }}>
                    <Icon name={p.icon} size={16} className="text-purple-400" fallback="Building2" />
                  </div>
                  <div className="text-xs font-medium leading-tight group-hover:text-purple-300 transition-colors" style={{ color: "#d1d5db" }}>{p.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══════════ MATERIALS ══════════ */}
      <section id="materials" className="py-24 hero-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="tag-badge inline-block mb-4">Библиотека</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white mb-4">
              Материалы и <span className="gradient-text">документы</span>
            </h2>
            <p style={{ color: "#9ca3af" }} className="max-w-2xl mx-auto mb-8">
              Программы, методические пособия, инструменты и презентации площадки
            </p>
            {/* Filter tabs */}
            <div className="flex flex-wrap justify-center gap-2">
              {MAT_CATS.map(cat => (
                <button key={cat} onClick={() => setMatFilter(cat)}
                  className="px-3 py-1.5 rounded-full text-sm font-medium transition-all"
                  style={matFilter === cat
                    ? { background: "linear-gradient(135deg,#7c3aed,#2563eb)", color: "white" }
                    : { background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)", color: "#9ca3af" }}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4">
            {filteredMats.map((m, i) => (
              <div key={i} className="card-glow rounded-xl p-5 flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "linear-gradient(135deg,rgba(124,58,237,0.2),rgba(37,99,235,0.2))" }}>
                  <Icon name={m.icon} size={22} className="text-purple-400" fallback="FileText" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium group-hover:text-purple-300 transition-colors mb-1" style={{ color: "#f3f4f6" }}>{m.title}</div>
                  <div className="flex items-center gap-2">
                    <span className="tag-badge text-xs">{m.type}</span>
                    <span className="tag-badge text-xs" style={{ background: "rgba(37,99,235,0.1)", borderColor: "rgba(37,99,235,0.3)", color: "#93c5fd" }}>{m.cat}</span>
                    {m.size !== "—" && <span className="text-xs" style={{ color: "#6b7280" }}>{m.size}</span>}
                  </div>
                </div>
                <span className="shrink-0 group-hover:text-purple-400 transition-colors" style={{ color: "#6b7280" }}>
                  <Icon name="Download" size={16} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ══════════ CONTACTS ══════════ */}
      <section id="contacts" className="py-24" style={{ background: "hsl(240 12% 8%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="tag-badge inline-block mb-4">Связь</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white mb-4">
              Контакты и <span className="gradient-text">обратная связь</span>
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              {[
                { icon: "MapPin",    title: "Адрес",              value: "Санкт-Петербург, Красногвардейский район" },
                { icon: "Building2", title: "Учреждение",          value: "ГБУ ДО ЦДЮТТ «Охта»" },
                { icon: "Mail",     title: "Email",               value: "info@center-okhta.spb.ru" },
                { icon: "Globe",    title: "Сайт учреждения",     value: "center-okhta.spb.ru" },
                { icon: "ExternalLink", title: "Лаборатория (Tilda)", value: "ohta.tilda.ws" },
              ].map((c, i) => (
                <div key={i} className="card-glow rounded-xl p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "linear-gradient(135deg,rgba(124,58,237,0.3),rgba(37,99,235,0.3))" }}>
                    <Icon name={c.icon} size={18} className="text-purple-400" fallback="MapPin" />
                  </div>
                  <div>
                    <div className="text-xs mb-0.5" style={{ color: "#9ca3af" }}>{c.title}</div>
                    <div className="font-medium text-white text-sm">{c.value}</div>
                  </div>
                </div>
              ))}

              {/* CTA block */}
              <div className="rounded-2xl p-6" style={{ background: "linear-gradient(135deg,rgba(124,58,237,0.15),rgba(37,99,235,0.15))", border: "1px solid rgba(124,58,237,0.25)" }}>
                <h4 className="font-oswald text-lg font-bold text-white mb-2">Хотите стать участником?</h4>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#d1d5db" }}>
                  Площадка открыта для педагогов дополнительного образования Красногвардейского района.
                  Напишите нам — расскажем о форматах участия.
                </p>
                <button onClick={() => document.getElementById("contact-form")?.focus()}
                  className="btn-glow text-white text-sm font-medium px-5 py-2.5 rounded-xl flex items-center gap-2">
                  <Icon name="UserPlus" size={16} />
                  Хочу участвовать
                </button>
              </div>
            </div>

            <div className="card-glow rounded-2xl p-8">
              {formSent ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: "linear-gradient(135deg,#7c3aed,#2563eb)" }}>
                    <Icon name="Check" size={32} className="text-white" />
                  </div>
                  <h3 className="font-oswald text-2xl font-bold text-white mb-2">Сообщение отправлено!</h3>
                  <p style={{ color: "#9ca3af" }}>Мы свяжемся с вами в течение рабочего дня.</p>
                  <button onClick={() => { setFormSent(false); setContactForm({ name: "", org: "", email: "", message: "" }); }}
                    className="mt-4 text-sm underline" style={{ color: "#a78bfa" }}>
                    Отправить ещё
                  </button>
                </div>
              ) : (
                <form id="contact-form" onSubmit={e => { e.preventDefault(); setFormSent(true); }} className="space-y-4">
                  <h3 className="font-oswald text-2xl font-bold text-white mb-6">Написать нам</h3>
                  {[
                    { label: "Ваше имя", key: "name", placeholder: "Иван Иванов", type: "text" },
                    { label: "Организация", key: "org", placeholder: "Школа № 123", type: "text" },
                    { label: "Email", key: "email", placeholder: "ivan@school.spb.ru", type: "email" },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block text-sm mb-1.5" style={{ color: "#9ca3af" }}>{f.label}</label>
                      <input
                        type={f.type}
                        value={contactForm[f.key as keyof typeof contactForm]}
                        onChange={e => setContactForm(p => ({ ...p, [f.key]: e.target.value }))}
                        placeholder={f.placeholder}
                        required
                        className="w-full rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition-colors"
                        style={{ background: "hsl(240 12% 15%)", border: "1px solid rgba(124,58,237,0.2)" }}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm mb-1.5" style={{ color: "#9ca3af" }}>Сообщение</label>
                    <textarea
                      value={contactForm.message}
                      onChange={e => setContactForm(p => ({ ...p, message: e.target.value }))}
                      placeholder="Расскажите о цели обращения..."
                      rows={4}
                      required
                      className="w-full rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition-colors resize-none"
                      style={{ background: "hsl(240 12% 15%)", border: "1px solid rgba(124,58,237,0.2)" }}
                    />
                  </div>
                  <button type="submit" className="w-full btn-glow text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2">
                    <Icon name="Send" size={18} />
                    Отправить сообщение
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-10" style={{ borderTop: "1px solid rgba(124,58,237,0.15)", background: "hsl(240 12% 5%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#7c3aed,#2563eb)" }}>
                <span className="text-white font-oswald font-bold text-xs">ФР</span>
              </div>
              <div>
                <div className="text-sm font-medium text-white">Фронтиры развития</div>
                <div className="text-xs" style={{ color: "#6b7280" }}>ГБУ ДО ЦДЮТТ «Охта» · 2023–2025</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              {NAV_ITEMS.map(item => (
                <button key={item.id} onClick={() => scrollTo(item.id)}
                  className="text-xs transition-colors hover:text-purple-400" style={{ color: "#6b7280" }}>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <AIAssistant />
    </div>
  );
}