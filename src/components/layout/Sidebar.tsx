import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const nav = [
    { label: "Service", active: true },
    { label: "Groups & Events" },
    { label: "Planning" },
    { label: "Staff & Tasks" },
]

export function Sidebar({ className }: { className?: string }) {
    return (
        <aside
            className={cn(
                "h-full border-r bg-zinc-900 text-zinc-100 md:rounded-l-2xl",
                className
            )}
        >
            <div className="px-5 py-6">
                <div className="tracking-[0.25em] text-sm font-semibold">KITCHEN OPS</div>
            </div>

            <Separator className="bg-zinc-700/60" />

            <nav className="p-3">
                <div className="space-y-1">
                    {nav.map((item) => (
                        <button
                            key={item.label}
                            className={cn(
                                "w-full rounded-lg px-3 py-2 text-left text-sm transition",
                                item.active
                                    ? "bg-zinc-100/15 text-zinc-50"
                                    : "text-zinc-200 hover:bg-zinc-100/10"
                            )}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </nav>

            <div className="mt-auto p-4 text-xs text-zinc-400">
                <Separator className="mb-3 bg-zinc-700/60" />
                v0.1 • Kitchen Ops
            </div>
        </aside>
    )
}
