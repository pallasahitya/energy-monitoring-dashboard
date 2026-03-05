import { notFound } from "next/navigation"
import { getApplianceById } from "@/lib/appliance-detail-data"
import { ApplianceDetailClient } from "@/components/appliance-detail-client"

export default async function ApplianceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const appliance = getApplianceById(id)

  if (!appliance) {
    notFound()
  }

  return <ApplianceDetailClient appliance={appliance} />
}
