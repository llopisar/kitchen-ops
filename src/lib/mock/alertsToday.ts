export type Alert = {
    id: string
    createdAt: string // ISO
    severity: "info" | "warning" | "critical"
    status: "new" | "acknowledged" | "resolved"
    title: string
    message: string
    tableLabel?: string
}

export const alertsToday: Alert[] = [
    {
        id: "alt_01",
        createdAt: "2026-02-15T18:40:00Z",
        severity: "critical",
        status: "new",
        title: "Alergia a mariscos",
        message: "Mesa T12 — 1 persona. Confirmado por sala.",
        tableLabel: "T12",
    },
    {
        id: "alt_02",
        createdAt: "2026-02-15T19:05:00Z",
        severity: "warning",
        status: "new",
        title: "Mesa apura",
        message: "Mesa T5 apura platos (teatro a las 20:00).",
        tableLabel: "T5",
    },
]
