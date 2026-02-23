import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { SupplierTask, SupplierTaskStatus } from "@/lib/mock/suppliers"

type Props = {
    tasks: SupplierTask[]
    defaultView?: "tomorrow" | "today"
    onUpdateStatus?: (id: string, status: SupplierTaskStatus) => void
}

function statusBadge(status: SupplierTaskStatus) {
    if (status === "ordered") return { label: "Ordered", cls: "bg-emerald-600 text-white" }
    if (status === "contacted") return { label: "Contacted", cls: "bg-zinc-700 text-zinc-100" }
    return { label: "Pending", cls: "bg-amber-500 text-black" }
}

function toISODate(d: Date) {
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, "0")
    const dd = String(d.getDate()).padStart(2, "0")
    return `${yyyy}-${mm}-${dd}`
}

export function SupplierChecklist({
    tasks,
    defaultView = "tomorrow",
    onUpdateStatus,
}: Props) {
    const [view, setView] = useState<"tomorrow" | "today">(defaultView)

    const { todayISO, tomorrowISO } = useMemo(() => {
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)
        return { todayISO: toISODate(today), tomorrowISO: toISODate(tomorrow) }
    }, [])

    const targetISO = view === "tomorrow" ? tomorrowISO : todayISO

    const visible = useMemo(() => {
        return tasks.filter((t) => t.nextDueISO === targetISO).slice(0, 6)
    }, [tasks, targetISO])

    return (
        <Card className="bg-zinc-950/35 ring-1 ring-white/10 backdrop-blur-xl text-zinc-100 h-full flex flex-col min-h-0">
            <CardHeader className="flex flex-row items-center justify-between pb-2 shrink-0">
                <CardTitle className="text-[15px] font-semibold tracking-tight">
                    Supplier checklist
                </CardTitle>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setView("today")}
                        className={cn(
                            "rounded-md border px-2 py-1 text-xs",
                            view === "today"
                                ? "border-zinc-500 text-zinc-100"
                                : "border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                        )}
                    >
                        Today
                    </button>
                    <button
                        onClick={() => setView("tomorrow")}
                        className={cn(
                            "rounded-md border px-2 py-1 text-xs",
                            view === "tomorrow"
                                ? "border-zinc-500 text-zinc-100"
                                : "border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                        )}
                    >
                        Tomorrow
                    </button>
                </div>
            </CardHeader>

            {/* scroll interno */}
            <CardContent className="flex-1 min-h-0 overflow-auto space-y-2 pr-1">
                {visible.map((t) => {
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
                                </div>

                                {t.notes && (
                                    <div className="mt-1 text-xs text-zinc-400 line-clamp-2">
                                        {t.notes}
                                    </div>
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

                {visible.length === 0 && (
                    <div className="rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-4 text-sm text-zinc-400">
                        No supplier tasks for {view}.
                    </div>
                )}
            </CardContent>
        </Card>
    )
}