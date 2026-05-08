import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/1c015a27-63aa-4d64-8203-0abbad0db560/files/3d25f0c7-8819-4a1d-a14f-431c446785f4.jpg";

const NAV_ITEMS = [
  { id: "about", label: "О площадке" },
  { id: "projects", label: "Проекты" },
  { id: "news", label: "Новости" },
  { id: "team", label: "Команда" },
  { id: "materials", label: "Материалы" },
  { id: "contacts", label: "Контакты" },
];

const PROJECTS = [
  {
    icon: "Lightbulb",
    tag: "Методология",
    title: "Педагогический дизайн",
    desc: "Разработка и внедрение принципов педагогического дизайна в методическую службу учреждения дополнительного образования.",
    year: "2023–2025",
    status: "Активный",
  },
  {
    icon: "GraduationCap",
    tag: "Образование",
    title: "Развитие методической службы",
    desc: "Трансформация методической работы через современные подходы: от традиционных форматов к проектной деятельности.",
    year: "2023–2025",
    status: "Активный",
  },
  {
    icon: "Cpu",
    tag: "Технологии",
    title: "Цифровые инструменты педагога",
    desc: "Освоение и интеграция цифровых сервисов и инструментов в образовательный процесс ЦДЮТТ «Охта».",
    year: "2024",
    status: "Завершён",
  },
  {
    icon: "Network",
    tag: "Партнёрство",
    title: "Сетевое взаимодействие",
    desc: "Создание профессионального сообщества педагогов дополнительного образования Красногвардейского района.",
    year: "2024–2025",
    status: "Активный",
  },
  {
    icon: "BookOpen",
    tag: "Исследования",
    title: "Лучшие практики",
    desc: "Сбор, описание и распространение лучших педагогических практик методической службы в системе ДО.",
    year: "2025",
    status: "Планируется",
  },
  {
    icon: "Star",
    tag: "Конкурсы",
    title: "Инновационные разработки",
    desc: "Участие и победы во всероссийских конкурсах педагогического мастерства и инновационных разработок.",
    year: "2023–2025",
    status: "Активный",
  },
];

const NEWS = [
  {
    date: "15 апреля 2025",
    tag: "Событие",
    title: "Итоговый семинар «Фронтиры-2025»",
    desc: "Проведён итоговый районный семинар по обмену опытом в рамках инновационной площадки. Участие приняли более 40 педагогов.",
  },
  {
    date: "28 февраля 2025",
    tag: "Публикация",
    title: "Методические рекомендации обновлены",
    desc: "Опубликован обновлённый сборник методических рекомендаций по педагогическому дизайну для педагогов ДО.",
  },
  {
    date: "10 декабря 2024",
    tag: "Конкурс",
    title: "Победа во всероссийском конкурсе",
    desc: "Команда площадки заняла призовое место во Всероссийском конкурсе «Инновации в образовании — 2024».",
  },
  {
    date: "5 ноября 2024",
    tag: "Мастер-класс",
    title: "Мастер-класс по педагогическому дизайну",
    desc: "Прошёл открытый мастер-класс для педагогов района. Практические инструменты создания современных образовательных программ.",
  },
];

const TEAM = [
  {
    name: "Руководитель площадки",
    role: "Директор ЦДЮТТ «Охта»",
    desc: "Стратегическое руководство инновационной деятельностью учреждения",
    emoji: "👩‍💼",
    color: "from-purple-600 to-blue-600",
  },
  {
    name: "Методист-координатор",
    role: "Главный методист",
    desc: "Координация методической работы и педагогического проектирования",
    emoji: "👩‍🏫",
    color: "from-blue-600 to-cyan-600",
  },
  {
    name: "Педагог-инноватор",
    role: "Старший педагог",
    desc: "Разработка и апробация инновационных образовательных программ",
    emoji: "🧑‍💻",
    color: "from-cyan-600 to-teal-600",
  },
  {
    name: "Аналитик",
    role: "Исследователь",
    desc: "Мониторинг эффективности и анализ результатов инновационной деятельности",
    emoji: "📊",
    color: "from-violet-600 to-purple-600",
  },
];

const PARTNERS = [
  "Комитет по образованию СПб",
  "АППО",
  "ГБУ ДПО «ИМЦ»",
  "Красногвардейский район",
  "РГПУ им. Герцена",
  "Сетевые ОУ района",
];

const MATERIALS = [
  { icon: "FileText", title: "Программа инновационной площадки", type: "PDF", size: "2.4 МБ" },
  { icon: "BookOpen", title: "Методические рекомендации по пед. дизайну", type: "PDF", size: "1.8 МБ" },
  { icon: "Presentation", title: "Презентации семинаров 2024", type: "ZIP", size: "15 МБ" },
  { icon: "Video", title: "Видеозапись итогового семинара", type: "MP4", size: "—" },
  { icon: "ClipboardList", title: "Отчёт за 2023–2024 учебный год", type: "PDF", size: "3.1 МБ" },
  { icon: "Link", title: "Полезные ссылки и ресурсы", type: "HTML", size: "—" },
];

const QUICK_QUESTIONS = [
  "Что такое педагогический дизайн?",
  "Как вступить в площадку?",
  "Когда ближайшее мероприятие?",
  "Какие документы нужны?",
];

type Message = { role: "user" | "ai"; text: string };

function getAIAnswer(msg: string): string {
  const m = msg.toLowerCase();
  if (m.includes("педагогический дизайн") || m.includes("пед дизайн")) {
    return "Педагогический дизайн — это системный подход к разработке образовательных программ и материалов. Он включает анализ потребностей, проектирование учебного процесса, создание контента и оценку результатов. На нашей площадке мы применяем принципы пед. дизайна для совершенствования методической работы.";
  }
  if (m.includes("вступить") || m.includes("участвовать") || m.includes("присоединиться")) {
    return "Для участия в инновационной площадке обратитесь к методистам ЦДЮТТ «Охта» или заполните форму в разделе «Контакты». Площадка открыта для педагогов дополнительного образования Красногвардейского района.";
  }
  if (m.includes("мероприятие") || m.includes("семинар") || m.includes("конкурс")) {
    return "Ближайшие мероприятия анонсируются в разделе «Новости». В 2025 году запланированы: итоговый семинар, мастер-класс по цифровым инструментам и районская конференция. Следите за обновлениями!";
  }
  if (m.includes("документ") || m.includes("материал") || m.includes("скачать")) {
    return "Все документы доступны в разделе «Материалы»: программа площадки, методические рекомендации, презентации и отчёты. Нажмите на нужный файл для загрузки.";
  }
  if (m.includes("контакт") || m.includes("адрес") || m.includes("телефон")) {
    return "Адрес: Санкт-Петербург, Красногвардейский район. ГБУ ДО ЦДЮТТ «Охта». Контактная форма доступна в разделе «Контакты» внизу страницы. Мы ответим в течение рабочего дня.";
  }
  if (m.includes("цель") || m.includes("задач") || m.includes("зачем")) {
    return "Главная цель площадки — создать передовую методическую службу в системе дополнительного образования через внедрение педагогического дизайна. Мы развиваем профессиональные компетенции педагогов, создаём современные образовательные программы и строим сетевое взаимодействие.";
  }
  if (m.includes("партнёр") || m.includes("партнер") || m.includes("сотрудничество")) {
    return "Наши партнёры: Комитет по образованию СПб, АППО, ГБУ ДПО ИМЦ, РГПУ им. Герцена и образовательные учреждения Красногвардейского района. Сетевое взаимодействие — ключевой принцип нашей работы.";
  }
  if (m.includes("результат") || m.includes("достижени") || m.includes("победа")) {
    return "За 2023–2025 годы: проведено более 10 семинаров и мастер-классов, разработаны методические рекомендации, команда стала призёром Всероссийского конкурса «Инновации в образовании — 2024». В сети площадки более 40 педагогов.";
  }
  if (m.includes("привет") || m.includes("здравствуй") || m.includes("добр")) {
    return "Здравствуйте! Рад вас приветствовать. Я помогу найти информацию о площадке «Фронтиры развития». Что вас интересует?";
  }
  if (m.includes("спасибо") || m.includes("благодар")) {
    return "Пожалуйста! Если возникнут ещё вопросы — всегда готов помочь. Успехов в образовательной деятельности! 🎓";
  }
  return "Спасибо за вопрос! По данной теме рекомендую обратиться к методистам ЦДЮТТ «Охта» через форму в разделе «Контакты» — они дадут исчерпывающий ответ. Также можете изучить материалы в соответствующем разделе сайта.";
}

function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: "Привет! Я ИИ-ассистент площадки «Фронтиры развития». Задайте любой вопрос о нашей деятельности — с удовольствием помогу! 🚀" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const sendMessage = async (text?: string) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: msg }]);
    setLoading(true);
    await new Promise(r => setTimeout(r, 700 + Math.random() * 600));
    const response = getAIAnswer(msg);
    setMessages(prev => [...prev, { role: "ai", text: response }]);
    setLoading(false);
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 md:w-96 animate-scale-in shadow-2xl">
          <div className="rounded-2xl overflow-hidden" style={{ background: "hsl(240 12% 8%)", border: "1px solid rgba(124,58,237,0.35)" }}>
            <div className="p-4 flex items-center gap-3" style={{ background: "linear-gradient(135deg,#7c3aed,#2563eb)" }}>
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl">🤖</div>
              <div>
                <div className="font-oswald font-semibold text-white">ИИ-ассистент</div>
                <div className="text-xs text-white/70">Фронтиры развития</div>
              </div>
              <button onClick={() => setOpen(false)} className="ml-auto text-white/70 hover:text-white transition-colors">
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
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {messages.length <= 2 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1">
                {QUICK_QUESTIONS.map((q, i) => (
                  <button key={i} onClick={() => sendMessage(q)}
                    className="text-xs px-2 py-1 rounded-full transition-all hover:scale-105"
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
                  onKeyDown={e => e.key === "Enter" && sendMessage()}
                  placeholder="Задайте вопрос..."
                  className="flex-1 rounded-xl px-3 py-2 text-sm outline-none text-white placeholder-gray-500"
                  style={{ background: "hsl(240 12% 15%)", border: "1px solid rgba(124,58,237,0.2)" }}
                />
                <button onClick={() => sendMessage()}
                  className="w-9 h-9 rounded-xl flex items-center justify-center btn-glow shrink-0">
                  <Icon name="Send" size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(v => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl flex items-center justify-center btn-glow animate-pulse-glow shadow-2xl"
        aria-label="ИИ-ассистент"
      >
        {open ? <Icon name="X" size={22} /> : <span className="text-2xl">🤖</span>}
      </button>
    </>
  );
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 120;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_ITEMS[i].id);
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="min-h-screen font-golos" style={{ background: "hsl(240 15% 6%)" }}>

      {/* NAV */}
      <nav className="nav-glass fixed top-0 left-0 right-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo("about")}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#7c3aed,#2563eb)" }}>
                <span className="text-white font-oswald font-bold text-sm">ФР</span>
              </div>
              <span className="font-oswald font-semibold text-white hidden sm:block text-sm">Фронтиры развития</span>
            </div>

            <div className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map(item => (
                <button key={item.id} onClick={() => scrollTo(item.id)}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
                  style={activeSection === item.id
                    ? { background: "rgba(124,58,237,0.2)", color: "#a78bfa" }
                    : { color: "#9ca3af" }}>
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => scrollTo("contacts")}
                className="hidden sm:flex btn-glow text-white text-sm font-medium px-4 py-2 rounded-xl">
                Связаться
              </button>
              <button onClick={() => setMobileMenuOpen(v => !v)} className="lg:hidden p-2" style={{ color: "#9ca3af" }}>
                <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
              </button>
            </div>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 pb-4 space-y-1 animate-fade-in">
            {NAV_ITEMS.map(item => (
              <button key={item.id} onClick={() => scrollTo(item.id)}
                className="block w-full text-left px-3 py-2 rounded-lg text-sm transition-all hover:bg-white/5"
                style={{ color: "#d1d5db" }}>
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="about" className="hero-bg grid-pattern min-h-screen flex items-center pt-16 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl animate-float" style={{ background: "radial-gradient(circle,#7c3aed,transparent)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl animate-float" style={{ background: "radial-gradient(circle,#2563eb,transparent)", animationDelay: "2s" }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full opacity-8 blur-3xl animate-float" style={{ background: "radial-gradient(circle,#06b6d4,transparent)", animationDelay: "4s" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="tag-badge inline-flex items-center gap-1.5 mb-6 animate-fade-in-up stagger-1 opacity-0">
              <Icon name="Zap" size={12} />
              Районная инновационная площадка
            </div>
            <h1 className="font-oswald text-5xl md:text-6xl font-bold leading-tight mb-6 animate-fade-in-up stagger-2 opacity-0">
              <span className="gradient-text">Фронтиры</span>
              <br />
              <span className="text-white">развития</span>
            </h1>
            <p className="text-lg leading-relaxed mb-3 animate-fade-in-up stagger-3 opacity-0" style={{ color: "#d1d5db" }}>
              Методической службы учреждения дополнительного образования на основе педагогического дизайна
            </p>
            <p className="text-sm mb-8 animate-fade-in-up stagger-3 opacity-0" style={{ color: "#6b7280" }}>
              ГБУ ДО ЦДЮТТ «Охта» · Красногвардейский район · 2023–2025
            </p>
            <div className="flex flex-wrap gap-3 animate-fade-in-up stagger-4 opacity-0">
              <button onClick={() => scrollTo("projects")} className="btn-glow text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2">
                <Icon name="Rocket" size={18} />
                Наши проекты
              </button>
              <button onClick={() => scrollTo("contacts")}
                className="text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2 transition-all hover:bg-white/10"
                style={{ border: "1px solid rgba(167,139,250,0.3)" }}>
                <Icon name="MessageSquare" size={18} />
                Написать нам
              </button>
            </div>
          </div>

          <div className="relative hidden lg:block animate-fade-in-up stagger-5 opacity-0">
            <div className="rounded-2xl overflow-hidden animate-float" style={{ boxShadow: "0 0 60px rgba(124,58,237,0.3)", border: "1px solid rgba(124,58,237,0.2)" }}>
              <img src={HERO_IMAGE} alt="Инновационная площадка" className="w-full object-cover h-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
            <div className="absolute -top-4 -right-4 rounded-xl p-3 animate-float"
              style={{ background: "linear-gradient(135deg,#7c3aed,#2563eb)", animationDelay: "1s", boxShadow: "0 8px 32px rgba(124,58,237,0.5)" }}>
              <div className="text-white text-center">
                <div className="font-oswald font-bold text-2xl">2+</div>
                <div className="text-xs opacity-80">года работы</div>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 rounded-xl p-3 animate-float"
              style={{ background: "linear-gradient(135deg,#0891b2,#2563eb)", animationDelay: "3s", boxShadow: "0 8px 32px rgba(6,182,212,0.4)" }}>
              <div className="text-white text-center">
                <div className="font-oswald font-bold text-2xl">40+</div>
                <div className="text-xs opacity-80">педагогов</div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce" style={{ color: "#6b7280" }}>
          <span className="text-xs">Прокрутите вниз</span>
          <Icon name="ChevronDown" size={16} />
        </div>
      </section>

      {/* STATS */}
      <section className="py-16" style={{ background: "hsl(240 12% 8%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { num: "6", label: "Инновационных проектов", icon: "Lightbulb" },
              { num: "40+", label: "Педагогов в сети", icon: "Users" },
              { num: "10+", label: "Мероприятий", icon: "Calendar" },
              { num: "1 место", label: "Конкурс Инновации-2024", icon: "Trophy" },
            ].map((s, i) => (
              <div key={i} className="stat-card">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3" style={{ background: "linear-gradient(135deg,rgba(124,58,237,0.3),rgba(37,99,235,0.3))" }}>
                  <Icon name={s.icon} size={20} className="text-purple-400" fallback="Star" />
                </div>
                <div className="font-oswald font-bold text-3xl gradient-text mb-1">{s.num}</div>
                <div className="text-sm" style={{ color: "#9ca3af" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* PROJECTS */}
      <section id="projects" className="py-20 hero-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="tag-badge inline-block mb-4">Наша работа</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white mb-4">
              Инновационные <span className="gradient-text">проекты</span>
            </h2>
            <p style={{ color: "#9ca3af" }} className="max-w-2xl mx-auto">
              Практические разработки, которые меняют методическую службу дополнительного образования
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((p, i) => (
              <div key={i} className="card-glow rounded-2xl p-6 cursor-pointer group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,rgba(124,58,237,0.3),rgba(37,99,235,0.3))" }}>
                    <Icon name={p.icon} size={22} className="text-purple-400" fallback="Star" />
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    p.status === "Активный" ? "text-green-400 bg-green-400/10 border border-green-400/20"
                    : p.status === "Завершён" ? "text-blue-400 bg-blue-400/10 border border-blue-400/20"
                    : "text-yellow-400 bg-yellow-400/10 border border-yellow-400/20"
                  }`}>{p.status}</span>
                </div>
                <div className="tag-badge inline-block mb-2">{p.tag}</div>
                <h3 className="font-oswald font-semibold text-white text-xl mb-2 group-hover:text-purple-300 transition-colors">{p.title}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#9ca3af" }}>{p.desc}</p>
                <div className="flex items-center gap-1 text-xs" style={{ color: "#6b7280" }}>
                  <Icon name="Calendar" size={12} />
                  {p.year}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* NEWS */}
      <section id="news" className="py-20" style={{ background: "hsl(240 12% 8%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="tag-badge inline-block mb-4">Актуально</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white mb-4">
              Блог и <span className="gradient-text">новости</span>
            </h2>
            <p style={{ color: "#9ca3af" }} className="max-w-2xl mx-auto">Последние события, достижения и анонсы инновационной площадки</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {NEWS.map((n, i) => (
              <div key={i} className="card-glow rounded-2xl p-6 cursor-pointer group">
                <div className="flex items-center gap-3 mb-4">
                  <span className="tag-badge">{n.tag}</span>
                  <span className="text-xs flex items-center gap-1" style={{ color: "#6b7280" }}>
                    <Icon name="Clock" size={12} />
                    {n.date}
                  </span>
                </div>
                <h3 className="font-oswald font-semibold text-white text-xl mb-2 group-hover:text-purple-300 transition-colors leading-tight">{n.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#9ca3af" }}>{n.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#a78bfa" }}>
                  Читать подробнее <Icon name="ArrowRight" size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* TEAM */}
      <section id="team" className="py-20 hero-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="tag-badge inline-block mb-4">Люди</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white mb-4">
              Команда и <span className="gradient-text">партнёры</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
            {TEAM.map((m, i) => (
              <div key={i} className="card-glow rounded-2xl p-6 text-center group">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 bg-gradient-to-br ${m.color}`}>
                  {m.emoji}
                </div>
                <h3 className="font-oswald font-semibold text-white text-lg mb-1 group-hover:text-purple-300 transition-colors">{m.name}</h3>
                <div className="tag-badge inline-block mb-3">{m.role}</div>
                <p className="text-sm" style={{ color: "#9ca3af" }}>{m.desc}</p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl p-8" style={{ background: "hsl(240 12% 10%)", border: "1px solid rgba(124,58,237,0.15)" }}>
            <h3 className="font-oswald text-2xl font-bold text-white text-center mb-6">Партнёры площадки</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {PARTNERS.map((p, i) => (
                <div key={i} className="px-4 py-2 rounded-xl text-sm font-medium transition-all hover:border-purple-400/40"
                  style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)", color: "#d1d5db" }}>
                  {p}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* MATERIALS */}
      <section id="materials" className="py-20" style={{ background: "hsl(240 12% 8%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="tag-badge inline-block mb-4">Библиотека</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white mb-4">
              Материалы и <span className="gradient-text">документы</span>
            </h2>
            <p style={{ color: "#9ca3af" }} className="max-w-2xl mx-auto">Документация, методические пособия и полезные ресурсы площадки</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MATERIALS.map((m, i) => (
              <div key={i} className="card-glow rounded-xl p-5 flex items-center gap-4 cursor-pointer group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg,rgba(124,58,237,0.2),rgba(37,99,235,0.2))" }}>
                  <Icon name={m.icon} size={22} className="text-purple-400" fallback="FileText" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium group-hover:text-purple-300 transition-colors leading-tight mb-1" style={{ color: "#f3f4f6" }}>{m.title}</div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="tag-badge">{m.type}</span>
                    {m.size !== "—" && <span style={{ color: "#6b7280" }}>{m.size}</span>}
                  </div>
                </div>
                <span style={{ color: "#6b7280" }} className="shrink-0 group-hover:text-purple-400 transition-colors"><Icon name="Download" size={16} /></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* CONTACTS */}
      <section id="contacts" className="py-20 hero-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="tag-badge inline-block mb-4">Связь</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white mb-4">
              Контакты и <span className="gradient-text">обратная связь</span>
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-5">
              {[
                { icon: "MapPin", title: "Адрес", value: "Санкт-Петербург, Красногвардейский район" },
                { icon: "Building2", title: "Учреждение", value: "ГБУ ДО ЦДЮТТ «Охта»" },
                { icon: "Mail", title: "Электронная почта", value: "info@center-okhta.spb.ru" },
                { icon: "Globe", title: "Сайт учреждения", value: "center-okhta.spb.ru" },
              ].map((c, i) => (
                <div key={i} className="card-glow rounded-xl p-5 flex items-center gap-4">
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg,rgba(124,58,237,0.3),rgba(37,99,235,0.3))" }}>
                    <Icon name={c.icon} size={20} className="text-purple-400" fallback="MapPin" />
                  </div>
                  <div>
                    <div className="text-xs mb-0.5" style={{ color: "#9ca3af" }}>{c.title}</div>
                    <div className="font-medium text-white">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="card-glow rounded-2xl p-8">
              {formSent ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "linear-gradient(135deg,#7c3aed,#2563eb)" }}>
                    <Icon name="Check" size={32} className="text-white" />
                  </div>
                  <h3 className="font-oswald text-2xl font-bold text-white mb-2">Сообщение отправлено!</h3>
                  <p style={{ color: "#9ca3af" }}>Мы свяжемся с вами в течение рабочего дня.</p>
                </div>
              ) : (
                <form onSubmit={handleContact} className="space-y-4">
                  <h3 className="font-oswald text-2xl font-bold text-white mb-6">Написать нам</h3>
                  {[
                    { label: "Ваше имя", key: "name", placeholder: "Иван Иванов", type: "text" },
                    { label: "Email", key: "email", placeholder: "ivan@school.spb.ru", type: "email" },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block text-sm mb-1.5" style={{ color: "#9ca3af" }}>{f.label}</label>
                      <input
                        type={f.type}
                        value={contactForm[f.key as keyof typeof contactForm]}
                        onChange={e => setContactForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                        placeholder={f.placeholder}
                        required
                        className="w-full rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none transition-colors"
                        style={{ background: "hsl(240 12% 15%)", border: "1px solid rgba(124,58,237,0.2)" }}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm mb-1.5" style={{ color: "#9ca3af" }}>Сообщение</label>
                    <textarea
                      value={contactForm.message}
                      onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))}
                      placeholder="Расскажите, чем мы можем помочь..."
                      rows={4}
                      required
                      className="w-full rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none transition-colors resize-none"
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

      {/* FOOTER */}
      <footer className="py-10" style={{ borderTop: "1px solid rgba(124,58,237,0.15)", background: "hsl(240 12% 5%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#7c3aed,#2563eb)" }}>
                <span className="text-white font-oswald font-bold text-xs">ФР</span>
              </div>
              <span className="text-sm" style={{ color: "#9ca3af" }}>ГБУ ДО ЦДЮТТ «Охта» · Фронтиры развития · 2023–2025</span>
            </div>
            <div className="flex flex-wrap gap-4">
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