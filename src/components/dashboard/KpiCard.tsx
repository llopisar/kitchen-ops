import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

type KpiCardProps = {
    title: string
    value: string | number
    subtitle?: string
    right?: ReactNode
    variant?: "default" | "danger"
}

export function KpiCard({
    title,
    value,
    subtitle,
    right,
    variant = "default",
}: KpiCardProps) {
    return (
        <Card
            className={cn(
                "bg-zinc-950/35 text-zinc-100 ring-1 ring-white/10 backdrop-blur-xl border-none",
                variant === "danger" &&
                "ring-red-500/30 bg-red-950/20"
            )}
        >
            <CardContent className="flex items-center justify-between px-4 py-3">
                <div className="min-w-0">
                    <div className="text-sm text-zinc-400">{title}</div>
                    <div className="mt-1 text-3xl font-semibold tracking-tight">{value}</div>
                    {subtitle && (
                        <div className="mt-1 text-sm text-zinc-500">{subtitle}</div>
                    )}
                </div>

                {right && <div className="shrink-0">{right}</div>}
            </CardContent>
        </Card>
    )
}