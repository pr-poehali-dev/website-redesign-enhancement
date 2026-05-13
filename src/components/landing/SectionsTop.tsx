import Icon from "@/components/ui/icon";
import { NAV_ITEMS, LAB_MODULES, DESIGN_STEPS, TIMELINE, PROJECTS, IMG_HERO, IMG_LAB } from "./data";

interface SectionsTopProps {
  activeSection: string;
  mobileMenu: boolean;
  setMobileMenu: (v: boolean) => void;
  activeStep: number;
  setActiveStep: (i: number) => void;
  scrollTo: (id: string) => void;
}

export default function SectionsTop({
  activeSection,
  mobileMenu,
  setMobileMenu,
  activeStep,
  setActiveStep,
  scrollTo,
}: SectionsTopProps) {
  return (
    <>
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
              <button onClick={() => setMobileMenu(!mobileMenu)} className="xl:hidden p-2" style={{ color: "#9ca3af" }}>
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
                { n: "40+",  l: "педагогов" },
                { n: "6",    l: "проектов" },
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
                    p.status === "Активный"    ? "text-green-400 bg-green-400/10 border border-green-400/20"
                    : p.status === "Завершён"  ? "text-blue-400 bg-blue-400/10 border border-blue-400/20"
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
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px" style={{ background: "linear-gradient(to bottom, transparent, rgba(124,58,237,0.5) 10%, rgba(124,58,237,0.5) 90%, transparent)" }} />

            <div className="space-y-10">
              {TIMELINE.map((t, i) => (
                <div key={i} className={`relative flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full -translate-x-1/2 mt-2 z-10"
                    style={{ background: t.color, boxShadow: `0 0 12px ${t.color}` }} />

                  <div className={`hidden md:flex md:w-1/2 ${i % 2 === 0 ? "justify-end pr-10" : "justify-start pl-10"} items-start pt-1`}>
                    <div className="text-right">
                      <div className="font-oswald font-bold text-2xl text-white">{t.year}</div>
                      <div className="text-sm" style={{ color: "#9ca3af" }}>{t.quarter}</div>
                    </div>
                  </div>

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
    </>
  );
}
