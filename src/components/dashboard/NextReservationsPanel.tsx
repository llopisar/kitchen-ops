import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Reservation } from "@/lib/mock/serviceToday"

type Props = {
    lunch: Reservation[]
    dinner: Reservation[]
    limit?: number
}

function hasAllergy(r: Reservation) {
    return !!(r.allergies && r.allergies.length > 0)
}

function hasNote(r: Reservation) {
    return !!(r.notes && r.notes.trim().length > 0)
}

function Row({ r }: { r: Reservation }) {
    return (
        <div className="grid grid-cols-[1fr_auto] items-start gap-3 rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-1.5">
            {/* Left */}
            <div className="min-w-0">
                <div className="flex items-baseline gap-2">
                    <span className="shrink-0 font-medium text-zinc-100">{r.time}</span>
                    <span className="shrink-0 text-sm text-zinc-400">{r.covers} pax</span>

                    {hasNote(r) && (
                        <span className="min-w-0 truncate text-sm text-zinc-300">
                            — {r.notes}
                        </span>
                    )}
                </div>

                {r.tags?.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-2">
                        {r.tags.slice(0, 1).map((t) => (
                            <span key={t} className="text-xs text-zinc-500">
                                {t}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Right (fixed) */}
            <div className="flex items-center gap-2 pt-[1px]">
                {hasAllergy(r) && <Badge className="bg-red-600 text-white px-1">A</Badge>}
            </div>
        </div>
    )
}

export function NextReservationsPanel({ lunch, dinner, limit = 3 }: Props) {
    const lunchVisible = lunch.slice(0, limit)
    const dinnerVisible = dinner.slice(0, limit)

    return (
        <Card className="bg-zinc-950/35 ring-1 ring-white/10 backdrop-blur-xl text-zinc-100 h-full flex flex-col min-h-0 pr-2">
            <CardHeader className="pb-2 shrink-0">
                <CardTitle className="text-[15px] font-semibold tracking-tight">
                    Next reservations
                </CardTitle>
            </CardHeader>

            {/* Scroll interno para no empujar Row 3 */}
            <CardContent className="flex-1 min-h-0 overflow-auto space-y-3 pr-1">
                {/* Lunch */}
                <section>
                    <div className="mb-2 flex items-center justify-between">
                        <div className="text-xs text-zinc-400">Lunch</div>
                        <div className="text-xs text-zinc-500">12:00–15:00</div>
                    </div>

                    <div className="space-y-2">
                        {lunchVisible.map((r) => (
                            <Row key={r.id} r={r} />
                        ))}

                        {lunchVisible.length === 0 && (
                            <div className="rounded-lg bg-white/5 ring-1 ring-white/10 px-3 py-3 text-sm text-zinc-400">
                                No upcoming lunch reservations.
                            </div>
                        )}
                    </div>
                </section>

                {/* Dinner */}
                <section>
                    <div className="mb-2 flex items-center justify-between">
                        <div className="text-xs text-zinc-400">Dinner</div>
                        <div className="text-xs text-zinc-500">19:00–22:30</div>
                    </div>

                    <div className="space-y-2">
                        {dinnerVisible.map((r) => (
                            <Row key={r.id} r={r} />
                        ))}

                        {dinnerVisible.length === 0 && (
                            <div className="rounded-lg bg-white/5 ring-1 ring-white/10 px-3 py-3 text-sm text-zinc-400">
                                No upcoming dinner reservations.
                            </div>
                        )}
                    </div>
                </section>
            </CardContent>
        </Card>
    )
}