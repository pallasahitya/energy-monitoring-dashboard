import { type ApplianceData, appliances, RATE_PER_KWH } from "./energy-data"

export interface DataPoint {
  label: string
  usage: number
}

// Seed-based random for consistent data per appliance
function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

export function getApplianceById(id: string): ApplianceData | undefined {
  return appliances.find((a) => a.id === id)
}

export function generateDailyData(appliance: ApplianceData): DataPoint[] {
  const rand = seededRandom(parseInt(appliance.id) * 17)
  const baseHourly = appliance.dailyUsage / 24
  return Array.from({ length: 24 }, (_, i) => {
    const hour = i
    const label =
      hour === 0
        ? "12 AM"
        : hour < 12
          ? `${hour} AM`
          : hour === 12
            ? "12 PM"
            : `${hour - 12} PM`
    // Simulate higher usage during peak hours (6-9 AM, 5-10 PM)
    const isPeak = (hour >= 6 && hour <= 9) || (hour >= 17 && hour <= 22)
    const multiplier = isPeak ? 1.4 + rand() * 0.8 : 0.3 + rand() * 0.6
    return {
      label,
      usage: parseFloat((baseHourly * multiplier).toFixed(2)),
    }
  })
}

export function generateMonthlyData(appliance: ApplianceData): DataPoint[] {
  const rand = seededRandom(parseInt(appliance.id) * 31)
  const baseDailyUsage = appliance.dailyUsage
  return Array.from({ length: 30 }, (_, i) => ({
    label: `Day ${i + 1}`,
    usage: parseFloat((baseDailyUsage * (0.7 + rand() * 0.6)).toFixed(1)),
  }))
}

export function generateYearlyData(appliance: ApplianceData): DataPoint[] {
  const rand = seededRandom(parseInt(appliance.id) * 53)
  const baseMonthlyUsage = appliance.dailyUsage * 30
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ]
  // Seasonal variation: higher in summer/winter, lower in spring/autumn
  const seasonal = [0.9, 0.85, 0.8, 0.75, 0.85, 1.1, 1.3, 1.35, 1.15, 0.9, 0.85, 0.95]
  return months.map((month, i) => ({
    label: month,
    usage: parseFloat((baseMonthlyUsage * seasonal[i] * (0.85 + rand() * 0.3)).toFixed(0)),
  }))
}

export function computeStats(data: DataPoint[]) {
  const total = data.reduce((sum, d) => sum + d.usage, 0)
  const avg = total / data.length
  const peak = Math.max(...data.map((d) => d.usage))
  const cost = total * RATE_PER_KWH
  return {
    total: total.toFixed(1),
    avg: avg.toFixed(2),
    peak: peak.toFixed(2),
    cost: cost.toFixed(2),
  }
}
