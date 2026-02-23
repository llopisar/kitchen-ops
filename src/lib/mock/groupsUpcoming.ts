export type UpcomingGroup = {
    id: string
    dateISO: string // "2026-02-16"
    time: string // "20:00"
    pax: number
    label?: string // "Birthday", "Tour group"
    allergiesCount?: number
    notes?: string
}

export const upcomingGroupsMock: UpcomingGroup[] = [
    {
        id: "grp_01",
        dateISO: "2026-02-16",
        time: "20:00",
        pax: 12,
        label: "Birthday",
        allergiesCount: 1,
        notes: "Set menu confirmed",
    },
    {
        id: "grp_02",
        dateISO: "2026-02-18",
        time: "19:30",
        pax: 18,
        label: "Corporate",
        allergiesCount: 0,
    },
    {
        id: "grp_03",
        dateISO: "2026-02-20",
        time: "21:00",
        pax: 10,
        label: "Tour group",
        allergiesCount: 2,
    },
    {
        id: "grp_04",
        dateISO: "2026-04-20",
        time: "19:00",
        pax: 12,
        label: "Tour group",
        allergiesCount: 2,
    },
    {
        id: "grp_05",
        dateISO: "2026-02-20",
        time: "21:00",
        pax: 24,
        label: "Tour group",
        allergiesCount: 2,
    },
    {
        id: "grp_06",
        dateISO: "2026-03-20",
        time: "22:00",
        pax: 33,
        label: "Tour group",
        allergiesCount: 0,
    },
]