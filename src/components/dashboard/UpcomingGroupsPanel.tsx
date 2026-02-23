import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { UpcomingGroup } from "@/lib/mock/groupsUpcoming"

type Props = {
    items: UpcomingGroup[]
    limit?: number
}

function formatDateShort(dateISO: string) {
    const [y, m, d] = dateISO.split("-")
    return `${d}/${m}`
}

export function UpcomingGroupsPanel({ items, limit = 4 }: Props) {
    const visible = items.slice(0, limit)

    return (
        <Card className="bg-zinc-950/35 ring-1 ring-white/10 backdrop-blur-xl text-zinc-100 h-full flex flex-col min-h-0 pr-2">
            <CardHeader className="pb-2 shrink-0">
                <CardTitle className="text-[15px] font-semibold tracking-tight">
                    Upcoming groups
                </CardTitle>
            </CardHeader>

            {/* scroll interno si hace falta */}
            <CardContent className="flex-1 min-h-0 overflow-auto space-y-2 pr-1">
                {visible.map((g) => (
                    <div
                        key={g.id}
                        className="rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-1.5"
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-zinc-300">{formatDateShort(g.dateISO)}</span>
                            <span className="text-sm font-medium">{g.time}</span>
                            <span className="text-sm text-zinc-400">{g.pax} pax</span>
                        </div>

                        <div className="mt-1 flex flex-wrap items-center gap-2">
                            {g.label && <Badge className="bg-zinc-700 text-zinc-100">{g.label}</Badge>}
                            {(g.allergiesCount ?? 0) > 0 && (
                                <Badge className="bg-red-600 text-white">Allergy</Badge>
                            )}
                            {g.notes && (
                                <span className="text-xs text-zinc-400 line-clamp-1">
                                    {g.notes}
                                </span>
                            )}
                        </div>
                    </div>
                ))}

                {visible.length === 0 && (
                    <div className="rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-4 text-sm text-zinc-400">
                        No upcoming groups.
                    </div>
                )}
            </CardContent>
        </Card>
    )
}