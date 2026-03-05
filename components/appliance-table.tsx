"use client"

import Link from "next/link"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { appliances, RATE_PER_KWH } from "@/lib/energy-data"

function StatusBadge({ status }: { status: "on" | "off" | "standby" }) {
  if (status === "on") {
    return (
      <Badge className="bg-primary/15 text-primary border-primary/25 hover:bg-primary/20">
        On
      </Badge>
    )
  }
  if (status === "standby") {
    return (
      <Badge variant="outline" className="text-chart-3 border-chart-3/25">
        Standby
      </Badge>
    )
  }
  return (
    <Badge variant="outline" className="text-muted-foreground border-muted">
      Off
    </Badge>
  )
}

export function ApplianceTable() {
  const maxPower = Math.max(...appliances.map((a) => a.power))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appliances</CardTitle>
        <CardDescription>
          {appliances.filter((a) => a.status === "on").length} of {appliances.length} currently active
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Appliance</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Power</TableHead>
              <TableHead className="hidden sm:table-cell">Load</TableHead>
              <TableHead className="text-right">Daily kWh</TableHead>
              <TableHead className="text-right hidden md:table-cell">Daily Cost</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appliances.map((appliance) => (
              <TableRow key={appliance.id} className="cursor-pointer transition-colors hover:bg-accent/50">
                <TableCell>
                  <Link href={`/appliance/${appliance.id}`} className="flex flex-col">
                    <span className="font-medium text-foreground">{appliance.name}</span>
                    <span className="text-xs text-muted-foreground">{appliance.category}</span>
                  </Link>
                </TableCell>
                <TableCell>
                  <StatusBadge status={appliance.status} />
                </TableCell>
                <TableCell className="text-right font-mono text-sm text-foreground">
                  {appliance.status === "off" ? (
                    <span className="text-muted-foreground">--</span>
                  ) : (
                    `${appliance.power.toLocaleString()} W`
                  )}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <div className="flex items-center gap-2">
                    <Progress
                      value={appliance.status === "off" ? 0 : (appliance.power / maxPower) * 100}
                      className="h-1.5 w-16"
                    />
                    <span className="text-xs text-muted-foreground font-mono">
                      {appliance.status === "off" ? "0" : Math.round((appliance.power / maxPower) * 100)}%
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-mono text-sm text-foreground">
                  {appliance.dailyUsage.toFixed(1)}
                </TableCell>
                <TableCell className="text-right font-mono text-sm text-foreground hidden md:table-cell">
                  {"\u20B9"}{(appliance.dailyUsage * RATE_PER_KWH).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
