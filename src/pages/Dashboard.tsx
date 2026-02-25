import { AppShell } from "@/components/layout/AppShell"
import { KpiCard } from "@/components/dashboard/KpiCard"

import { NextReservationsPanel } from "@/components/dashboard/NextReservationsPanel"
import { UpcomingGroupsPanel } from "@/components/dashboard/UpcomingGroupsPanel"
import { BreakfastTomorrowPanel } from "@/components/dashboard/BreakfastTomorrowPanel"
import { OpsPanel } from "@/components/dashboard/OpsPanel"

import { useMorningBrief } from "@/hooks/useMorningBrief"

export default function Dashboard() {
    const {
        loading,
        error,
        refresh,

        headerDate,

        coversToday,
        tables8PlusCount,
        tables8PlusPax,

        breakfastTomorrow,
        upcomingGroups,
        lunchNext,
        dinnerNext,

        supplierTasks,
        updateSupplierStatus,

        lastNight,

        nextGroupValue,
        nextGroupSubtitle,
    } = useMorningBrief()

    // You can keep this minimal or remove it later
    if (loading && !breakfastTomorrow) {
        return (
            <AppShell>
                <div className="h-full grid place-items-center text-sm text-zinc-400">
                    Loading…
                </div>
            </AppShell>
        )
    }

    if (error) {
        return (
            <AppShell>
                <div className="h-full grid place-items-center">
                    <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-4 text-sm text-zinc-300">
                        <div className="font-medium text-zinc-100">Couldn’t load data</div>
                        <div className="mt-1 text-zinc-400">{error}</div>
                        <button
                            onClick={refresh}
                            className="mt-3 rounded-md border border-zinc-700 px-3 py-1.5 text-xs text-zinc-200 hover:border-zinc-500"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </AppShell>
        )
    }

    // breakfastTomorrow can be null briefly; guard for safety
    if (!breakfastTomorrow) return null

    return (
        <AppShell>
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
                        <div className="mt-1 text-sm text-zinc-400">{headerDate}</div>
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
                        value={breakfastTomorrow.totalPax}
                        subtitle="Total pax"
                    />

                    <KpiCard title="Next group" value={nextGroupValue} subtitle={nextGroupSubtitle} />
                </div>

                {/* Rows 2 + 3 area (fills remaining height) */}
                <div className="mt-4 flex-1 min-h-0 flex flex-col gap-4">
                    {/* Row 2: Planning */}
                    <div className="grid gap-4 md:grid-cols-5 items-stretch min-h-0">
                        <div className="md:col-span-2 min-w-0 min-h-0">
                            <UpcomingGroupsPanel items={upcomingGroups} limit={4} />
                        </div>

                        <div className="md:col-span-2 min-w-0 min-h-0">
                            <BreakfastTomorrowPanel data={breakfastTomorrow} />
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
                            lastNight={lastNight}
                            defaultTab="suppliers"
                        />
                    </div>
                </div>
            </div>
        </AppShell>
    )
}