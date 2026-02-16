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
                "bg-zinc-900/80 text-zinc-100 backdrop-blur",
                variant === "danger" &&
                "border-red-500/40 bg-gradient-to-r from-red-600/30 to-red-500/20"
            )}
        >
            <CardContent className="flex items-center justify-between p-4">
                <div>
                    <div className="text-sm text-zinc-400">{title}</div>
                    <div className="mt-1 text-3xl font-semibold">{value}</div>
                    {subtitle && (
                        <div className="mt-1 text-xs text-zinc-400">{subtitle}</div>
                    )}
                </div>

                {right && <div>{right}</div>}
            </CardContent>
        </Card>
    )
}
