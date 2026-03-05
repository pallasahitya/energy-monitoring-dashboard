import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DAILY_TOTAL_KWH, MONTHLY_ESTIMATE_KWH, SOLAR_GENERATED_KWH } from "@/lib/energy-data"

interface StatItem {
  label: string
  value: string
  unit: string
  change?: string
  positive?: boolean
}

const stats: StatItem[] = [
  {
    label: "Today's Usage",
    value: DAILY_TOTAL_KWH.toFixed(1),
    unit: "kWh",
    change: "+8.2%",
    positive: false,
  },
  {
    label: "Solar Generated",
    value: SOLAR_GENERATED_KWH.toFixed(1),
    unit: "kWh",
    change: "+12.4%",
    positive: true,
  },
  {
    label: "Monthly Estimate",
    value: MONTHLY_ESTIMATE_KWH.toLocaleString(),
    unit: "kWh",
    change: "-3.1%",
    positive: true,
  },
]

export function StatsCards() {
  return (
    <>
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-bold tracking-tight font-mono text-foreground">
                {stat.value}
              </span>
              <span className="text-sm text-muted-foreground">{stat.unit}</span>
            </div>
            {stat.change && (
              <p className={`mt-2 text-sm ${stat.positive ? "text-primary" : "text-chart-4"}`}>
                {stat.change} vs yesterday
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </>
  )
}
