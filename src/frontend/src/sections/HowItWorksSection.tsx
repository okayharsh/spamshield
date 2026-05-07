import {
  BarChart2,
  CheckCircle2,
  Hash,
  MessageSquare,
  Ruler,
} from "lucide-react";
import {
  type Variants,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { useRef } from "react";

const STEPS = [
  {
    id: "input-sms",
    icon: MessageSquare,
    title: "Input SMS",
    desc: "Raw message text is submitted through the secure detection interface.",
    color: "#39FF14",
  },
  {
    id: "keyword-analysis",
    icon: Hash,
    title: "Keyword Analysis",
    desc: "Over 200 spam-associated keywords and phrases are scanned for matches.",
    color: "#00D9FF",
  },
  {
    id: "length-check",
    icon: Ruler,
    title: "Length Check",
    desc: "Unusually short or excessively long messages flag suspicious patterns.",
    color: "#39FF14",
  },
  {
    id: "symbol-ratio",
    icon: BarChart2,
    title: "Symbol Ratio",
    desc: "High density of digits, URLs, and special characters raises the threat score.",
    color: "#00D9FF",
  },
  {
    id: "classification",
    icon: CheckCircle2,
    title: "Classification Result",
    desc: "Signals are combined into a final verdict: SPAM or LEGITIMATE, with confidence.",
    color: "#39FF14",
  },
];

function ConnectorLine({ index, active }: { index: number; active: boolean }) {
  const shouldReduce = useReducedMotion();
  const color = index % 2 === 0 ? "#39FF14" : "#00D9FF";

  return (
    <div className="hidden lg:flex items-center flex-shrink-0 w-10 xl:w-14">
      <div className="relative w-full h-px">
        <div
          className="absolute inset-0 h-px"
          style={{ background: `${color}30` }}
        />
        {!shouldReduce && (
          <motion.div
            className="absolute inset-y-0 left-0 h-px w-8"
            style={{
              background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            }}
            initial={{ x: "-100%", opacity: 0 }}
            animate={
              active
                ? { x: "200%", opacity: [0, 1, 0] }
                : { x: "-100%", opacity: 0 }
            }
            transition={{
              duration: 1.4,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 0.6,
              delay: index * 0.3,
              ease: "easeInOut",
            }}
          />
        )}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0"
          style={{
            borderLeft: `5px solid ${color}80`,
            borderTop: "3px solid transparent",
            borderBottom: "3px solid transparent",
          }}
        />
      </div>
    </div>
  );
}

function VerticalConnector({
  index,
  active,
}: {
  index: number;
  active: boolean;
}) {
  const shouldReduce = useReducedMotion();
  const color = index % 2 === 0 ? "#39FF14" : "#00D9FF";

  return (
    <div className="lg:hidden flex justify-center my-1">
      <div className="relative w-px h-10">
        <div
          className="absolute inset-0 w-px"
          style={{ background: `${color}30` }}
        />
        {!shouldReduce && (
          <motion.div
            className="absolute left-0 w-px h-8"
            style={{
              background: `linear-gradient(180deg, transparent, ${color}, transparent)`,
            }}
            initial={{ y: "-100%", opacity: 0 }}
            animate={
              active
                ? { y: "200%", opacity: [0, 1, 0] }
                : { y: "-100%", opacity: 0 }
            }
            transition={{
              duration: 1.2,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 0.6,
              delay: index * 0.3,
              ease: "easeInOut",
            }}
          />
        )}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0"
          style={{
            borderTop: `5px solid ${color}80`,
            borderLeft: "3px solid transparent",
            borderRight: "3px solid transparent",
          }}
        />
      </div>
    </div>
  );
}

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const getCardVariants = (i: number): Variants => ({
    hidden: { opacity: 0, y: shouldReduce ? 0 : 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduce ? 0 : 0.55,
        delay: shouldReduce ? 0 : i * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  });

  return (
    <section
      id="how-it-works"
      data-ocid="how-it-works.section"
      ref={sectionRef}
      className="py-28 px-6 bg-background cyber-grid relative overflow-hidden"
    >
      {/* Ambient glow blobs */}
      <div
        className="pointer-events-none absolute -top-32 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{ background: "#39FF14" }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{ background: "#00D9FF" }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduce ? 0 : 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: shouldReduce ? 0 : 0.65 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#39FF14]/50" />
            <span className="font-mono text-xs text-[#39FF14] tracking-[0.25em] uppercase">
              Detection Pipeline
            </span>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#39FF14]/50" />
          </div>

          <h2 className="text-3xl md:text-5xl font-display font-black mb-4 leading-tight">
            How Detection{" "}
            <span className="relative inline-block">
              <span className="glow-green">Works</span>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-0.5"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #39FF14, #00D9FF, transparent)",
                  boxShadow: "0 0 8px #39FF14, 0 0 16px #39FF1466",
                }}
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{
                  duration: shouldReduce ? 0 : 0.8,
                  delay: shouldReduce ? 0 : 0.3,
                }}
              />
            </span>
          </h2>

          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Five deterministic checks run in milliseconds to classify every
            message as spam or legitimate.
          </p>
        </motion.div>

        {/* ── Pipeline ── */}
        <div className="flex flex-col lg:flex-row lg:items-stretch lg:justify-between">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            const isLast = i === STEPS.length - 1;
            return (
              <div key={step.id} className="contents">
                {/* Step card */}
                <motion.div
                  variants={getCardVariants(i)}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  data-ocid={`how-it-works.step.${i + 1}`}
                  className="flex-1 min-w-0 flex flex-col items-center text-center p-6 rounded-2xl bg-card transition-colors duration-300 group cursor-default"
                  style={{
                    border: `1px solid ${step.color}40`,
                  }}
                  whileHover={
                    !shouldReduce
                      ? {
                          boxShadow: `0 0 24px ${step.color}44, 0 0 8px ${step.color}22`,
                          scale: 1.03,
                        }
                      : {}
                  }
                >
                  {/* Badge */}
                  <div
                    className="font-mono text-xs tracking-widest mb-4 px-2 py-0.5 rounded-full"
                    style={{
                      color: step.color,
                      background: `${step.color}15`,
                      border: `1px solid ${step.color}35`,
                    }}
                  >
                    STEP {String(i + 1).padStart(2, "0")}
                  </div>

                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `${step.color}12`,
                      border: `1px solid ${step.color}45`,
                      boxShadow: `0 0 20px ${step.color}20`,
                    }}
                  >
                    <Icon className="w-7 h-7" style={{ color: step.color }} />
                  </div>

                  <h3
                    className="text-base font-display font-bold mb-2"
                    style={{ color: step.color }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>

                {/* Connector between steps */}
                {!isLast && (
                  <>
                    <ConnectorLine index={i} active={isInView} />
                    <VerticalConnector index={i} active={isInView} />
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Terminal readout ── */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduce ? 0 : 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: shouldReduce ? 0 : 0.55,
            delay: shouldReduce ? 0 : 0.75,
          }}
          className="mt-16 mx-auto max-w-lg rounded-xl overflow-hidden"
          style={{
            border: "1px solid #39FF1430",
            background: "rgba(10, 10, 18, 0.85)",
            boxShadow: "0 0 30px #39FF1418",
          }}
        >
          {/* Title bar */}
          <div
            className="flex items-center gap-2 px-4 py-2.5"
            style={{
              background: "#39FF1410",
              borderBottom: "1px solid #39FF1425",
            }}
          >
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: "#ff3a3a", boxShadow: "0 0 5px #ff3a3a" }}
            />
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: "#ffcc00", boxShadow: "0 0 5px #ffcc00" }}
            />
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: "#39FF14", boxShadow: "0 0 5px #39FF14" }}
            />
            <span
              className="ml-2 font-mono text-xs"
              style={{ color: "#39FF1488" }}
            >
              sms-detector — analysis output
            </span>
          </div>
          {/* Body */}
          <div className="px-5 py-4 font-mono text-xs leading-6 space-y-1">
            <p style={{ color: "#39FF1488" }}>&gt; analyzing message...</p>
            <p style={{ color: "#00D9FF88" }}>
              &nbsp;&nbsp;keywords_matched: 3 (&quot;free&quot;,
              &quot;winner&quot;, &quot;claim&quot;)
            </p>
            <p style={{ color: "#39FF1488" }}>&nbsp;&nbsp;length_score: 0.82</p>
            <p style={{ color: "#00D9FF88" }}>
              &nbsp;&nbsp;symbol_ratio: 0.19 — HIGH
            </p>
            <p style={{ color: "#39FF1488" }}>&nbsp;&nbsp;url_detected: true</p>
            <p style={{ color: "#ffffff40" }}>
              &nbsp;&nbsp;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;&#9472;
            </p>
            <p>
              <span style={{ color: "#39FF14", fontWeight: 700 }}>
                &nbsp;&nbsp;VERDICT:{" "}
              </span>
              <span
                style={{
                  color: "#ff3a3a",
                  textShadow: "0 0 8px #ff3a3a",
                  fontWeight: 700,
                }}
              >
                SPAM
              </span>
              <span style={{ color: "#ffffff66" }}> — confidence 97.4%</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
