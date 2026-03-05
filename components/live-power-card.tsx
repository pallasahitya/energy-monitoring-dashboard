"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CURRENT_POWER_KW } from "@/lib/energy-data"

export function LivePowerCard() {
  const [power, setPower] = useState(CURRENT_POWER_KW)
  const [trend, setTrend] = useState<"up" | "down" | "stable">("stable")

  useEffect(() => {
    const interval = setInterval(() => {
      setPower((prev) => {
        const fluctuation = (Math.random() - 0.5) * 0.4
        const next = Math.max(0.5, prev + fluctuation)
        if (next > prev + 0.05) setTrend("up")
        else if (next < prev - 0.05) setTrend("down")
        else setTrend("stable")
        return Math.round(next * 100) / 100
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5" />
      <CardHeader className="relative">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Live Power Draw
          </CardTitle>
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
          </span>
        </div>
      </CardHeader>
      <CardContent className="relative">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold tracking-tight font-mono text-foreground">
            {power.toFixed(2)}
          </span>
          <span className="text-lg text-muted-foreground">kW</span>
        </div>
        <div className="mt-3 flex items-center gap-2 text-sm">
          {trend === "up" && (
            <span className="flex items-center gap-1 text-chart-4">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="rotate-0">
                <path d="M8 3L13 10H3L8 3Z" fill="currentColor" />
              </svg>
              Rising
            </span>
          )}
          {trend === "down" && (
            <span className="flex items-center gap-1 text-primary">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="rotate-180">
                <path d="M8 3L13 10H3L8 3Z" fill="currentColor" />
              </svg>
              Dropping
            </span>
          )}
          {trend === "stable" && (
            <span className="flex items-center gap-1 text-muted-foreground">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="7" width="12" height="2" rx="1" fill="currentColor" />
              </svg>
              Stable
            </span>
          )}
          <span className="text-muted-foreground">
            {"·"} Updated just now
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
