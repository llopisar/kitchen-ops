import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { DishCount } from "@/lib/mock/lastNight"

type Props = {
    items: DishCount[]
}

function stationBadge(station?: DishCount["station"]) {
    if (!station) return null
    const map: Record<string, string> = {
        hot: "bg-zinc-700 text-zinc-100",
        grill: "bg-zinc-700 text-zinc-100",
        cold: "bg-zinc-700 text-zinc-100",
        pastry: "bg-zinc-700 text-zinc-100",
    }
    return <Badge className={map[station]}>{station}</Badge>
}

export function LastNightOrders({ items }: Props) {
    const visible = items.slice(0, 3)

    return (
        <Card className="bg-zinc-950/35 ring-1 ring-white/10 backdrop-blur-xl text-zinc-100">
            <CardHeader className="pb-2">
                <CardTitle className="text-[15px] font-semibold tracking-tight">Last night summary</CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">
                {visible.map((d) => (
                    <div
                        key={d.id}
                        className="flex items-center justify-between gap-3 rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-1.5"
                    >
                        <div className="min-w-0">
                            <div className="truncate font-medium">{d.name}</div>
                        </div>

                        <div className="flex shrink-0 items-center gap-2">
                            {stationBadge(d.station)}
                            <span className="text-sm text-zinc-200">{d.qty}x</span>
                        </div>
                    </div>
                ))}

                {visible.length === 0 && (
                    <div className="rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-4 text-sm text-zinc-400">
                        No data from last night.
                    </div>
                )}
            </CardContent>
        </Card>
    )
}