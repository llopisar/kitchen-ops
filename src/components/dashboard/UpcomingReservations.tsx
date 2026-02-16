import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type Reservation = {
    time: string
    name: string
    pax: number
    tag?: { label: string; tone: "green" | "red" | "amber" }
}

const items: Reservation[] = [
    { time: "19:15", name: "Pérez", pax: 4, tag: { label: "Vegano", tone: "green" } },
    { time: "19:30", name: "Silva", pax: 6, tag: { label: "Cumpleaños", tone: "red" } },
    { time: "19:50", name: "Lopes", pax: 2, tag: { label: "Sin Gluten", tone: "green" } },
]

function tagClass(tag: Reservation["tag"]) {
    if (!tag) return ""
    if (tag.tone === "red") return "bg-red-600/90 text-white"
    if (tag.tone === "amber") return "bg-amber-500/90 text-black"
    return "bg-emerald-600/90 text-white"
}


export function UpcomingReservations() {
    return (
        <Card className="border-zinc-800 bg-zinc-900/60 text-zinc-100">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base">Reservas Próximas</CardTitle>
                <a className="text-xs text-zinc-400 hover:text-zinc-200" href="#">
                    Ver todas
                </a>
            </CardHeader>

            <CardContent className="space-y-2">
                {items.map((r) => (
                    <div
                        key={`${r.time}-${r.name}`}
                        className={cn(
                            "flex items-center justify-between gap-3 rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-2"
                        )}
                    >
                        <div className="flex min-w-0 items-center gap-3">
                            {/* “estado” circulito */}
                            <span className="h-3 w-3 shrink-0 rounded-full bg-emerald-500/80" />

                            <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">{r.time}</span>
                                    <span className="truncate text-zinc-200">
                                        {r.name} <span className="text-zinc-400">({r.pax})</span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        {r.tag && (
                            <Badge className={tagClass(r.tag)}>
                                {r.tag.label}
                            </Badge>
                        )}
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
