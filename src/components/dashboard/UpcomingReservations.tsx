import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Reservation } from "@/lib/mock/serviceToday"

type Props = {
    reservations: Reservation[]
}

export function UpcomingReservations({ reservations }: Props) {
    const visible = reservations.slice(0, 6)

    return (
        <Card className="border-zinc-800 bg-zinc-900/60 text-zinc-100">
            <CardHeader className="pb-2">
                <CardTitle className="text-base">Reservas Próximas</CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">
                {visible.map((r) => (
                    <div
                        key={r.id}
                        className="flex items-center justify-between gap-3 rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-1.5"
                    >
                        <div className="min-w-0">
                            <div className="flex items-center gap-2">
                                <span className="font-medium">{r.time}</span>
                                <span className="truncate text-zinc-200">
                                    {r.name} <span className="text-zinc-400">({r.covers})</span>
                                </span>
                            </div>
                        </div>

                        {r.allergies.length > 0 && (
                            <Badge className="bg-red-600 text-white">Alergia</Badge>
                        )}
                    </div>
                ))}

                {visible.length === 0 && (
                    <div className="rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-4 text-sm text-zinc-400">
                        Sin reservas próximas.
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
