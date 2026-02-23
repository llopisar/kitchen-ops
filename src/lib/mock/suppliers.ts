export type SupplierTaskStatus = "pending" | "contacted" | "ordered"

export type SupplierTask = {
    id: string
    supplierName: string
    category: "bread" | "fish" | "produce" | "meat" | "dairy" | "dry"
    scheduleDays: ("Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun")[]
    nextDueISO: string
    status: SupplierTaskStatus
    notes?: string
}

function toISODate(d: Date) {
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, "0")
    const dd = String(d.getDate()).padStart(2, "0")
    return `${yyyy}-${mm}-${dd}`
}

const today = new Date()
const todayISO = toISODate(new Date(today.getFullYear(), today.getMonth(), today.getDate()))

const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
const tomorrowISO = toISODate(tomorrow)

export const supplierTasksMock: SupplierTask[] = [
    {
        id: "sup_bakery",
        supplierName: "Bakery",
        category: "bread",
        scheduleDays: ["Mon", "Tue", "Thu"],
        nextDueISO: tomorrowISO, // ✅ mañana
        status: "pending",
        notes: "Sourdough + brioche buns",
    },
    {
        id: "sup_produce",
        supplierName: "Produce",
        category: "produce",
        scheduleDays: ["Mon", "Wed", "Fri"],
        nextDueISO: tomorrowISO, // ✅ mañana
        status: "contacted",
    },
    {
        id: "sup_fish",
        supplierName: "Fishmonger",
        category: "fish",
        scheduleDays: ["Wed"],
        nextDueISO: todayISO, // ✅ hoy
        status: "pending",
        notes: "Whole fish if available",
    },
    {
        id: "sup_dairy",
        supplierName: "Dairy",
        category: "dairy",
        scheduleDays: ["Fri"],
        nextDueISO: tomorrowISO, // ✅ mañana
        status: "pending",
    },
]