export type FloorMessage = {
    id: string
    createdAt: string // ISO
    tableLabel?: string
    kind: "allergy" | "rush" | "complaint" | "change"
    severity: "warning" | "critical"
    status: "new" | "acknowledged" | "resolved"
    text: string
}

export const messagesToday: FloorMessage[] = [
    {
        id: "msg_01",
        createdAt: "2026-02-15T19:05:00Z",
        tableLabel: "T3",
        kind: "allergy",
        severity: "critical",
        status: "new",
        text: "Alergia confirmada (sin mariscos).",
    },
    {
        id: "msg_02",
        createdAt: "2026-02-15T19:18:00Z",
        tableLabel: "T8",
        kind: "complaint",
        severity: "warning",
        status: "new",
        text: "Cliente consulta por plato muy salado.",
    },
]
