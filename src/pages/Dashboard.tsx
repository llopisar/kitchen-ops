import { AppShell } from "@/components/layout/AppShell"
import { KpiCard } from "@/components/dashboard/KpiCard"
import { Badge } from "@/components/ui/badge"
import { LoadByHourChart } from "@/components/dashboard/LoadByHourChart"
import { AlertsPanel } from "@/components/dashboard/AlertsPanel"
import { UpcomingReservations } from "@/components/dashboard/UpcomingReservations"
import { PrepSuggested } from "@/components/dashboard/PrepSuggested"
import { MessagesPanel } from "@/components/dashboard/MessagesPanel"




export default function Dashboard() {
    return (
        <AppShell>
            {/* KPIs */}
            <div className="grid gap-4 md:grid-cols-4">
                <KpiCard title="Reservas Hoy" value={72} subtitle="Cubiertos" />
                <KpiCard title="Próximo Pico" value="20:00" />
                <KpiCard title="Grupos Grandes" value={3} subtitle="Eventos" />
                <KpiCard
                    title="Alertas Críticas"
                    value={2}
                    variant="danger"
                    right={<Badge className="bg-red-600 text-white">¡ATENCIÓN!</Badge>}
                />
            </div>

            {/* Main grid */}
            <div className="mt-4 grid gap-4 md:grid-cols-3">
                <div className="md:col-span-2">
                    <LoadByHourChart />
                </div>
                <div className="md:col-span-1">
                    <AlertsPanel />
                </div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
                <UpcomingReservations />
                <PrepSuggested />
            </div>

            <div className="mt-4">
                <MessagesPanel />
            </div>


        </AppShell>
    )
}
