# Design Brief: SMS Spam Detection

## Tone & Purpose
Cybersecurity showcase landing page. Cutting-edge, authoritative, neon-noir aesthetic. Convey technical sophistication and real-time threat detection capability.

## Visual Direction
Dark sci-fi theme with electric neon accents (green #39FF14, cyan #00D9FF). Deep charcoal base. High contrast, minimal ornamentation. Emphasis on motion and interactivity.

## Color Palette

| Role | OKLCH | Purpose |
|------|-------|----------|
| **Background** | `0.08 0.01 240` | Deep charcoal, nearly black |
| **Foreground** | `0.95 0.01 240` | Near-white text on dark |
| **Primary (Cyan)** | `0.65 0.19 262` | CTA buttons, highlights, interactive |
| **Accent (Neon Green)** | `0.65 0.23 139` | Status indicators, borders, glows |
| **Card** | `0.12 0.02 240` | Content surfaces with subtle elevation |
| **Border** | `0.22 0.02 240` | Subtle dividers |
| **Destructive (Red)** | `0.65 0.19 22` | Spam alerts, warnings |
| **Success (Green)** | `0.75 0.20 120` | Legitimate SMS, pass states |

## Typography
- **Display**: General Sans (modern, technical)
- **Body**: General Sans (clean, readable at all sizes)
- **Mono**: Geist Mono (code snippets, technical details)
- **Scale**: 12px base, 14px body, 16px–48px headlines via Tailwind scale

## Shape Language
- **Radius**: Minimal, 0–8px. Card corners at 8px, buttons at 6px, badges at 4px
- **Borders**: 1px, neon-glowing borders on interactive elements
- **Shadows**: Subtle depth via box-shadow with glow effects; no drop shadows

## Structural Zones

| Zone | Background | Treatment | Purpose |
|------|------------|-----------|----------|
| **Header** | `bg-background/50` backdrop-blur | Sticky, semi-transparent | Navigation + branding |
| **Hero** | 3D particle canvas overlay on `bg-background` | Full viewport, centered headline + CTA | First impression, engagement |
| **How It Works** | `bg-background` with `bg-card/30` section dividers | Alternating card backgrounds | Educational flow |
| **Stats** | `bg-background` | Neon-bordered cards in grid | Social proof |
| **Footer** | `bg-card` | Minimal, text-only | Legal/social links |

## Component Patterns
- **Buttons**: Neon cyan border, no fill; hover state brightens glow
- **Cards**: Subtle neon green border on hover, shadow glow
- **Indicators**: Pulsing animation for spam/ham results
- **Headings**: `glow-neon` text-shadow for impact
- **Inputs**: Dark background, cyan border on focus

## Motion
- **Entrance**: Fade-in on scroll via Framer Motion
- **Hero**: 3D particle animation, continuous drift
- **Pulsing**: Spam/ham indicator pulses on result
- **Hover**: Glow intensity increases, subtle scale shift
- **Scroll**: Parallax depth on cards, fade-in thresholds
- **Prefers-reduced-motion**: Disable animations, instant states

## Accessibility
- **Contrast**: OKLCH values tuned for AA+ (foreground-background >0.8 diff)
- **Motion**: `@media (prefers-reduced-motion)` disables Framer Motion and keyframe animations
- **Focus**: Cyan ring on all interactive elements
- **Typography**: 14px+ body, 1.6 line-height for readability

## Signature Detail
Neon glow borders on spam/ham indicator cards. Pulsing animation synchronized with 3D particle drift in hero section. Electric green (#39FF14) accent on live threat stats.

## Constraints
- No gradients (except subtle directional accents in hero)
- No drop shadows; glow only
- No rounded corners >8px
- Max 3 accent colors at any time
- All motion respects prefers-reduced-motion
