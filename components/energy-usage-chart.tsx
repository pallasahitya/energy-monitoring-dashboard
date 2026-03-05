"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { hourlyUsageData } from "@/lib/energy-data"

const chartConfig = {
  consumption: {
    label: "Consumption",
    color: "var(--chart-2)",
  },
  solar: {
    label: "Solar",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function EnergyUsageChart() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Energy Usage</CardTitle>
            <CardDescription>Consumption vs. solar generation over 24 hours</CardDescription>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-sm bg-chart-2" />
              <span className="text-muted-foreground">Consumption</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-sm bg-chart-1" />
              <span className="text-muted-foreground">Solar</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <AreaChart
            data={hourlyUsageData}
            margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
          >
            <defs>
              <linearGradient id="fillConsumption" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="fillSolar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
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
              tickFormatter={(value) => `${value} kW`}
            />
            <ChartTooltip
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="solar"
              type="monotone"
              fill="url(#fillSolar)"
              stroke="var(--chart-1)"
              strokeWidth={2}
              dot={false}
            />
            <Area
              dataKey="consumption"
              type="monotone"
              fill="url(#fillConsumption)"
              stroke="var(--chart-2)"
              strokeWidth={2}
              dot={false}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
