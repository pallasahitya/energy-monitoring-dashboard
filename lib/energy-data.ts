// Simulated energy data for the dashboard

export interface ApplianceData {
  id: string
  name: string
  power: number
  status: "on" | "off" | "standby"
  dailyUsage: number
  category: string
}

export interface HourlyUsage {
  time: string
  consumption: number
  solar: number
}

export const appliances: ApplianceData[] = [
  { id: "1", name: "Central AC", power: 3500, status: "on", dailyUsage: 28.4, category: "Climate" },
  { id: "2", name: "Electric Vehicle Charger", power: 7200, status: "on", dailyUsage: 32.1, category: "Transport" },
  { id: "3", name: "Heat Pump", power: 2100, status: "standby", dailyUsage: 12.6, category: "Climate" },
  { id: "4", name: "Washer / Dryer", power: 1800, status: "off", dailyUsage: 3.2, category: "Laundry" },
  { id: "5", name: "Dishwasher", power: 1400, status: "on", dailyUsage: 2.8, category: "Kitchen" },
  { id: "6", name: "Refrigerator", power: 150, status: "on", dailyUsage: 3.6, category: "Kitchen" },
  { id: "7", name: "Oven / Range", power: 2400, status: "off", dailyUsage: 4.1, category: "Kitchen" },
  { id: "8", name: "Lighting (Total)", power: 320, status: "on", dailyUsage: 5.8, category: "General" },
  { id: "9", name: "Home Office", power: 280, status: "on", dailyUsage: 4.2, category: "Electronics" },
  { id: "10", name: "Entertainment System", power: 450, status: "standby", dailyUsage: 2.9, category: "Electronics" },
]

export const hourlyUsageData: HourlyUsage[] = [
  { time: "12 AM", consumption: 1.2, solar: 0 },
  { time: "1 AM", consumption: 0.9, solar: 0 },
  { time: "2 AM", consumption: 0.8, solar: 0 },
  { time: "3 AM", consumption: 0.7, solar: 0 },
  { time: "4 AM", consumption: 0.8, solar: 0 },
  { time: "5 AM", consumption: 1.1, solar: 0 },
  { time: "6 AM", consumption: 2.4, solar: 0.3 },
  { time: "7 AM", consumption: 3.8, solar: 1.2 },
  { time: "8 AM", consumption: 3.2, solar: 2.8 },
  { time: "9 AM", consumption: 2.6, solar: 4.1 },
  { time: "10 AM", consumption: 2.9, solar: 5.2 },
  { time: "11 AM", consumption: 3.1, solar: 5.8 },
  { time: "12 PM", consumption: 4.2, solar: 6.1 },
  { time: "1 PM", consumption: 4.5, solar: 5.9 },
  { time: "2 PM", consumption: 4.8, solar: 5.4 },
  { time: "3 PM", consumption: 5.1, solar: 4.6 },
  { time: "4 PM", consumption: 5.6, solar: 3.2 },
  { time: "5 PM", consumption: 6.2, solar: 1.8 },
  { time: "6 PM", consumption: 7.1, solar: 0.6 },
  { time: "7 PM", consumption: 6.8, solar: 0.1 },
  { time: "8 PM", consumption: 5.4, solar: 0 },
  { time: "9 PM", consumption: 4.1, solar: 0 },
  { time: "10 PM", consumption: 2.8, solar: 0 },
  { time: "11 PM", consumption: 1.6, solar: 0 },
]

export const RATE_PER_KWH = 0.14 // dollars per kWh
export const CURRENT_POWER_KW = 4.72 // simulated live reading
export const DAILY_TOTAL_KWH = 99.7
export const MONTHLY_ESTIMATE_KWH = 2842
export const SOLAR_GENERATED_KWH = 47.3
