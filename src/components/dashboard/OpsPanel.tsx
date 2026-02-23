import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { SupplierTask, SupplierTaskStatus } from "@/lib/mock/suppliers"
import type { DishCount } from "@/lib/mock/lastNight"

type Tab = "suppliers" | "lastNight"

type Props = {
    tasks: SupplierTask[]
    lastNight: DishCount[]
    onUpdateStatus?: (id: string, status: SupplierTaskStatus) => void
    defaultTab?: Tab
}

function statusBadge(status: SupplierTaskStatus) {
    if (status === "ordered") return { label: "Ordered", cls: "bg-emerald-600 text-white" }
    if (status === "contacted") return { label: "Contacted", cls: "bg-zinc-700 text-zinc-100" }
    return { label: "Pending", cls: "bg-amber-500 text-black" }
}

function stationBadge(station?: DishCount["station"]) {
    if (!station) return null
    return <Badge className="bg-zinc-700 text-zinc-100">{station}</Badge>
}

function toISODate(d: Date) {
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, "0")
    const dd = String(d.getDate()).padStart(2, "0")
    return `${yyyy}-${mm}-${dd}`
}

export function OpsPanel({
    tasks,
    lastNight,
    onUpdateStatus,
    defaultTab = "suppliers",
}: Props) {
    const [tab, setTab] = useState<Tab>(defaultTab)

    const { todayISO, tomorrowISO } = useMemo(() => {
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)
        return { todayISO: toISODate(today), tomorrowISO: toISODate(tomorrow) }
    }, [])

    // For suppliers we keep the “tomorrow” mental model for morning brief
    const supplierVisible = useMemo(() => {
        return tasks.filter((t) => t.nextDueISO === tomorrowISO).slice(0, 6)
    }, [tasks, tomorrowISO])

    const lastNightVisible = useMemo(() => lastNight.slice(0, 6), [lastNight])

    return (
        <Card className="bg-zinc-950/35 ring-1 ring-white/10 backdrop-blur-xl text-zinc-100 h-full flex flex-col min-h-0">
            <CardHeader className="pb-2 shrink-0 flex flex-row items-center justify-between">
                <div className="min-w-0">
                    <CardTitle className="text-[15px] font-semibold tracking-tight">Ops</CardTitle>
                    <div className="text-xs text-zinc-500 mt-0.5">
                        Suppliers due {tomorrowISO} · Last night summary
                    </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                    <button
                        onClick={() => setTab("suppliers")}
                        className={cn(
                            "rounded-md border px-2 py-1 text-xs",
                            tab === "suppliers"
                                ? "border-zinc-500 text-zinc-100"
                                : "border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                        )}
                    >
                        Suppliers
                    </button>
                    <button
                        onClick={() => setTab("lastNight")}
                        className={cn(
                            "rounded-md border px-2 py-1 text-xs",
                            tab === "lastNight"
                                ? "border-zinc-500 text-zinc-100"
                                : "border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                        )}
                    >
                        Last night
                    </button>
                </div>
            </CardHeader>

            {/* Scroll interno */}
            <CardContent className="flex-1 min-h-0 overflow-auto space-y-2 pr-1">
                {tab === "suppliers" && (
                    <>
                        {supplierVisible.map((t) => {
                            const b = statusBadge(t.status)
                            return (
                                <div
                                    key={t.id}
                                    className="flex items-start justify-between gap-3 rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-1.5"
                                >
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2">
                                            <div className="truncate font-medium">{t.supplierName}</div>
                                            <span className="text-xs text-zinc-500">{t.category}</span>
                                            <span className="text-xs text-zinc-600">· due {t.nextDueISO}</span>
                                        </div>

                                        {t.notes && (
                                            <div className="mt-1 text-xs text-zinc-400 line-clamp-2">{t.notes}</div>
                                        )}
                                    </div>

                                    <div className="flex shrink-0 items-center gap-2">
                                        <Badge className={b.cls}>{b.label}</Badge>

                                        {onUpdateStatus && (
                                            <div className="flex items-center gap-2">
                                                {t.status === "pending" && (
                                                    <button
                                                        onClick={() => onUpdateStatus(t.id, "contacted")}
                                                        className="rounded-md border border-zinc-700 px-2 py-1 text-xs"
                                                    >
                                                        OK
                                                    </button>
                                                )}
                                                {t.status !== "ordered" && (
                                                    <button
                                                        onClick={() => onUpdateStatus(t.id, "ordered")}
                                                        className="rounded-md border border-zinc-700 px-2 py-1 text-xs text-zinc-400 hover:text-zinc-200"
                                                    >
                                                        Mark ordered
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        })}

                        {supplierVisible.length === 0 && (
                            <div className="rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-4 text-sm text-zinc-400">
                                No supplier tasks for tomorrow.
                            </div>
                        )}
                    </>
                )}

                {tab === "lastNight" && (
                    <>
                        {lastNightVisible.map((d) => (
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

                        {lastNightVisible.length === 0 && (
                            <div className="rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-4 text-sm text-zinc-400">
                                No data from last night.
                            </div>
                        )}
                    </>
                )}
            </CardContent>
        </Card>
    )
}