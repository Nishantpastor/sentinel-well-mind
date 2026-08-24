import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const axis = {
  stroke: "var(--muted-foreground)",
  fontSize: 12,
  tickLine: false,
  axisLine: false,
};

const tooltipStyle = {
  contentStyle: {
    background: "var(--card)",
    border: "1px solid var(--border)",
    borderRadius: 12,
    fontSize: 12,
    boxShadow: "var(--shadow-card)",
  },
  labelStyle: { color: "var(--muted-foreground)", fontSize: 11 },
};

export function TrendChart({
  data,
  series,
  height = 240,
  yDomain,
}: {
  data: object[];
  series: Array<{ key: string; label: string; color: string }>;
  height?: number;
  yDomain?: [number, number];
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 8, right: 12, left: -18, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey="month" {...axis} />
        <YAxis {...axis} domain={yDomain ?? ["auto", "auto"]} />
        <Tooltip {...tooltipStyle} />
        {series.length > 1 ? <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} /> : null}
        {series.map((s) => (
          <Line
            key={s.key}
            type="monotone"
            dataKey={s.key}
            name={s.label}
            stroke={s.color}
            strokeWidth={2.4}
            dot={{ r: 3, strokeWidth: 0, fill: s.color }}
            activeDot={{ r: 5 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

export function AreaTrendChart({
  data,
  dataKey,
  color,
  height = 200,
}: {
  data: object[];
  dataKey: string;
  color: string;
  height?: number;
}) {
  const id = `grad-${dataKey}`;
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 12, left: -18, bottom: 0 }}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.35} />
            <stop offset="100%" stopColor={color} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey="month" {...axis} />
        <YAxis {...axis} />
        <Tooltip {...tooltipStyle} />
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={2.4}
          fill={`url(#${id})`}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function RiskDistributionChart({
  data,
  height = 300,
}: {
  data: Array<{ name: string; value: number; color: string }>;
  height?: number;
}) {
  const total = data.reduce((a, b) => a + b.value, 0);
  return (
    <div className="flex flex-col items-center gap-6 lg:flex-row">
      <div className="relative w-full max-w-[320px]" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius="64%"
              outerRadius="92%"
              paddingAngle={2}
              stroke="var(--card)"
              strokeWidth={2}
            >
              {data.map((d) => (
                <Cell key={d.name} fill={d.color} />
              ))}
            </Pie>
            <Tooltip {...tooltipStyle} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <div className="text-center">
            <p className="font-display text-3xl font-semibold tabular-nums">
              {total.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">Personnel</p>
          </div>
        </div>
      </div>
      <ul className="w-full flex-1 space-y-3">
        {data.map((d) => (
          <li key={d.name} className="flex items-center gap-3">
            <span className="size-2.5 rounded-full" style={{ background: d.color }} />
            <span className="flex-1 text-sm font-medium">{d.name}</span>
            <span className="text-sm tabular-nums text-muted-foreground">
              {d.value.toLocaleString()}
            </span>
            <span className="w-14 text-right text-sm font-semibold tabular-nums">
              {total > 0 ? `${((d.value / total) * 100).toFixed(1)}%` : "—"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SimpleBarChart({
  data,
  xKey,
  dataKey,
  color,
  height = 220,
}: {
  data: object[];
  xKey: string;
  dataKey: string;
  color: string;
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 12, left: -18, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey={xKey} {...axis} />
        <YAxis {...axis} />
        <Tooltip {...tooltipStyle} cursor={{ fill: "var(--muted)" }} />
        <Bar dataKey={dataKey} fill={color} radius={[6, 6, 0, 0]} maxBarSize={44} />
      </BarChart>
    </ResponsiveContainer>
  );
}
