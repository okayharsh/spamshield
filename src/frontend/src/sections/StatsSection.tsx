import { Skeleton } from "@/components/ui/skeleton";
import { useStats } from "@/hooks/use-spam-detector";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ─── Animated Counter ─────────────────────────────────────────────────────────

function useAnimatedCounter(
  target: number,
  inView: boolean,
  duration = 2000,
  prefersReducedMotion = false,
) {
  const [count, setCount] = useState(prefersReducedMotion ? target : 0);

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion) {
      setCount(target);
      return;
    }
    let startTime: number | null = null;
    const startValue = 0;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.round(startValue + (target - startValue) * eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration, prefersReducedMotion]);

  return count;
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

interface StatCardProps {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  color: "green" | "cyan";
  isLoading?: boolean;
  delay?: number;
  "data-ocid"?: string;
}

function StatCard({
  label,
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  color,
  isLoading = false,
  delay = 0,
  "data-ocid": dataOcid,
}: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReduced = useReducedMotion() ?? false;

  const animated = useAnimatedCounter(value, inView, 2200, prefersReduced);

  const neonColor = color === "green" ? "#39FF14" : "#00D9FF";
  const borderClass =
    color === "green" ? "border-neon-green" : "border-neon-cyan";
  const glowClass = color === "green" ? "glow-green" : "glow-cyan";

  const displayValue =
    decimals > 0
      ? (animated / 10 ** decimals).toFixed(decimals)
      : animated.toLocaleString();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      data-ocid={dataOcid}
      className={`relative flex flex-col items-center justify-center text-center
        rounded-2xl bg-card p-8 overflow-hidden ${borderClass}`}
      style={{
        background: `linear-gradient(135deg, rgba(10,10,18,0.95) 0%, rgba(${color === "green" ? "57,255,20" : "0,217,255"},0.04) 100%)`,
      }}
    >
      {/* Corner accent */}
      <div
        className="absolute top-0 right-0 w-20 h-20 opacity-20 rounded-bl-full"
        style={{
          background: `radial-gradient(circle at top right, ${neonColor}, transparent 70%)`,
        }}
      />

      {isLoading ? (
        <div
          data-ocid="stats.loading_state"
          className="w-full flex flex-col items-center gap-3"
        >
          <Skeleton className="h-10 w-32 rounded-lg" />
          <Skeleton className="h-4 w-24 rounded" />
        </div>
      ) : (
        <>
          <span
            className={`text-4xl md:text-5xl font-mono font-black tracking-tight ${glowClass}`}
            aria-live="polite"
          >
            {prefix}
            {displayValue}
            {suffix}
          </span>
          <span className="mt-3 text-sm font-mono text-muted-foreground uppercase tracking-widest">
            {label}
          </span>
          {/* Underline accent */}
          <div
            className="mt-4 h-0.5 w-12 rounded-full opacity-60"
            style={{
              background: `linear-gradient(90deg, transparent, ${neonColor}, transparent)`,
            }}
          />
        </>
      )}
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function StatsSection() {
  const { data: stats, isLoading } = useStats();

  const messagesAnalyzed = stats ? Number(stats.totalAnalyzed) : 0;
  const spamCount = stats ? Number(stats.totalSpam) : 0;
  const spamPercent =
    messagesAnalyzed > 0 ? Math.round((spamCount / messagesAnalyzed) * 100) : 0;

  return (
    <section
      id="stats"
      data-ocid="stats.section"
      className="relative py-28 px-6 bg-card/20 overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 cyber-grid opacity-40 pointer-events-none" />
      {/* Radial glow backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(57,255,20,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div
              className="h-px flex-1 max-w-[80px]"
              style={{
                background: "linear-gradient(90deg, transparent, #39FF14)",
              }}
            />
            <span className="font-mono text-xs text-[#39FF14] tracking-[0.25em] uppercase">
              By the numbers
            </span>
            <div
              className="h-px flex-1 max-w-[80px]"
              style={{
                background: "linear-gradient(90deg, #39FF14, transparent)",
              }}
            />
          </div>

          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            System <span className="glow-green">Stats</span>
          </h2>

          {/* Neon glow underline */}
          <div className="flex items-center justify-center gap-0">
            <div
              className="h-0.5 w-24 rounded-full"
              style={{
                background: "linear-gradient(90deg, transparent, #39FF14)",
              }}
            />
            <div
              className="h-1 w-8 rounded-full"
              style={{
                background: "#39FF14",
                boxShadow: "0 0 12px #39FF14, 0 0 24px #39FF1488",
              }}
            />
            <div
              className="h-0.5 w-24 rounded-full"
              style={{
                background: "linear-gradient(90deg, #00D9FF, transparent)",
              }}
            />
          </div>
        </motion.div>

        {/* 4 Metric Cards */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          data-ocid="stats.cards_grid"
        >
          <StatCard
            data-ocid="stats.card.1"
            label="Messages Analyzed"
            value={messagesAnalyzed}
            color="cyan"
            isLoading={isLoading}
            delay={0}
          />
          <StatCard
            data-ocid="stats.card.2"
            label="Spam Blocked"
            value={spamPercent}
            suffix="%"
            color="green"
            isLoading={isLoading}
            delay={0.1}
          />
          <StatCard
            data-ocid="stats.card.3"
            label="Detection Accuracy"
            value={998}
            suffix="%"
            decimals={1}
            color="green"
            isLoading={false}
            delay={0.2}
          />
          <StatCard
            data-ocid="stats.card.4"
            label="Avg Response Time"
            value={8}
            prefix="0."
            suffix="ms"
            decimals={0}
            color="cyan"
            isLoading={false}
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
}
