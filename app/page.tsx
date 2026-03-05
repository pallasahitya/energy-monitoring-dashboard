import { DashboardHeader } from "@/components/dashboard-header"
import { LivePowerCard } from "@/components/live-power-card"
import { StatsCards } from "@/components/stats-cards"
import { EnergyUsageChart } from "@/components/energy-usage-chart"
import { ApplianceTable } from "@/components/appliance-table"
import { CostEstimation } from "@/components/cost-estimation"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          <DashboardHeader />

          {/* Top row: Live power + stats */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <LivePowerCard />
            <StatsCards />
          </div>

          {/* Middle row: Chart + Cost */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <EnergyUsageChart />
            </div>
            <CostEstimation />
          </div>

          {/* Bottom: Appliance table */}
          <ApplianceTable />
        </div>
      </div>
    </div>
  )
}
