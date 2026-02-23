import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Alert } from "@/lib/mock/alertsToday"

type Props = {
    alerts: Alert[]
    onAcknowledge?: (id: string) => void
    onResolve?: (id: string) => void
}

function severityBadge(severity: Alert["severity"]) {
    if (severity === "critical")
        return { label: "CRITIC", cls: "bg-red-600 text-white" }

    if (severity === "warning")
        return { label: "URGENT", cls: "bg-orange-500 text-white" }

    return { label: "INFO", cls: "bg-zinc-700 text-zinc-100" }
}

export function AlertsPanel({ alerts, onAcknowledge, onResolve }: Props) {
    const visible = alerts.filter((a) => a.status !== "resolved").slice(0, 6)

    return (
        <Card className="border-zinc-800 bg-zinc-900/60 text-zinc-100">
            <CardHeader className="pb-2">
                <CardTitle className="text-base">Alerts</CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">
                {visible.map((a) => {
                    const badge = severityBadge(a.severity)

                    return (
                        <div
                            key={a.id}
                            className={cn(
                                "flex items-start justify-between gap-3 rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-1.5",
                                a.status === "acknowledged" && "opacity-70"
                            )}
                        >
                            <div className="min-w-0">
                                {/* meta row */}
                                <div className="flex items-center gap-2">
                                    <Badge className={badge.cls}>{badge.label}</Badge>
                                    {a.tableLabel && (
                                        <span className="text-xs text-zinc-400">{a.tableLabel}</span>
                                    )}
                                </div>

                                {/* title inline */}
                                <div className="mt-1 flex min-w-0 items-baseline gap-2">
                                    {a.tableLabel && (
                                        <span className="shrink-0 text-sm text-zinc-300">
                                            {a.tableLabel}
                                        </span>
                                    )}
                                    <span className="truncate text-sm font-medium text-zinc-100">
                                        {a.title}
                                    </span>
                                </div>

                                {/* message compact (max 2 lines) */}
                                <div className="mt-1 text-xs text-zinc-400 line-clamp-2">
                                    {a.message}
                                </div>
                            </div>

                            <div className="flex shrink-0 items-center gap-2">
                                {a.status === "new" && onAcknowledge && (
                                    <button
                                        onClick={() => onAcknowledge(a.id)}
                                        className="rounded-md border border-zinc-700 px-2 py-1 text-xs"
                                    >
                                        OK
                                    </button>
                                )}

                                {onResolve && (
                                    <button
                                        onClick={() => onResolve(a.id)}
                                        className="rounded-md border border-zinc-700 px-2 py-1 text-xs text-zinc-400"
                                    >
                                        Resolve
                                    </button>
                                )}
                            </div>
                        </div>
                    )
                })}
            </CardContent>
        </Card>
    )
}
