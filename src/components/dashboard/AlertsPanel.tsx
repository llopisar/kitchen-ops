import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type AlertItem = {
    id: string
    title: string
    meta?: string
    level: "critical" | "urgent" | "info"
}

const items: AlertItem[] = [
    { id: "#105", title: "Alergia a Mariscos", meta: "#105", level: "critical" },
    { id: "Mesa 5", title: "Apurar Platos", meta: "Mesa 5", level: "urgent" },
    { id: "#111", title: "Cambio de Pedido", meta: "#111", level: "info" },
]

function levelBadge(level: AlertItem["level"]) {
    if (level === "critical") return { label: "¡ATENCIÓN!", cls: "bg-red-600 text-white" }
    if (level === "urgent") return { label: "URGENTE!", cls: "bg-orange-500 text-white" }
    return { label: "Desvios", cls: "bg-zinc-700 text-zinc-100" }
}

export function AlertsPanel() {
    return (
        <Card className="border-zinc-800 bg-zinc-900/60 text-zinc-100">
            <CardHeader className="pb-2">
                <CardTitle className="text-base">Alertas</CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">
                {items.map((a) => {
                    const b = levelBadge(a.level)
                    return (
                        <div
                            key={a.id}
                            className={cn(
                                "flex items-center justify-between gap-3 rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-2"
                            )}
                        >
                            <div className="min-w-0">
                                <div className="truncate font-medium">{a.title}</div>
                                {a.meta && <div className="text-xs text-zinc-400">{a.meta}</div>}
                            </div>
                            <Badge className={b.cls}>{b.label}</Badge>
                        </div>
                    )
                })}
            </CardContent>
        </Card>
    )
}
