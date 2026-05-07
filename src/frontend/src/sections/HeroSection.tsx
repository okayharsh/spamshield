import ParticleCanvas from "@/components/ParticleCanvas";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // Parallax: content moves up slightly on scroll
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      data-ocid="hero.section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Deep background */}
      <div className="absolute inset-0 bg-[#0a0a12]" />

      {/* Cyber grid overlay */}
      <div className="absolute inset-0 cyber-grid opacity-60" />

      {/* Particle canvas */}
      <ParticleCanvas />

      {/* Radial gradient vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, #0a0a12 100%)",
        }}
      />

      {/* Glow blobs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(57,255,20,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,217,255,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Parallax content wrapper */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 text-center max-w-4xl mx-auto px-6 pt-20"
      >
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-[#39FF14]/30 bg-[#39FF14]/5 font-mono text-xs tracking-widest uppercase"
          style={{ color: "#39FF14" }}
        >
          <span className="threat-dot" />
          System Active — Threat Detection Online
        </motion.div>

        {/* Brand name */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="font-mono font-bold tracking-[0.3em] uppercase text-sm mb-3"
          style={{ color: "#00D9FF" }}
        >
          ◈ SpamShield
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight mb-5"
        >
          <span className="gradient-text-green">AI-Powered</span>
          <br />
          <span className="text-foreground">SMS Threat</span>
          <br />
          <span className="text-foreground">Detection</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Stop phishing and unwanted messages before they reach your phone.
          Heuristic-powered analysis — decentralized, private, and instant.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            type="button"
            data-ocid="hero.cta_primary_button"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("demo")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 font-mono font-bold text-[#0a0a12] rounded-lg transition-all duration-300 hover:scale-105 hover:brightness-110 active:scale-95"
            style={{
              background: "#39FF14",
              boxShadow:
                "0 0 20px rgba(57,255,20,0.5), 0 0 40px rgba(57,255,20,0.2), inset 0 1px 0 rgba(255,255,255,0.2)",
            }}
          >
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
            Try the Demo
          </button>

          <a
            href="#how-it-works"
            data-ocid="hero.cta_secondary_button"
            className="inline-flex items-center justify-center px-8 py-4 font-mono font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:bg-[#00D9FF]/10 active:scale-95"
            style={{
              border: "1px solid #00D9FF",
              color: "#00D9FF",
              boxShadow:
                "0 0 12px rgba(0,217,255,0.25), inset 0 0 12px rgba(0,217,255,0.04)",
            }}
          >
            How It Works
          </a>
        </motion.div>

        {/* Metrics row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-6 md:gap-10"
        >
          {[
            { value: "99.8%", label: "Accuracy", color: "#39FF14" },
            { value: "2M+", label: "Messages Analyzed", color: "#00D9FF" },
            { value: "<50ms", label: "Detection Time", color: "#39FF14" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="font-mono font-bold text-xl md:text-2xl"
                style={{
                  color: stat.color,
                  textShadow: `0 0 10px ${stat.color}88`,
                }}
              >
                {stat.value}
              </div>
              <div className="font-mono text-xs text-muted-foreground tracking-wider uppercase mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="mt-14 flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="font-mono text-xs tracking-widest uppercase opacity-50">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.6,
              ease: "easeInOut",
            }}
            className="w-px h-8 rounded-full"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,217,255,0.6), transparent)",
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
