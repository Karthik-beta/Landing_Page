/**
 * Hero section and supporting deterministic live metrics ticker.
 *
 * This module renders the landing page hero with a headline, animated typewriter
 * text, call-to-action, and a visually polished card stack. Beneath the hero,
 * it includes a deterministic, privacy-safe "Live Service Snapshot" ticker
 * that animates smoothly, aligns updates across clients, and respects reduced-motion preferences.
 *
 * Key aspects:
 * - Accessibility: Provides screen-reader friendly summary via `aria-live`,
 *   and disables marquee animations when users prefer reduced motion.
 * - Deterministic data: Metrics are generated from time-bucketed, seeded PRNGs
 *   so all clients display the same values for the same bucket without network calls.
 * - Performance: Uses requestAnimationFrame loops and lightweight easing;
 *   avoids unnecessary re-renders via `useMemo` and local state.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "./ui/button";
import { HeroCards } from "./HeroCards";
import { TypewriterText } from "./TypewriterText";

/* =======================
   Deterministic MSME/ERP Ticker (Responsive & Accessible)
   ======================= */

/**
 * Metric item shape displayed in the live ticker.
 * - `key` is a stable identifier used for lookup and icon selection
 * - `label` is a short, human-readable title
 * - `value` is a numeric reading for the current time bucket
 * - `type` controls display formatting (integer vs fixed-precision float)
 * - `suffix` optional unit suffix (e.g., "ms", "%")
 */
type MetricItem = {
  key: string;
  label: string;
  value: number;
  type: "int" | "float";
  suffix?: string;
};

/**
 * Size of the global synchronization bucket for metric generation.
 * All clients snap to the same 5s UTC bucket so values are consistent across users.
 */
const BUCKET_MS = 5000; // all clients snap to the same 5s UTC bucket

/**
 * Hero
 *
 * Renders the landing page hero: headline with gradient emphasis and a
 * typewriter-animated subject, supporting paragraph, primary CTA button that
 * smooth-scrolls to `#about`, and the decorative `HeroCards` visual. A
 * deterministic `LiveMetricsTicker` appears below the hero grid.
 */
export const Hero = () => {
  return (
    <section id="hero" className="container py-10 md:py-32">
      {/* Only the hero content is a grid, like the original */}
      <div className="grid lg:grid-cols-2 place-items-center gap-10">
        {/* Left column */}
        <div className="text-center lg:text-start space-y-6">
          <main className="text-5xl md:text-6xl font-bold">
            <h1 className="inline">
              <span className="inline bg-linear-to-r from-[#F596D3] to-[#D247BF] text-transparent bg-clip-text gradient-shimmer">
                Better
              </span>{" "}
              Solutions
            </h1>{" "}
            for Your{" "}
            <h2 className="inline">
              <TypewriterText
                words={["Business", "Teams", "Growth", "Success", "Future"]}
                className="inline bg-linear-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text"
                typeSpeed={120}
                deleteSpeed={80}
                delayBetweenWords={2500}
                showCursor={true}
                cursorClassName="bg-linear-to-r from-[#61DAFB] to-[#03a3d7]"
              />{" "}
            </h2>
          </main>

          <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
            Transforming Obstacles into Opportunities with Pioneering Technology.
          </p>

          <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex">
            <Button
              className="w-full md:w-auto"
              onClick={() =>
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              className="w-full md:w-auto"
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Talk to us
            </Button>
          </div>
        </div>

        {/* Right column */}
        <div className="z-10">
          <HeroCards />
        </div>

        {/* Shadow effect */}
        <div className="shadow"></div>
      </div>

      {/* Separate row (not part of the grid) */}
      <div className="mt-6">
        <LiveMetricsTicker />
      </div>
    </section>
  );
};

/* ---------- Ticker ---------- */

/**
 * LiveMetricsTicker
 *
 * Displays a horizontally scrolling (or snap-scrolling on mobile) set of
 * metric "pills" representing a live service snapshot. Metrics are generated
 * deterministically per time bucket. The ticker:
 * - Announces a concise textual status via `aria-live` for screen readers
 * - Pauses on hover
 * - Respects `prefers-reduced-motion` by switching to a static grid
 * - Uses a seamless loop for desktop by duplicating the metric array
 */
function LiveMetricsTicker() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [paused, setPaused] = useState(false);

  // Align updates to exact bucket edges globally
  const [bucket, setBucket] = useState(getBucket(Date.now(), BUCKET_MS));
  useEffect(() => {
    const id = scheduleNextBucket(setBucket, BUCKET_MS);
    return () => clearTimeout(id);
  }, []);

  const snapshot = useMemo(() => buildSnapshotPayload(bucket), [bucket]);
  const metrics = snapshot.metrics;

  // Accessible summary: voiced only, not visible
  const a11yText = useMemo(() => {
    const by = indexByKey(metrics);
    const uptime = safeToFixed(by("uptime")?.value, 2);
    const deployments = safeInt(by("deployments")?.value);
    const onprem = safeInt(by("onprem")?.value);
    const edge = safeInt(by("edge")?.value);
    const workOrders = safeInt(by("workOrders")?.value);
    const latency = safeInt(by("latency")?.value);
    return `Status: ${deployments} active deployments across ${onprem} on-prem sites and ${edge} edge gateways, ${workOrders} work orders processed today, average edge latency ${latency} milliseconds, SLA uptime ${uptime} percent.`;
  }, [metrics]);

  // Desktop/tablet marquee
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(0);
  const SPEED_PX_PER_SEC = 42;

  useEffect(() => {
    if (prefersReducedMotion) return;
    let raf = 0;
    let last = performance.now();
    const loop = (t: number) => {
      const dt = (t - last) / 1000;
      last = t;
      if (!paused) {
        setOffset((o) => {
          const next = o - SPEED_PX_PER_SEC * dt;
          const el = trackRef.current;
          const half = (el?.scrollWidth || 1) / 2;
          return next <= -half ? 0 : next;
        });
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [paused, prefersReducedMotion]);

  const doubled = useMemo(() => [...metrics, ...metrics], [metrics]);

  return (
    <div className="w-full">
      <span className="sr-only" role="status" aria-live="polite">
        {a11yText}
      </span>

      {/* Header bar */}
      <div className="mb-2 flex items-center gap-2 text-xs text-foreground/70">
        <span className="relative inline-flex h-2 w-2">
          <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-emerald-400/70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        <span className="font-medium">Current Ops Snapshot (IST)</span>
      </div>

      <div
        className={[
          "relative w-full overflow-hidden rounded-xl",
          "border border-white/10 ring-1 ring-white/[0.06]",
          "bg-gradient-to-r from-white/[0.04] via-white/[0.02] to-transparent",
          "backdrop-blur-sm",
        ].join(" ")}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent" />

        {/* Reduced motion: static grid */}
        {prefersReducedMotion && (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 p-3">
            {metrics.map((m) => (
              <MetricPill key={m.key} item={m} />
            ))}
          </div>
        )}

        {/* Mobile (md:hidden): scroll-snap row */}
        {!prefersReducedMotion && (
          <div className="md:hidden">
            <div className="flex snap-x snap-mandatory overflow-x-auto p-3 gap-3 [-webkit-overflow-scrolling:touch] scrollbar-none">
              {metrics.map((m) => (
                <div className="snap-start" key={m.key}>
                  <MetricPill item={m} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* md+ : seamless marquee loop */}
        {!prefersReducedMotion && (
          <div className="hidden md:block p-0.5">
            <div
              ref={trackRef}
              className="flex gap-3 whitespace-nowrap will-change-transform px-3 py-3"
              style={{ transform: `translateX(${offset}px)` }}
            >
              {doubled.map((m, i) => (
                <MetricPill key={`${m.key}-${i}`} item={m} ariaHidden={i >= metrics.length} />
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        /* Hide native scrollbar in WebKit */
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }

        @media (prefers-reduced-motion: reduce) {
          .will-change-transform { transition: none !important; }
        }
      `}</style>
    </div>
  );
}

function MetricPill({ item, ariaHidden }: { item: MetricItem; ariaHidden?: boolean }) {
  const display = useAnimatedNumber(item.value);
  return (
    <div
      aria-hidden={ariaHidden || undefined}
      className={[
        "flex items-center gap-2 rounded-lg px-3 py-2",
        "border border-white/10 bg-white/[0.03]",
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]",
      ].join(" ")}
    >
      <MetricIcon type={item.key} />
      <div className="flex flex-col leading-tight">
        <span className="text-[10px] sm:text-xs uppercase tracking-wide text-foreground/60">
          {item.label}
        </span>
        <span className="text-base sm:text-lg font-semibold tabular-nums">
          {formatValue(display, item)}{" "}
          <span className="text-foreground/50">{item.suffix ?? ""}</span>
        </span>
      </div>
    </div>
  );
}

/**
 * MetricIcon
 *
 * Minimal inline SVG iconography chosen by metric `key`. Icons are decorative
 * only and therefore marked with `aria-hidden` via the parent when duplicated.
 */
function MetricIcon({ type }: { type: string }) {
  const common = "w-5 h-5 text-cyan-400 shrink-0";
  switch (type) {
    case "deployments":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 7h16M4 12h14M4 17h10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "onprem":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M3 11h18v7H3z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M7 11V6h10v5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "edge":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M7 17h9a4 4 0 0 0 0-8 6 6 0 0 0-11-1 4 4 0 0 0 2 9z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      );
    case "workOrders":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 3h9l3 3v15H6z" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M8 9h8M8 13h8M8 17h5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "modules":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 7h7v7H4zM13 7h7v7h-7zM8.5 14.5h7v7h-7z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      );
    case "latency":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M3 12h6l3-8 3 16 3-8h3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "uptime":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 12a8 8 0 1 0 16 0A8 8 0 0 0 4 12Zm8-5v5l3 3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
  }
}

/* ---------- Deterministic generation ---------- */

/**
 * xmur3
 * Small non-cryptographic hash used to derive seeds from strings.
 */
function xmur3(str: string) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return function () {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return (h ^= h >>> 16) >>> 0;
  };
}
/**
 * sfc32
 * Small fast counter PRNG. Suitable for deterministic UI animation, not security.
 */
function sfc32(a: number, b: number, c: number, d: number) {
  return function () {
    a >>>= 0;
    b >>>= 0;
    c >>>= 0;
    d >>>= 0;
    let t = (a + b) | 0;
    d = (d + 1) | 0;
    a = b ^ (b >>> 9);
    b = (c + (c << 3)) | 0;
    c = (c << 21) | (c >>> 11);
    c = (c + t) | 0;
    return (t >>> 0) / 4294967296;
  };
}
/**
 * Creates a seeded PRNG from an arbitrary string.
 */
function rngFromSeed(seedStr: string) {
  const seed = xmur3(seedStr);
  return sfc32(seed(), seed(), seed(), seed());
}

/** Returns the lower UTC-aligned bucket boundary for `nowMs`. */
function getBucket(nowMs: number, bucketMs: number) {
  return Math.floor(nowMs / bucketMs) * bucketMs;
}
/**
 * Schedules the next bucket update and recursively reschedules thereafter.
 * Ensures all clients flip buckets at the same moment.
 */
function scheduleNextBucket(setBucket: (b: number) => void, bucketMs: number) {
  const now = Date.now();
  const next = getBucket(now, bucketMs) + bucketMs;
  const t = next - now;
  return window.setTimeout(function tick() {
    setBucket(getBucket(Date.now(), bucketMs));
    scheduleNextBucket(setBucket, bucketMs);
  }, t);
}

const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;
/** UTC->IST helper. */
function istNowDate(ms: number) {
  return new Date(ms + IST_OFFSET_MS);
}
/** YYYY-MM-DD key in IST. */
function istDayKey(ms: number) {
  const d = istNowDate(ms);
  const y = d.getUTCFullYear();
  const m = (d.getUTCMonth() + 1).toString().padStart(2, "0");
  const dd = d.getUTCDate().toString().padStart(2, "0");
  return `${y}-${m}-${dd}`;
}
/** YYYY-MM key in IST. */
function istMonthKey(ms: number) {
  const d = istNowDate(ms);
  const y = d.getUTCFullYear();
  const m = (d.getUTCMonth() + 1).toString().padStart(2, "0");
  return `${y}-${m}`;
}
/** Fraction of the IST day [0,1). */
function istFractionOfDay(ms: number) {
  const d = istNowDate(ms);
  const h = d.getUTCHours();
  const min = d.getUTCMinutes();
  const sec = d.getUTCSeconds();
  return (h * 3600 + min * 60 + sec) / 86400;
}

const PI = Math.PI;
const TAU = Math.PI * 2;
/** Smooth sine-based easing used for diurnal patterns. */
function easeInOutSine(t: number) {
  return 0.5 - 0.5 * Math.cos(PI * clamp01(t));
}
function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

/**
 * Builds a deterministic, API-shaped payload sized for a lean manufacturing startup.
 * Seeds derive from UTC bucket + IST day/month so every client sees the same payload
 * without a network call while still mimicking server-provided data.
 */
function buildSnapshotPayload(bucketMs: number) {
  const utcBucketKey = `pivotr|bucket|${bucketMs}`;
  const dayKey = `pivotr|day|${istDayKey(bucketMs)}`;
  const monthKey = `pivotr|month|${istMonthKey(bucketMs)}`;

  const rngBucket = rngFromSeed(utcBucketKey);
  const rngDay = rngFromSeed(dayKey);
  const rngMonth = rngFromSeed(monthKey);

  const onpremSites = 2 + Math.floor(rngMonth() * 4); // 2–5 small footprint plants
  const edgeGateways = 1 + Math.floor(rngMonth() * 3); // 1–3 edge drops
  const deployments = clamp(onpremSites + edgeGateways + Math.floor(rngBucket() * 2), 3, 10);

  const modules = deployments * (1 + Math.floor(rngMonth() * 3)); // modest module stack

  const slaDaily = 99.35 + rngDay() * 0.5;
  const sla = clamp(slaDaily + (rngBucket() - 0.5) * 0.08, 99.3, 99.85);

  const f = istFractionOfDay(bucketMs);
  const progress = easeInOutSine(clamp01((f - 0.18) / 0.72));
  const targetTotal = 60 + Math.floor(rngDay() * 240); // 60–300 work orders per day
  const workOrders = Math.max(0, Math.floor(targetTotal * progress));

  const baseLatency = 145 + Math.sin(TAU * f) * 12;
  const latency = Math.round(clamp(baseLatency + (rngBucket() - 0.5) * 16, 110, 190));

  const metrics: MetricItem[] = [
    { key: "deployments", label: "Active Deployments", value: deployments, type: "int" },
    { key: "onprem", label: "On-prem Sites", value: onpremSites, type: "int" },
    { key: "edge", label: "Edge Gateways", value: edgeGateways, type: "int" },
    { key: "workOrders", label: "Work Orders (Today)", value: workOrders, type: "int" },
    { key: "modules", label: "Modules Enabled", value: modules, type: "int" },
    { key: "latency", label: "Edge Latency (India)", value: latency, type: "int", suffix: "ms" },
    { key: "uptime", label: "Uptime (90d)", value: sla, type: "float", suffix: "%" },
  ];

  return {
    generatedAt: bucketMs,
    bucketMs: BUCKET_MS,
    metrics,
  };
}

/**
 * useAnimatedNumber
 *
 * Interpolates toward `target` over time using rAF for a smooth count-up/down
 * effect. Stops when within a small epsilon of the target.
 */
function useAnimatedNumber(target: number) {
  const [display, setDisplay] = useState(target);
  const targetRef = useRef(target);
  targetRef.current = target;

  useEffect(() => {
    let raf = 0;
    const animate = () => {
      setDisplay((current) => {
        const delta = targetRef.current - current;
        const step = delta * 0.15;
        if (Math.abs(delta) < 0.5) return targetRef.current;
        return current + step;
      });
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);
  return display;
}

/**
 * usePrefersReducedMotion
 *
 * Media-query hook that returns true when the user prefers reduced motion.
 */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return reduced;
}

/** Builds an indexer for metric items keyed by `key`. */
function indexByKey(items: MetricItem[]) {
  const map = new Map(items.map((m) => [m.key, m]));
  return (k: string) => map.get(k);
}

/** Safely format number with fixed fraction digits; returns dash on invalid input. */
function safeToFixed(n: unknown, digits: number) {
  return typeof n === "number" && Number.isFinite(n) ? n.toFixed(digits) : "—";
}
/** Safely format integer with locale; returns dash on invalid input. */
function safeInt(n: unknown) {
  return typeof n === "number" && Number.isFinite(n) ? Math.round(n).toLocaleString() : "—";
}
/** Formats value according to metric type and locale. */
function formatValue(n: number, item: MetricItem) {
  if (item.type === "int") return Math.round(n).toLocaleString();
  return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export default Hero;
