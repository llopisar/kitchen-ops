import { useCallback, useEffect, useMemo, useState } from "react"
import { getMorningBrief, type MorningBriefData } from "@/lib/api/morningBrief"
import type { SupplierTask, SupplierTaskStatus } from "@/lib/mock/suppliers"

function toMinutes(t: string) {
    const [hh, mm] = t.split(":").map(Number)
    return hh * 60 + mm
}

function toISODate(d: Date) {
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, "0")
    const dd = String(d.getDate()).padStart(2, "0")
    return `${yyyy}-${mm}-${dd}`
}

export function useMorningBrief(dateISO?: string) {
    const resolvedDateISO = useMemo(() => {
        if (dateISO) return dateISO
        const now = new Date()
        return toISODate(new Date(now.getFullYear(), now.getMonth(), now.getDate()))
    }, [dateISO])

    const [data, setData] = useState<MorningBriefData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // UI state that will later map to PATCH calls
    const [supplierTasks, setSupplierTasks] = useState<SupplierTask[]>([])

    const refresh = useCallback(async () => {
        setLoading(true)
        setError(null)

        try {
            const res = await getMorningBrief(resolvedDateISO, { delayMs: 250 })
            setData(res)
            setSupplierTasks(res.supplierTasks)
        } catch (e) {
            setError(e instanceof Error ? e.message : "Failed to load morning brief")
        } finally {
            setLoading(false)
        }
    }, [resolvedDateISO])

    useEffect(() => {
        refresh()
    }, [refresh])

    const updateSupplierStatus = useCallback((id: string, status: SupplierTaskStatus) => {
        setSupplierTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)))
    }, [])

    // ---------- derived values (dashboard-ready) ----------
    const reservations = data?.reservations ?? []
    const upcomingGroups = data?.upcomingGroups ?? []
    const breakfastTomorrow = data?.breakfastTomorrow ?? null
    const lastNight = data?.lastNight ?? []

    const coversToday = useMemo(
        () => reservations.reduce((sum, r) => sum + r.covers, 0),
        [reservations]
    )

    const tables8Plus = useMemo(() => reservations.filter((r) => r.covers >= 8), [reservations])
    const tables8PlusCount = tables8Plus.length
    const tables8PlusPax = useMemo(() => tables8Plus.reduce((sum, r) => sum + r.covers, 0), [tables8Plus])

    // Hotel ranges
    const LUNCH_START = 12 * 60
    const LUNCH_END = 15 * 60
    const DINNER_START = 19 * 60
    const DINNER_END = 22 * 60 + 30

    const sortedReservations = useMemo(
        () => [...reservations].sort((a, b) => a.time.localeCompare(b.time)),
        [reservations]
    )

    const lunchNext = useMemo(
        () =>
            sortedReservations.filter((r) => {
                const m = toMinutes(r.time)
                return m >= LUNCH_START && m <= LUNCH_END
            }),
        [sortedReservations]
    )

    const dinnerNext = useMemo(
        () =>
            sortedReservations.filter((r) => {
                const m = toMinutes(r.time)
                return m >= DINNER_START && m <= DINNER_END
            }),
        [sortedReservations]
    )

    const nextGroup = useMemo(() => {
        return [...upcomingGroups].sort((a, b) =>
            `${a.dateISO} ${a.time}`.localeCompare(`${b.dateISO} ${b.time}`)
        )[0]
    }, [upcomingGroups])

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

    const headerDate = useMemo(() => {
        const d = new Date(`${resolvedDateISO}T00:00:00`)
        const formatted = d.toLocaleDateString(undefined, {
            weekday: "long",
            day: "2-digit",
            month: "long",
        })
        return formatted.charAt(0).toUpperCase() + formatted.slice(1)
    }, [resolvedDateISO])

    return {
        // raw-ish
        data,
        loading,
        error,
        refresh,

        // ready for UI
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
    }
}