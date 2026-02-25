import { reservationsToday, type Reservation } from "@/lib/mock/serviceToday"
import { upcomingGroupsMock, type UpcomingGroup } from "@/lib/mock/groupsUpcoming"
import { breakfastTomorrowMock, type BreakfastTomorrow } from "@/lib/mock/breakfastTomorrow"
import { supplierTasksMock, type SupplierTask } from "@/lib/mock/suppliers"
import { topDishesLastNightMock, type DishCount } from "@/lib/mock/lastNight"

export type MorningBriefData = {
    dateISO: string
    reservations: Reservation[]
    upcomingGroups: UpcomingGroup[]
    breakfastTomorrow: BreakfastTomorrow
    supplierTasks: SupplierTask[]
    lastNight: DishCount[]
}

type Options = {
    delayMs?: number
}

/**
 * Mock API that simulates a backend call.
 * Replace the internals with real fetch() later.
 */
export async function getMorningBrief(dateISO: string, opts: Options = {}): Promise<MorningBriefData> {
    const delayMs = opts.delayMs ?? 250

    // Simulate network latency
    await new Promise((r) => setTimeout(r, delayMs))

    // Return clones (so UI state updates don't mutate the mocks)
    return {
        dateISO,
        reservations: structuredClone(reservationsToday),
        upcomingGroups: structuredClone(upcomingGroupsMock),
        breakfastTomorrow: structuredClone(breakfastTomorrowMock),
        supplierTasks: structuredClone(supplierTasksMock),
        lastNight: structuredClone(topDishesLastNightMock),
    }
}