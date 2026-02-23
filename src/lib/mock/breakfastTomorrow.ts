export type BreakfastSlot = {
    time: string // "07:00"
    pax: number
    hasGroup?: boolean
}

export type BreakfastTomorrow = {
    dateISO: string
    totalPax: number
    groupsCount: number
    allergyCount: number
    slots: BreakfastSlot[]
}

export const breakfastTomorrowMock: BreakfastTomorrow = {
    dateISO: "2026-02-16",
    totalPax: 48,
    groupsCount: 1,
    allergyCount: 2,
    slots: [
        { time: "07:00", pax: 14, hasGroup: true },
        { time: "08:00", pax: 24 },
        { time: "09:00", pax: 10 },
    ],
}