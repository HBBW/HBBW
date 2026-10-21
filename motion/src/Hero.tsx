import { useEffect, useState } from "react";
import {
  AbsoluteFill,
  continueRender,
  delayRender,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type HeroProps = {
  theme: "dark" | "light";
};

type Palette = {
  bg: string;
  ink: string;
  muted: string;
  line: string;
  accent: string;
  haloA: string;
  haloB: string;
};

const palettes: Record<HeroProps["theme"], Palette> = {
  dark: {
    bg: "#0B0B0C",
    ink: "#F4F1EC",
    muted: "#98968F",
    line: "rgba(244, 241, 236, 0.14)",
    accent: "#FF6A3D",
    haloA: "rgba(255, 106, 61, 0.14)",
    haloB: "rgba(118, 138, 255, 0.09)",
  },
  light: {
    bg: "#F4F1EA",
    ink: "#141412",
    muted: "#6D6B64",
    line: "rgba(20, 20, 18, 0.14)",
    accent: "#E8501F",
    haloA: "rgba(232, 80, 31, 0.12)",
    haloB: "rgba(72, 92, 220, 0.07)",
  },
};

const SANS = '"Geist Variable", "Segoe UI", sans-serif';
const MONO = '"Geist Mono Variable", "Cascadia Mono", monospace';

const Rings: React.FC<{ p: Palette; angle: number; pulse: number }> = ({
  p,
  angle,
  pulse,
}) => {
  const size = 250;
  const c = size / 2;
  const outer = 102;
  const dotX = c + outer * Math.cos(angle);
  const dotY = c + outer * Math.sin(angle);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ position: "absolute", right: 56, top: 55 }}
    >
      <g transform={`rotate(${(angle * 180) / Math.PI} ${c} ${c})`}>
        <circle
          cx={c}
          cy={c}
          r={outer}
          fill="none"
          stroke={p.line}
          strokeWidth={1}
          strokeDasharray="1 7"
          strokeLinecap="round"
        />
      </g>
      <circle cx={c} cy={c} r={77} fill="none" stroke={p.line} strokeWidth={1} />
      <g transform={`rotate(${(-angle * 180) / Math.PI * 0.7} ${c} ${c})`}>
        <circle
          cx={c}
          cy={c}
          r={52}
          fill="none"
          stroke={p.accent}
          strokeWidth={1}
          strokeDasharray="34 292.7"
          strokeLinecap="round"
          opacity={0.85}
        />
      </g>
      <circle
        cx={c}
        cy={c}
        r={27}
        fill="none"
        stroke={p.line}
        strokeWidth={1}
      />
      <path
        d="M0 -10 C1.4 -2 2 -1.4 10 0 C2 1.4 1.4 2 0 10 C-1.4 2 -2 1.4 -10 0 C-2 -1.4 -1.4 -2 0 -10 Z"
        fill={p.accent}
        transform={`translate(${c} ${c}) rotate(${(angle * 180) / Math.PI * 0.25})`}
      />
      <circle
        cx={dotX}
        cy={dotY}
        r={3 + pulse * 0.9}
        fill={p.accent}
      />
    </svg>
  );
};

export const Hero: React.FC<HeroProps> = ({ theme }) => {
  const p = palettes[theme];
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const [handle] = useState(() => delayRender("Loading Geist"));

  useEffect(() => {
    document.fonts.ready.then(() => continueRender(handle));
  }, [handle]);

  const t = frame / durationInFrames;
  const angle = t * Math.PI * 2;
  const driftX = Math.sin(angle) * 16;
  const driftY = Math.cos(angle) * 10;
  const pulse = (Math.sin(t * Math.PI * 4 - Math.PI / 2) + 1) / 2;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: p.bg,
        color: p.ink,
        fontFamily: SANS,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 760,
          height: 760,
          right: -240 + driftX,
          top: -380 + driftY,
          background: `radial-gradient(circle, ${p.haloA} 0%, transparent 62%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 620,
          height: 620,
          left: -260 - driftX * 0.6,
          bottom: -430 - driftY * 0.6,
          background: `radial-gradient(circle, ${p.haloB} 0%, transparent 64%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 18,
          border: `1px solid ${p.line}`,
          borderRadius: 24,
        }}
      />
      <Rings p={p} angle={angle} pulse={pulse} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: "50px 64px 44px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: MONO,
            fontSize: 10,
            letterSpacing: "0.17em",
            textTransform: "uppercase",
            color: p.muted,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: 99,
                backgroundColor: p.accent,
                opacity: 0.45 + pulse * 0.55,
              }}
            />
            <span>Full-stack developer</span>
          </div>
          <span>github.com/HBBW</span>
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            maxWidth: 700,
          }}
        >
          <div
            style={{
              width: 36,
              height: 1.5,
              backgroundColor: p.accent,
              marginBottom: 18,
              opacity: 0.9,
            }}
          />
          <h1
            style={{
              margin: 0,
              fontSize: 76,
              fontWeight: 500,
              letterSpacing: "-0.05em",
              lineHeight: 1,
              whiteSpace: "nowrap",
            }}
          >
            Habibi Widayanto
          </h1>
          <div
            style={{
              marginTop: 20,
              fontSize: 21,
              lineHeight: 1.4,
              letterSpacing: "-0.01em",
              color: p.muted,
              maxWidth: 620,
            }}
          >
            Building calm, useful software for everyday problems.
          </div>
          <div
            style={{
              marginTop: 28,
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontFamily: MONO,
              fontSize: 10,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: p.muted,
            }}
          >
            <span>TypeScript</span>
            <span style={{ opacity: 0.35 }}>/</span>
            <span>React</span>
            <span style={{ opacity: 0.35 }}>/</span>
            <span>Next.js</span>
            <span style={{ opacity: 0.35 }}>/</span>
            <span>PHP</span>
            <span style={{ opacity: 0.35 }}>/</span>
            <span>Python</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
