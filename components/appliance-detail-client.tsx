"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  generateDailyData,
  generateMonthlyData,
  generateYearlyData,
  computeStats,
} from "@/lib/appliance-detail-data"
import type { ApplianceData, } from "@/lib/energy-data"
import { RATE_PER_KWH } from "@/lib/energy-data"

const chartConfig = {
  usage: {
    label: "Usage (kWh)",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

function StatBlock({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-muted-foreground">{label}</span>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold font-mono text-foreground">{value}</span>
        <span className="text-xs text-muted-foreground">{unit}</span>
      </div>
    </div>
  )
}

export function ApplianceDetailClient({ appliance }: { appliance: ApplianceData }) {
  const [tab, setTab] = useState<"daily" | "monthly" | "yearly">("daily")

  const dailyData = useMemo(() => generateDailyData(appliance), [appliance])
  const monthlyData = useMemo(() => generateMonthlyData(appliance), [appliance])
  const yearlyData = useMemo(() => generateYearlyData(appliance), [appliance])

  const dataMap = { daily: dailyData, monthly: monthlyData, yearly: yearlyData }
  const currentData = dataMap[tab]
  const stats = useMemo(() => computeStats(currentData), [currentData])

  const periodLabel = tab === "daily" ? "Today" : tab === "monthly" ? "This Month" : "This Year"
  const unitLabel = tab === "daily" ? "kW" : "kWh"

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6">
          {/* Back link + title */}
          <div className="flex flex-col gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground w-fit"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              Back to Dashboard
            </Link>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                {appliance.name}
              </h1>
              <Badge
                className={
                  appliance.status === "on"
                    ? "bg-primary/15 text-primary border-primary/25"
                    : appliance.status === "standby"
                      ? "text-chart-3 border-chart-3/25"
                      : "text-muted-foreground border-muted"
                }
                variant={appliance.status === "on" ? "default" : "outline"}
              >
                {appliance.status === "on" ? "On" : appliance.status === "standby" ? "Standby" : "Off"}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {appliance.category} &middot; {appliance.power.toLocaleString()} W &middot; {"\u20B9"}{RATE_PER_KWH.toFixed(2)}/kWh
            </p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Card>
              <CardContent className="pt-6">
                <StatBlock label={`Total (${periodLabel})`} value={stats.total} unit="kWh" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <StatBlock label="Average" value={stats.avg} unit={unitLabel} />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <StatBlock label="Peak" value={stats.peak} unit={unitLabel} />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <StatBlock label="Cost" value={`\u20B9${stats.cost}`} unit="" />
              </CardContent>
            </Card>
          </div>

          {/* Chart with tabs */}
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Consumption History</CardTitle>
                  <CardDescription>
                    {tab === "daily"
                      ? "Hourly breakdown for today"
                      : tab === "monthly"
                        ? "Daily breakdown for this month"
                        : "Monthly breakdown for this year"}
                  </CardDescription>
                </div>
                <Tabs value={tab} onValueChange={(v) => setTab(v as "daily" | "monthly" | "yearly")}>
                  <TabsList>
                    <TabsTrigger value="daily">Daily</TabsTrigger>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    <TabsTrigger value="yearly">Yearly</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={tab}>
                {/* Daily: Area chart */}
                <TabsContent value="daily" className="mt-0">
                  <ChartContainer config={chartConfig} className="h-[350px] w-full">
                    <AreaChart data={dailyData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                      <defs>
                        <linearGradient id="fillUsageDaily" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0.02} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid vertical={false} strokeDasharray="3 3" />
                      <XAxis
                        dataKey="label"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        interval={2}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tick={{ fontSize: 12 }}
                        tickFormatter={(v) => `${v} kW`}
                      />
                      <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                      <Area
                        dataKey="usage"
                        type="monotone"
                        fill="url(#fillUsageDaily)"
                        stroke="var(--chart-1)"
                        strokeWidth={2}
                        dot={false}
                      />
                    </AreaChart>
                  </ChartContainer>
                </TabsContent>

                {/* Monthly: Bar chart */}
                <TabsContent value="monthly" className="mt-0">
                  <ChartContainer config={chartConfig} className="h-[350px] w-full">
                    <BarChart data={monthlyData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                      <CartesianGrid vertical={false} strokeDasharray="3 3" />
                      <XAxis
                        dataKey="label"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        interval={4}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tick={{ fontSize: 12 }}
                        tickFormatter={(v) => `${v} kWh`}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar
                        dataKey="usage"
                        fill="var(--chart-1)"
                        radius={[4, 4, 0, 0]}
                        maxBarSize={24}
                      />
                    </BarChart>
                  </ChartContainer>
                </TabsContent>

                {/* Yearly: Bar chart */}
                <TabsContent value="yearly" className="mt-0">
                  <ChartContainer config={chartConfig} className="h-[350px] w-full">
                    <BarChart data={yearlyData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                      <CartesianGrid vertical={false} strokeDasharray="3 3" />
                      <XAxis
                        dataKey="label"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tick={{ fontSize: 12 }}
                        tickFormatter={(v) => `${v} kWh`}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar
                        dataKey="usage"
                        fill="var(--chart-2)"
                        radius={[4, 4, 0, 0]}
                        maxBarSize={40}
                      />
                    </BarChart>
                  </ChartContainer>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
