import Icon from "@/components/ui/icon";
import { NAV_ITEMS, NEWS, TEAM, MATERIALS, MAT_CATS, PARTNERS, IMG_SEM } from "./data";
import { NormDocs } from "./AIAssistant";

interface SectionsBottomProps {
  matFilter: string;
  setMatFilter: (v: string) => void;
  formSent: boolean;
  setFormSent: (v: boolean) => void;
  contactForm: { name: string; org: string; email: string; message: string };
  setContactForm: (v: { name: string; org: string; email: string; message: string }) => void;
  expandedTeam: number | null;
  setExpandedTeam: (v: number | null) => void;
  scrollTo: (id: string) => void;
}

export default function SectionsBottom({
  matFilter,
  setMatFilter,
  formSent,
  setFormSent,
  contactForm,
  setContactForm,
  expandedTeam,
  setExpandedTeam,
  scrollTo,
}: SectionsBottomProps) {
  const filteredMats = matFilter === "Все" ? MATERIALS : MATERIALS.filter(m => m.cat === matFilter);

  return (
    <>
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

              <div className="rounded-2xl p-6" style={{ background: "linear-gradient(135deg,rgba(124,58,237,0.1),rgba(37,99,235,0.1))", border: "1px solid rgba(124,58,237,0.2)" }}>
                <Icon name="Quote" size={28} className="text-purple-400 mb-3" />
                <blockquote className="text-lg leading-relaxed text-white font-medium mb-3">
                  «Педагогический дизайн — это не про красивые слайды. Это про то, чтобы учёба действительно работала.»
                </blockquote>
                <div className="text-sm" style={{ color: "#a78bfa" }}>— Команда Лаборатории пед. дизайна</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { n: "10+",  l: "семинаров проведено" },
                  { n: "40+",  l: "педагогов в сети" },
                  { n: "🏆 1", l: "место Всероссийский" },
                  { n: "6",    l: "инновационных проектов" },
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

      {/* ══════════ ЦЕЛИ / ЗАДАЧИ / РЕЗУЛЬТАТЫ ══════════ */}
      <section id="goals" className="py-24 hero-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="tag-badge inline-block mb-4">О Лаборатории</div>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-white mb-4">
              Задачи, результаты <span className="gradient-text">и участники</span>
            </h2>
            <p style={{ color: "#9ca3af" }} className="max-w-3xl mx-auto">
              Педагогический дизайн как инструмент сопровождения педагогов и одарённых детей при реализации
              образовательного процесса и участия в конкурсном движении
            </p>
          </div>

          {/* Основная идея */}
          <div className="rounded-2xl p-8 mb-10" style={{ background: "linear-gradient(135deg,rgba(124,58,237,0.12),rgba(37,99,235,0.12))", border: "1px solid rgba(124,58,237,0.25)" }}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg,#7c3aed,#2563eb)" }}>
                <Icon name="Lightbulb" size={22} className="text-white" />
              </div>
              <div>
                <h3 className="font-oswald text-xl font-bold text-white mb-2">Основная идея</h3>
                <p className="leading-relaxed mb-3" style={{ color: "#d1d5db" }}>
                  Лаборатория педагогического дизайна — это практико-ориентированная платформа, предназначенная для внедрения
                  современных методик проектирования обучения на основе педагогического дизайна.
                </p>
                <p className="leading-relaxed" style={{ color: "#9ca3af" }}>
                  Предоставляет педагогам и одарённым детям готовые инструменты и алгоритмы для создания качественного образовательного контента,
                  разработки собственных образовательных решений и эффективной подготовки к конкурсным мероприятиям,
                  переводя теоретические знания в плоскость реального применения.
                </p>
              </div>
            </div>
          </div>

          {/* Направления */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              { icon: "Monitor",  label: "Инструкции по работе с цифровыми инструментами", color: "#7c3aed" },
              { icon: "Users",    label: "Наставничество",                                  color: "#2563eb" },
              { icon: "Zap",      label: "Гибкие навыки",                                   color: "#0891b2" },
              { icon: "BookOpen", label: "Образовательные решения",                         color: "#059669" },
            ].map((d, i) => (
              <div key={i} className="card-glow rounded-xl p-5 text-center">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: `${d.color}25`, border: `1px solid ${d.color}40` }}>
                  <Icon name={d.icon} size={22} style={{ color: d.color } as React.CSSProperties} fallback="Star" />
                </div>
                <p className="text-sm font-medium leading-tight" style={{ color: "#f3f4f6" }}>{d.label}</p>
              </div>
            ))}
          </div>

          {/* Задачи */}
          <div className="grid lg:grid-cols-3 gap-6 mb-10">
            {[
              {
                icon: "Target", title: "Задачи", color: "#7c3aed",
                items: [
                  "Разработка инструментов для разных этапов создания учебного контента",
                  "Создание банка учебно-методических материалов по внедрению педагогического дизайна",
                  "Совершенствование цифровых компетенций педагогических работников",
                  "Создание образовательных продуктов и внедрение их в учебный и воспитательный процесс",
                ],
              },
              {
                icon: "Users", title: "Участники", color: "#2563eb",
                items: [
                  "Педагогические работники образовательных учреждений",
                  "Одарённые дети",
                ],
              },
              {
                icon: "BarChart3", title: "Результаты для ОУ", color: "#059669",
                items: [
                  "Методическое сопровождение непрерывного повышения профмастерства через наставничество",
                  "Дальнейшее развитие инновационного потенциала образовательных учреждений",
                ],
              },
            ].map((block, i) => (
              <div key={i} className="card-glow rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${block.color}25`, border: `1px solid ${block.color}40` }}>
                    <Icon name={block.icon} size={18} style={{ color: block.color } as React.CSSProperties} fallback="Star" />
                  </div>
                  <h3 className="font-oswald font-bold text-white text-lg">{block.title}</h3>
                </div>
                <ul className="space-y-2">
                  {block.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm leading-relaxed" style={{ color: "#d1d5db" }}>
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: block.color }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Результаты для педагога и ребёнка */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {[
              {
                emoji: "👩‍🏫", title: "Для педагога", color: "#7c3aed",
                items: [
                  "Повышение профессионального мастерства в области принципов и технологий педагогического дизайна",
                  "Демонстрация возможностей включения инструментов педагогического дизайна в систему работы с одарёнными детьми",
                ],
              },
              {
                emoji: "🌟", title: "Для одарённого ребёнка", color: "#0891b2",
                items: [
                  "Создание условий для развития и реализации творческого потенциала при подготовке к конкурсам",
                  "Активация учебно-познавательной деятельности",
                  "Развитие гибких навыков и метапредметных компетенций",
                ],
              },
            ].map((block, i) => (
              <div key={i} className="card-glow rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">{block.emoji}</div>
                  <h3 className="font-oswald font-bold text-white text-lg">{block.title}</h3>
                </div>
                <ul className="space-y-2">
                  {block.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm leading-relaxed" style={{ color: "#d1d5db" }}>
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: block.color }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Нормативные документы */}
          <NormDocs />
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
                className="card-glow rounded-2xl p-5 text-center group transition-all duration-300"
                style={expandedTeam === i ? { border: "1px solid rgba(167,139,250,0.5)", boxShadow: "0 0 30px rgba(124,58,237,0.2)" } : {}}>
                {m.photo && m.photoCrop ? (
                  <div className="w-20 h-20 rounded-full mx-auto mb-3 overflow-hidden shrink-0"
                    style={{ border: "2px solid rgba(167,139,250,0.4)" }}>
                    <div style={{
                      width: "100%",
                      height: "100%",
                      backgroundImage: `url(${m.photo})`,
                      backgroundSize: m.photoCrop.size,
                      backgroundPosition: `${m.photoCrop.x} ${m.photoCrop.y}`,
                      backgroundRepeat: "no-repeat",
                    }} />
                  </div>
                ) : (
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-3 bg-gradient-to-br ${m.color}`}>
                    <Icon name="User" size={30} className="text-white" />
                  </div>
                )}
                <h3 className="font-oswald font-semibold text-white text-sm mb-1 group-hover:text-purple-300 transition-colors leading-tight">{m.name}</h3>
                <div className="text-xs mb-2 leading-tight" style={{ color: "#9ca3af" }}>{m.role}</div>
                <div className="tag-badge inline-block mb-2 text-xs" style={{ background: "rgba(37,99,235,0.1)", borderColor: "rgba(37,99,235,0.3)", color: "#93c5fd" }}>{m.org}</div>
                {expandedTeam === i ? (
                  <div className="animate-fade-in space-y-1 mt-2 text-left">
                    {m.resp.map((r, j) => (
                      <div key={j} className="flex items-center gap-2 text-xs" style={{ color: "#d1d5db" }}>
                        <div className="w-1 h-1 rounded-full bg-purple-400 shrink-0" />
                        {r}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs mt-1" style={{ color: "#6b7280" }}>Нажмите для подробностей</p>
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
                { icon: "Building2",    title: "Учреждение",      value: "ГБУ ДО ЦДЮТТ «Охта»" },
                { icon: "MapPin",       title: "Адрес 1",         value: "ул. Панфилова, д. 23, лит. А, Санкт-Петербург" },
                { icon: "MapPin",       title: "Адрес 2",         value: "пр. Энергетиков, д. 26, корп. 2, Санкт-Петербург" },
                { icon: "Phone",        title: "Телефон",         value: "8 (812) 224-36-74" },
                { icon: "Mail",         title: "Email",           value: "okhta@obr.gov.spb.ru" },
                { icon: "Globe",        title: "Сайт учреждения", value: "center-okhta.spb.ru" },
                { icon: "ExternalLink", title: "Лаборатория",     value: "ohta.tilda.ws/labpeddisign" },
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
                    { label: "Ваше имя",    key: "name",  placeholder: "Иван Иванов",         type: "text" },
                    { label: "Организация", key: "org",   placeholder: "Школа № 123",          type: "text" },
                    { label: "Email",       key: "email", placeholder: "ivan@school.spb.ru",   type: "email" },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block text-sm mb-1.5" style={{ color: "#9ca3af" }}>{f.label}</label>
                      <input
                        type={f.type}
                        value={contactForm[f.key as keyof typeof contactForm]}
                        onChange={e => setContactForm({ ...contactForm, [f.key]: e.target.value })}
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
                      onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
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
    </>
  );
}
