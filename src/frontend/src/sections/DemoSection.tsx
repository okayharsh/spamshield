import { useClassifyMessage } from "@/hooks/use-spam-detector";
import type { ClassificationResult } from "@/types";
import { AlertCircle, Send, ShieldCheck, ShieldX } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

const SAMPLE_MESSAGES = [
  {
    id: "phishing",
    label: "Phishing",
    text: "Congratulations! You've won a $1,000 gift card. Click here to claim: bit.ly/win-prize",
    isSpam: true,
  },
  {
    id: "lottery",
    label: "Lottery Scam",
    text: "URGENT: Your bank account has been compromised. Verify now at secure-bank-login.net",
    isSpam: true,
  },
  {
    id: "promo",
    label: "Promo Spam",
    text: "FREE ringtones! Txt YES to 4343 to get 10 free ringtones every month. $9.99/mo",
    isSpam: true,
  },
  {
    id: "schedule",
    label: "Legitimate",
    text: "Hey, can we reschedule our meeting to 3pm tomorrow? Works better for my schedule.",
    isSpam: false,
  },
  {
    id: "order",
    label: "Delivery",
    text: "Your Amazon order #112-3456789-345 has shipped. Estimated delivery: Nov 14.",
    isSpam: false,
  },
];

// Spinning neon ring loader
function NeonSpinner() {
  return (
    <output
      data-ocid="demo.loading_state"
      className="flex flex-col items-center justify-center gap-4 py-8"
      aria-label="Analyzing message"
    >
      <div className="relative w-16 h-16">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-2 border-[#00D9FF]/20" />
        {/* Spinning arc */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, #00D9FF 40%, transparent 60%)",
            borderRadius: "50%",
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        {/* Inner glow dot */}
        <div className="absolute inset-2 rounded-full bg-[#00D9FF]/10 border border-[#00D9FF]/30 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-[#00D9FF] shadow-[0_0_8px_#00D9FF]" />
        </div>
      </div>
      <span className="font-mono text-xs text-[#00D9FF] tracking-widest animate-pulse">
        SCANNING...
      </span>
    </output>
  );
}

// Large pulsing circle indicator
function PulsingIndicator({
  isSpam,
  reduced,
}: {
  isSpam: boolean;
  reduced: boolean | null;
}) {
  const color = isSpam ? "#FF3A3A" : "#39FF14";
  const shadow = isSpam
    ? "0 0 24px #FF3A3Aaa, 0 0 48px #FF3A3A55"
    : "0 0 24px #39FF14aa, 0 0 48px #39FF1455";

  return (
    <div className="flex justify-center mb-6">
      <div className="relative flex items-center justify-center w-24 h-24">
        {/* Outer pulse rings — hidden when reduced-motion */}
        {!reduced && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: `${color}18`,
                border: `1px solid ${color}55`,
              }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeOut",
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: `${color}0c`,
                border: `1px solid ${color}33`,
              }}
              animate={{ scale: [1, 1.9, 1], opacity: [0.4, 0, 0.4] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeOut",
                delay: 0.3,
              }}
            />
          </>
        )}
        {/* Core circle */}
        <motion.div
          initial={reduced ? false : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{
            background: `${color}22`,
            border: `2px solid ${color}`,
            boxShadow: shadow,
          }}
        >
          {isSpam ? (
            <ShieldX style={{ color }} className="w-7 h-7" />
          ) : (
            <ShieldCheck style={{ color }} className="w-7 h-7" />
          )}
        </motion.div>
      </div>
    </div>
  );
}

function ResultCard({
  result,
  reduced,
}: {
  result: ClassificationResult;
  reduced: boolean | null;
}) {
  const isSpam = result.isSpam;
  const confidenceNum = Number(result.confidence);

  return (
    <motion.div
      key={`result-${isSpam}-${confidenceNum}`}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? undefined : { opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      data-ocid="demo.result_card"
      className="mt-6"
    >
      {/* Pulsing indicator circle */}
      <PulsingIndicator isSpam={isSpam} reduced={reduced} />

      {/* Label + classification chip */}
      <div className="text-center mb-5">
        <span
          className="font-mono font-bold text-2xl tracking-wider"
          style={{
            color: isSpam ? "#FF3A3A" : "#39FF14",
            textShadow: isSpam ? "0 0 10px #FF3A3Acc" : "0 0 10px #39FF14cc",
          }}
        >
          {isSpam ? "⚠ SPAM DETECTED" : "✓ LEGITIMATE"}
        </span>
        <div className="mt-1">
          <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
            {result.classification}
          </span>
        </div>
      </div>

      {/* Confidence bar */}
      <div
        className={`p-5 rounded-xl ${
          isSpam
            ? "bg-red-950/20 border border-red-500/30"
            : "bg-[#39FF14]/5 border border-[#39FF14]/30"
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground font-mono uppercase tracking-widest">
            Confidence Score
          </span>
          <span
            className="text-sm font-mono font-bold"
            style={{ color: isSpam ? "#FF3A3A" : "#39FF14" }}
          >
            {confidenceNum}%
          </span>
        </div>
        <div className="h-2 rounded-full bg-muted/60 overflow-hidden">
          <motion.div
            initial={reduced ? false : { width: 0 }}
            animate={{ width: `${confidenceNum}%` }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
            className="h-full rounded-full"
            style={{
              background: isSpam
                ? "linear-gradient(90deg, #ff3a3a88, #ff3a3a)"
                : "linear-gradient(90deg, #39ff1488, #39ff14)",
              boxShadow: isSpam ? "0 0 8px #ff3a3a88" : "0 0 8px #39ff1488",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function DemoSection() {
  const [message, setMessage] = useState("");
  const { mutate, data, isPending, isError } = useClassifyMessage();
  const reduced = useReducedMotion();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) mutate(message.trim());
  };

  return (
    <section
      id="demo"
      data-ocid="demo.section"
      className="py-28 px-6 bg-card/40 relative overflow-hidden"
    >
      {/* Subtle cyber grid background */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Section divider */}
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px flex-1 bg-[#00D9FF]/20" />
            <span className="font-mono text-xs text-[#00D9FF] tracking-widest uppercase">
              Live Demo
            </span>
            <div className="h-px flex-1 bg-[#00D9FF]/20" />
          </div>

          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-3">
            Test the <span className="glow-cyan">Detector</span>
          </h2>
          <p className="text-center text-muted-foreground mb-8 font-body">
            Paste any SMS message and our engine classifies it instantly.
          </p>

          {/* Sample message pills */}
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="text-xs font-mono text-muted-foreground self-center mr-1">
              Try:
            </span>
            {SAMPLE_MESSAGES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                data-ocid={`demo.sample_button.${i + 1}`}
                onClick={() => setMessage(s.text)}
                className={`text-xs font-mono px-3 py-1.5 rounded-full border transition-all duration-200 hover:scale-105 active:scale-95 ${
                  s.isSpam
                    ? "border-red-500/40 text-red-400 hover:bg-red-500/10 hover:border-red-400/60"
                    : "border-[#39FF14]/40 text-[#39FF14] hover:bg-[#39FF14]/10 hover:border-[#39FF14]/60"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Input form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative group">
              <textarea
                data-ocid="demo.message_input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Paste an SMS message..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-background border border-border
                  focus:border-[#00D9FF]/70 focus:ring-2 focus:ring-[#00D9FF]/20
                  group-hover:border-border/80
                  outline-none font-mono text-sm text-foreground
                  placeholder:text-muted-foreground resize-none
                  transition-all duration-300
                  focus:shadow-[0_0_0_1px_#00D9FF33,0_0_20px_#00D9FF22]"
                style={{ minHeight: "110px" }}
              />
              <span className="absolute bottom-3 right-3 text-xs text-muted-foreground/60 font-mono select-none">
                {message.length} chars
              </span>
            </div>

            <button
              type="submit"
              data-ocid="demo.analyze_button"
              disabled={!message.trim() || isPending}
              className="w-full py-3.5 font-mono font-semibold rounded-xl
                border-neon-cyan text-[#00D9FF]
                hover:bg-[#00D9FF]/10 hover:scale-[1.01]
                active:scale-[0.99]
                disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100
                transition-all duration-200
                flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Analyze Message
            </button>
          </form>

          {/* States */}
          <AnimatePresence mode="wait">
            {isPending && (
              <motion.div
                key="loading"
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduced ? undefined : { opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <NeonSpinner />
              </motion.div>
            )}

            {isError && !isPending && (
              <motion.div
                key="error"
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0 }}
                transition={{ duration: 0.3 }}
                data-ocid="demo.error_state"
                className="mt-4 p-4 rounded-xl bg-destructive/10 border border-destructive/40 flex items-start gap-3"
              >
                <AlertCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                <span className="text-destructive text-sm font-mono">
                  Analysis failed — backend unreachable. Please try again.
                </span>
              </motion.div>
            )}

            {data && !isPending && (
              <ResultCard key="result" result={data} reduced={reduced} />
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
