import { bandForScore, RISK_COLOR } from "@/utils/risk";

export function RiskGauge({ score, size = 220 }: { score: number; size?: number }) {
  const band = bandForScore(score);
  const color = RISK_COLOR[band];
  const radius = size / 2 - 16;
  const circumference = Math.PI * radius;
  const progress = Math.min(Math.max(score, 0), 100) / 100;
  const cx = size / 2;
  const cy = size / 2;

  return (
    <div className="flex flex-col items-center" style={{ width: size }}>
      <svg width={size} height={size / 2 + 12} viewBox={`0 0 ${size} ${size / 2 + 12}`}>
        <path
          d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
          fill="none"
          stroke="var(--border)"
          strokeWidth={14}
          strokeLinecap="round"
        />
        <path
          d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
          fill="none"
          stroke={color}
          strokeWidth={14}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress)}
          style={{ transition: "stroke-dashoffset 900ms ease, stroke 500ms ease" }}
        />
      </svg>
      <div className="-mt-12 text-center">
        <p className="font-display text-4xl font-semibold tabular-nums">{score}</p>
        <p className="text-xs uppercase tracking-widest" style={{ color }}>
          {band}
        </p>
      </div>
      <div className="mt-4 grid w-full grid-cols-4 gap-1 text-center text-[10px] text-muted-foreground">
        <span>0–30</span>
        <span>31–60</span>
        <span>61–80</span>
        <span>81–100</span>
      </div>
    </div>
  );
}
