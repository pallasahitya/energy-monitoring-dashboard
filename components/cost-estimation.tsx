import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { DAILY_TOTAL_KWH, MONTHLY_ESTIMATE_KWH, RATE_PER_KWH, SOLAR_GENERATED_KWH } from "@/lib/energy-data"

interface CostLineItem {
  label: string
  kwh: number
  rate: number
  isCredit?: boolean
}

const lineItems: CostLineItem[] = [
  { label: "Grid consumption (today)", kwh: DAILY_TOTAL_KWH, rate: RATE_PER_KWH },
  { label: "Solar offset", kwh: SOLAR_GENERATED_KWH, rate: RATE_PER_KWH, isCredit: true },
]

export function CostEstimation() {
  const netDailyKwh = DAILY_TOTAL_KWH - SOLAR_GENERATED_KWH
  const netDailyCost = netDailyKwh * RATE_PER_KWH
  const monthlyEstimate = MONTHLY_ESTIMATE_KWH * RATE_PER_KWH
  const monthlySavings = SOLAR_GENERATED_KWH * 30 * RATE_PER_KWH

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cost Breakdown</CardTitle>
        <CardDescription>
          {"Rate: \u20B9"}{RATE_PER_KWH.toFixed(2)} / kWh
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* Line items */}
          <div className="flex flex-col gap-3">
            {lineItems.map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{item.label}</span>
                <span className={`text-sm font-mono font-medium ${item.isCredit ? "text-primary" : "text-foreground"}`}>
                  {item.isCredit ? "-" : ""}{"\u20B9"}{(item.kwh * item.rate).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-border" />

          {/* Net today */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Net cost today</span>
            <span className="text-lg font-bold font-mono text-foreground">
              {"\u20B9"}{netDailyCost.toFixed(2)}
            </span>
          </div>

          {/* Divider */}
          <div className="h-px bg-border" />

          {/* Monthly projections */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Monthly estimate</span>
              <span className="text-sm font-mono font-medium text-foreground">
                {"\u20B9"}{monthlyEstimate.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Monthly solar savings</span>
              <span className="text-sm font-mono font-medium text-primary">
                -{"\u20B9"}{monthlySavings.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">Projected monthly bill</span>
              <span className="text-lg font-bold font-mono text-foreground">
                {"\u20B9"}{(monthlyEstimate - monthlySavings).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
