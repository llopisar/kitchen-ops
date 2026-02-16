import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type PrepItem = {
    name: string
    qty: number
    icon?: "fish" | "octo" | "dessert"
}

const items: PrepItem[] = [
    { name: "Bacalao à Brás", qty: 15, icon: "fish" },
    { name: "Polvo à Lagareiro", qty: 12, icon: "octo" },
    { name: "Pastel de Nata", qty: 20, icon: "dessert" },
]

function Icon({ kind }: { kind?: PrepItem["icon"] }) {
    const base = "inline-flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950/40 text-lg"
    if (kind === "octo") return <span className={base}>🐙</span>
    if (kind === "dessert") return <span className={base}>🥧</span>
    return <span className={base}>🐟</span>
}

export function PrepSuggested() {
    return (
        <Card className="border-zinc-800 bg-zinc-900/60 text-zinc-100">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base">Prep Sugerida Hoy</CardTitle>
                <div className="text-xs text-zinc-400">✓ Acknowledge</div>
            </CardHeader>

            <CardContent className="space-y-2">
                {items.map((p) => (
                    <div
                        key={p.name}
                        className={cn(
                            "flex items-center justify-between gap-3 rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-2"
                        )}
                    >
                        <div className="flex min-w-0 items-center gap-3">
                            <Icon kind={p.icon} />
                            <div className="min-w-0">
                                <div className="truncate font-medium">
                                    {p.name} <span className="text-zinc-400">x {p.qty}</span>
                                </div>
                            </div>
                        </div>

                        <Button variant="outline" className="h-9">
                            Acknowledge
                        </Button>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
