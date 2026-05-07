import { Menu, Shield, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "Demo", href: "#demo" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Stats", href: "#stats" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-ocid="nav.header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "nav-blur" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          data-ocid="nav.logo_link"
          className="flex items-center gap-2 group"
        >
          <div className="relative">
            <Shield className="w-7 h-7 text-[#39FF14] drop-shadow-[0_0_8px_#39FF14]" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight">
            <span className="glow-green">Spam</span>
            <span className="text-foreground">Shield</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                data-ocid={`nav.${link.label.toLowerCase()}_link`}
                className="text-sm text-muted-foreground hover:text-[#39FF14] transition-colors duration-200 font-mono tracking-wide"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#demo"
            data-ocid="nav.cta_button"
            className="px-4 py-2 text-sm font-mono border-neon-cyan rounded-lg text-[#00D9FF] hover:bg-[#00D9FF]/10 transition-all duration-200"
          >
            Try Demo
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
          data-ocid="nav.mobile_menu_toggle"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden nav-blur border-t border-[#00D9FF]/10"
            data-ocid="nav.mobile_menu"
          >
            <ul className="px-6 py-4 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm font-mono text-muted-foreground hover:text-[#39FF14] transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
