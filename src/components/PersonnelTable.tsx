import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Minus, Search, ArrowDownRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { RiskBadge } from "./RiskBadge";
import type { Personnel } from "@/types";

export function PersonnelTable({
  data,
  loading,
  overrides,
}: {
  data: Personnel[];
  loading?: boolean;
  overrides?: Record<string, { score: number; band: Personnel["band"]; trend: Personnel["trend"] }> | undefined;
}) {
  const [query, setQuery] = useState("");
  const [risk, setRisk] = useState("all");
  const [unit, setUnit] = useState("all");
  const [trend, setTrend] = useState("all");

  const rows = useMemo(() => {
    return data
      .map((p) => {
        const o = overrides?.[p.id];
        return o ? { ...p, riskScore: o.score, band: o.band, trend: o.trend } : p;
      })
      .filter((p) => {
        if (query && !p.id.toLowerCase().includes(query.toLowerCase())) return false;
        if (risk !== "all" && p.band !== risk) return false;
        if (unit !== "all" && p.unit !== unit) return false;
        if (trend !== "all" && p.trend !== trend) return false;
        return true;
      })
      .sort((a, b) => b.riskScore - a.riskScore);
  }, [data, query, risk, unit, trend, overrides]);

  const units = Array.from(new Set(data.map((p) => p.unit))).sort();

  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative lg:max-w-xs lg:flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search personnel ID..."
            className="pl-9"
            aria-label="Search personnel ID"
          />
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:ml-auto lg:flex">
          <Select value={risk} onValueChange={setRisk}>
            <SelectTrigger className="w-full lg:w-[140px]">
              <SelectValue placeholder="Risk" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All risk</SelectItem>
              <SelectItem value="LOW">Low</SelectItem>
              <SelectItem value="MODERATE">Moderate</SelectItem>
              <SelectItem value="HIGH">High</SelectItem>
              <SelectItem value="CRITICAL">Critical</SelectItem>
            </SelectContent>
          </Select>
          <Select value={unit} onValueChange={setUnit}>
            <SelectTrigger className="w-full lg:w-[130px]">
              <SelectValue placeholder="Unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All units</SelectItem>
              {units.map((u) => (
                <SelectItem key={u} value={u}>
                  {u}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={trend} onValueChange={setTrend}>
            <SelectTrigger className="w-full lg:w-[150px]">
              <SelectValue placeholder="Trend" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All trends</SelectItem>
              <SelectItem value="Increasing">Increasing</SelectItem>
              <SelectItem value="Stable">Stable</SelectItem>
              <SelectItem value="Decreasing">Decreasing</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {rows.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border py-16 text-center">
          <p className="text-sm font-medium">No personnel match these filters</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Adjust the risk, unit or trend filters to widen the search.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[880px] text-sm">
            <thead>
              <tr className="border-b border-border bg-surface text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3 font-medium">Personnel ID</th>
                <th className="px-4 py-3 font-medium">Unit</th>
                <th className="px-4 py-3 font-medium">Risk</th>
                <th className="px-4 py-3 font-medium">Score</th>
                <th className="px-4 py-3 font-medium">Trend</th>
                <th className="px-4 py-3 font-medium">Main Indicators</th>
                <th className="px-4 py-3 font-medium">Last Assessment</th>
                <th className="px-4 py-3 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => {
                const TrendIcon =
                  p.trend === "Increasing"
                    ? ArrowUpRight
                    : p.trend === "Decreasing"
                      ? ArrowDownRight
                      : Minus;
                return (
                  <tr key={p.id} className="border-b border-border last:border-0 hover:bg-surface/70">
                    <td className="px-4 py-3 font-mono font-medium">{p.id}</td>
                    <td className="px-4 py-3 text-muted-foreground">{p.unit}</td>
                    <td className="px-4 py-3">
                      <RiskBadge band={p.band} size="sm" />
                    </td>
                    <td className="px-4 py-3 font-semibold tabular-nums">{p.riskScore}</td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          p.trend === "Increasing"
                            ? "inline-flex items-center gap-1 text-risk-high"
                            : "inline-flex items-center gap-1 text-muted-foreground"
                        }
                      >
                        <TrendIcon className="size-3.5" />
                        {p.trend}
                      </span>
                    </td>
                    <td className="max-w-[240px] px-4 py-3 text-muted-foreground">
                      {p.indicators.join(", ")}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{p.lastAssessment}</td>
                    <td className="px-4 py-3 text-right">
                      <Button asChild variant="ghost" size="sm">
                        <Link to="/welfare/personnel/$id" params={{ id: p.id }}>
                          View <ArrowRight className="size-3.5" />
                        </Link>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <p className="text-xs text-muted-foreground">
        Showing {rows.length} of {data.length} personnel · identifiers only, no names displayed
      </p>
    </div>
  );
}
