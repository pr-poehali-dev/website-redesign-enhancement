import { useState, useEffect } from "react";
import { NAV_ITEMS } from "@/components/landing/data";
import SectionsTop from "@/components/landing/SectionsTop";
import SectionsBottom from "@/components/landing/SectionsBottom";
import AIAssistant from "@/components/landing/AIAssistant";

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
    const t = setInterval(() => setActiveStep(s => (s + 1) % 5), 3000);
    return () => clearInterval(t);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenu(false);
  };

  return (
    <div className="min-h-screen font-golos" style={{ background: "hsl(240 15% 6%)" }}>
      <SectionsTop
        activeSection={activeSection}
        mobileMenu={mobileMenu}
        setMobileMenu={setMobileMenu}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        scrollTo={scrollTo}
      />
      <SectionsBottom
        matFilter={matFilter}
        setMatFilter={setMatFilter}
        formSent={formSent}
        setFormSent={setFormSent}
        contactForm={contactForm}
        setContactForm={setContactForm}
        expandedTeam={expandedTeam}
        setExpandedTeam={setExpandedTeam}
        scrollTo={scrollTo}
      />
      <AIAssistant />
    </div>
  );
}
