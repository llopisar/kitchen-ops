import { useState } from "react"
import { AppShell } from "@/components/layout/AppShell"
import { KpiCard } from "@/components/dashboard/KpiCard"

import { NextReservationsPanel } from "@/components/dashboard/NextReservationsPanel"
import { UpcomingGroupsPanel } from "@/components/dashboard/UpcomingGroupsPanel"
import { BreakfastTomorrowPanel } from "@/components/dashboard/BreakfastTomorrowPanel"

import { OpsPanel } from "@/components/dashboard/OpsPanel"

import { reservationsToday } from "@/lib/mock/serviceToday"
import {
    supplierTasksMock,
    type SupplierTask,
    type SupplierTaskStatus,
} from "@/lib/mock/suppliers"
import { topDishesLastNightMock } from "@/lib/mock/lastNight"
import { upcomingGroupsMock } from "@/lib/mock/groupsUpcoming"
import { breakfastTomorrowMock } from "@/lib/mock/breakfastTomorrow"

export default function Dashboard() {
    // --- helpers ---
    const toMinutes = (t: string) => {
        const [hh, mm] = t.split(":").map(Number)
        return hh * 60 + mm
    }

    // Hotel ranges
    const LUNCH_START = 12 * 60
    const LUNCH_END = 15 * 60
    const DINNER_START = 19 * 60
    const DINNER_END = 22 * 60 + 30

    // --- KPIs ---
    const coversToday = reservationsToday.reduce((sum, r) => sum + r.covers, 0)

    const tables8Plus = reservationsToday.filter((r) => r.covers >= 8)
    const tables8PlusCount = tables8Plus.length
    const tables8PlusPax = tables8Plus.reduce((sum, r) => sum + r.covers, 0)

    // --- Next reservations (Lunch/Dinner) ---
    const sorted = [...reservationsToday].sort((a, b) => a.time.localeCompare(b.time))

    const lunchNext = sorted.filter((r) => {
        const m = toMinutes(r.time)
        return m >= LUNCH_START && m <= LUNCH_END
    })

    const dinnerNext = sorted.filter((r) => {
        const m = toMinutes(r.time)
        return m >= DINNER_START && m <= DINNER_END
    })

    // --- Supplier tasks state ---
    const [supplierTasks, setSupplierTasks] = useState<SupplierTask[]>(supplierTasksMock)

    const updateSupplierStatus = (id: string, status: SupplierTaskStatus) => {
        setSupplierTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)))
    }

    // --- KPI NEXT GROUP ---
    const nextGroup = [...upcomingGroupsMock].sort((a, b) =>
        `${a.dateISO} ${a.time}`.localeCompare(`${b.dateISO} ${b.time}`)
    )[0]

    const formatDayTime = (dateISO?: string, time?: string) => {
        if (!dateISO || !time) return "—"
        const d = new Date(`${dateISO}T00:00:00`)
        const day = d.toLocaleDateString(undefined, { weekday: "short" })
        return `${day} ${time}`
    }

    const formatShortDate = (dateISO?: string) => {
        if (!dateISO) return ""
        const d = new Date(`${dateISO}T00:00:00`)
        return d.toLocaleDateString(undefined, { day: "2-digit", month: "2-digit" })
    }

    const nextGroupValue = nextGroup ? formatDayTime(nextGroup.dateISO, nextGroup.time) : "—"
    const nextGroupSubtitle = nextGroup
        ? `${formatShortDate(nextGroup.dateISO)} · ${nextGroup.pax} pax`
        : "No upcoming groups"

    // --- Header date ---
    const today = new Date()
    const formattedDate = today.toLocaleDateString(undefined, {
        weekday: "long",
        day: "2-digit",
        month: "long",
    })
    const formattedDateCap = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)

    return (
        <AppShell>
            {/* Whole dashboard fixed to viewport */}
            <div className="h-full min-h-0 flex flex-col">
                {/* ===== Premium Header ===== */}
                <div className="shrink-0 mb-4 flex items-start justify-between">
                    <div>
                        <div className="text-xs font-medium text-zinc-500 tracking-[0.14em] uppercase">
                            Kitchen Ops
                        </div>
                        <h1 className="text-2xl font-semibold tracking-tight text-zinc-100">
                            Morning Brief
                        </h1>
                        <div className="mt-1 text-sm text-zinc-400">{formattedDateCap}</div>
                    </div>

                    <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-2 ring-1 ring-white/10">
                        <div className="grid h-7 w-7 place-items-center rounded-full bg-white/10 ring-1 ring-white/10">
                            <span className="text-xs font-semibold tracking-tight text-zinc-100">KO</span>
                        </div>
                        <div className="leading-tight">
                            <div className="text-sm text-zinc-200">Hotel Restaurant</div>
                            <div className="text-xs text-zinc-500">Kitchen</div>
                        </div>
                    </div>
                </div>

                {/* Row 1: KPIs */}
                <div className="shrink-0 grid gap-3 md:grid-cols-4">
                    <KpiCard title="Covers today" value={coversToday} subtitle="Total pax" />

                    <KpiCard
                        title="Tables 8+"
                        value={tables8PlusCount}
                        subtitle={`${tables8PlusPax} pax total`}
                    />

                    <KpiCard
                        title="Breakfast tomorrow"
                        value={breakfastTomorrowMock.totalPax}
                        subtitle="Total pax"
                    />

                    <KpiCard title="Next group" value={nextGroupValue} subtitle={nextGroupSubtitle} />
                </div>

                {/* Rows 2 + 3 area (fills remaining height) */}
                <div className="mt-4 flex-1 min-h-0 flex flex-col gap-4">
                    {/* Row 2: Planning */}
                    <div className="grid gap-4 md:grid-cols-5 items-stretch min-h-0">
                        <div className="md:col-span-2 min-w-0 min-h-0">
                            <UpcomingGroupsPanel items={upcomingGroupsMock} limit={4} />
                        </div>

                        <div className="md:col-span-2 min-w-0 min-h-0">
                            <BreakfastTomorrowPanel data={breakfastTomorrowMock} />
                        </div>

                        <div className="md:col-span-1 min-w-0 min-h-0">
                            <NextReservationsPanel lunch={lunchNext} dinner={dinnerNext} limit={3} />
                        </div>
                    </div>

                    {/* Row 3: Ops (tabs) */}
                    <div className="min-h-0">
                        <OpsPanel
                            tasks={supplierTasks}
                            onUpdateStatus={updateSupplierStatus}
                            lastNight={topDishesLastNightMock}
                            defaultTab="suppliers"
                        />
                    </div>
                </div>
            </div>
        </AppShell>
    )
}