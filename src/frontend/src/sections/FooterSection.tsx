import { Shield } from "lucide-react";
import { motion } from "motion/react";

const FOOTER_LINKS = [
  { label: "Features", href: "#how-it-works" },
  { label: "Demo", href: "#demo" },
  { label: "Stats", href: "#stats" },
];

// IC logo as inline SVG — official Internet Computer mark
function IcLogo({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Internet Computer"
    >
      <title>Internet Computer</title>
      <circle cx="25" cy="25" r="25" fill="#3B00B9" />
      <ellipse
        cx="25"
        cy="25"
        rx="14"
        ry="6"
        stroke="white"
        strokeWidth="3"
        fill="none"
      />
      <ellipse
        cx="25"
        cy="25"
        rx="14"
        ry="6"
        stroke="white"
        strokeWidth="3"
        fill="none"
        transform="rotate(60 25 25)"
      />
      <ellipse
        cx="25"
        cy="25"
        rx="14"
        ry="6"
        stroke="white"
        strokeWidth="3"
        fill="none"
        transform="rotate(120 25 25)"
      />
      <circle cx="25" cy="25" r="3" fill="white" />
    </svg>
  );
}

export default function FooterSection() {
  const year = new Date().getFullYear();
  const caff = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer
      data-ocid="footer.section"
      className="relative border-t border-border overflow-hidden"
      style={{ background: "rgba(10,10,18,0.98)" }}
    >
      {/* Top neon line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #39FF14 30%, #00D9FF 70%, transparent 100%)",
          opacity: 0.5,
        }}
      />

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo + IC badge */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#39FF14] drop-shadow-[0_0_6px_#39FF14]" />
              <span className="font-display font-bold text-lg">
                <span className="glow-green">Spam</span>
                <span className="text-foreground">Shield</span>
              </span>
            </div>

            {/* Built on IC badge */}
            <motion.a
              href="https://internetcomputer.org"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              data-ocid="footer.ic_badge"
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-mono"
              style={{
                background: "rgba(59,0,185,0.2)",
                border: "1px solid rgba(59,0,185,0.6)",
                boxShadow: "0 0 8px rgba(59,0,185,0.3)",
                color: "#a78bfa",
              }}
            >
              <IcLogo size={14} />
              Built on Internet Computer
            </motion.a>
          </div>

          {/* Links */}
          <nav
            className="flex items-center gap-6 flex-wrap justify-center"
            aria-label="Footer navigation"
          >
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-mono text-muted-foreground hover:text-[#39FF14] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <div className="flex flex-col items-center md:items-end gap-1.5">
            <p className="text-xs text-muted-foreground font-mono">
              © {year} SpamShield
            </p>
            <p className="text-xs font-mono">
              <a
                href={caff}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-[#00D9FF] transition-colors duration-200"
              >
                Built with love using caffeine.ai
              </a>
            </p>
          </div>
        </div>

        {/* Bottom divider */}
        <div
          className="mt-8 h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(57,255,20,0.15) 30%, rgba(0,217,255,0.15) 70%, transparent)",
          }}
        />
        <p className="mt-4 text-center text-xs font-mono text-muted-foreground opacity-50">
          Protecting inboxes with keyword-heuristic threat analysis
        </p>
      </div>
    </footer>
  );
}
