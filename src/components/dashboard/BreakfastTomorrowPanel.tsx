import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { BreakfastTomorrow } from "@/lib/mock/breakfastTomorrow"

type Props = {
    data: BreakfastTomorrow
}

function formatShortDate(dateISO?: string) {
    if (!dateISO) return ""
    const d = new Date(`${dateISO}T00:00:00`)
    return d.toLocaleDateString(undefined, { day: "2-digit", month: "2-digit" })
}

export function BreakfastTomorrowPanel({ data }: Props) {
    // Tablet-safe: menos items para evitar empujar el layout
    const visible = data.slots.slice(0, 2)

    return (
        <Card className="bg-zinc-950/35 ring-1 ring-white/10 backdrop-blur-xl text-zinc-100 h-full flex flex-col min-h-0">
            <CardHeader className="flex flex-row items-center justify-between pb-2 shrink-0">
                <CardTitle className="text-[15px] font-semibold tracking-tight">
                    Breakfast tomorrow
                </CardTitle>
                <span className="text-sm text-zinc-500">{formatShortDate(data.dateISO)}</span>
            </CardHeader>

            <CardContent className="flex-1 min-h-0 px-5 py-3">
                {/* Hero metric */}
                <div className="flex items-end justify-between gap-4">
                    <div>
                        <div className="text-sm text-zinc-500">Total</div>
                        <div className="mt-1 text-4xl font-semibold tracking-tight">
                            {data.totalPax}
                        </div>
                        <div className="mt-1 text-sm text-zinc-500">pax</div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Badge className="bg-white/10 text-zinc-100 hover:bg-white/10">
                            Groups {data.groupsCount}
                        </Badge>
                        <Badge className="bg-white/10 text-zinc-100 hover:bg-white/10">
                            Allergies {data.allergyCount}
                        </Badge>
                    </div>
                </div>

                {/* Divider */}
                <div className="mt-3 h-px w-full bg-white/10" />

                {/* Slots */}
                <div className="mt-3 space-y-2">
                    {visible.map((s) => (
                        <div
                            key={s.time}
                            className="flex items-center justify-between rounded-lg bg-white/5 ring-1 ring-white/10 px-3 py-1.5"
                        >
                            <div className="flex items-baseline gap-3">
                                <span className="text-sm font-medium text-zinc-100">{s.time}</span>
                                <span className="text-sm text-zinc-400">{s.pax} pax</span>
                            </div>

                            {s.hasGroup && (
                                <Badge className="bg-amber-500 text-black hover:bg-amber-500">
                                    Group
                                </Badge>
                            )}
                        </div>
                    ))}

                    {visible.length === 0 && (
                        <div className="rounded-lg bg-white/5 ring-1 ring-white/10 px-4 py-4 text-sm text-zinc-400">
                            No breakfast data.
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}