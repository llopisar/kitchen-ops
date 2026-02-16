import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Message = {
    id: string
    text: string
    level: "critical" | "warning"
}

const messages: Message[] = [
    { id: "1", text: "Mesa 3 Alergia Confirmada!", level: "critical" },
    { id: "2", text: "Mesa 8 Reclamo Chef", level: "warning" },
]

function icon(level: Message["level"]) {
    if (level === "critical") return "❗"
    return "⚠️"
}

function tone(level: Message["level"]) {
    if (level === "critical") return "text-red-400"
    return "text-amber-400"
}

export function MessagesPanel() {
    return (
        <Card className="border-zinc-800 bg-zinc-900/60 text-zinc-100">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base">Mensajes de Sala</CardTitle>
                <a href="#" className="text-xs text-zinc-400 hover:text-zinc-200">
                    Ver todos
                </a>
            </CardHeader>

            <CardContent className="space-y-2">
                {messages.map((m) => (
                    <div
                        key={m.id}
                        className={cn(
                            "flex items-center justify-between gap-3 rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-2"
                        )}
                    >
                        <div className="flex items-center gap-3 min-w-0">
                            <span className={cn("text-lg", tone(m.level))}>
                                {icon(m.level)}
                            </span>
                            <div className="truncate font-medium">{m.text}</div>
                        </div>

                        <Button variant="outline" className="h-8 text-xs">
                            Acknowledge
                        </Button>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
