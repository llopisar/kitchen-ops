export type SupplierTask = {
    id: string
    supplierName: string
    category: "bread" | "fish" | "produce" | "meat" | "dairy" | "dry"
    schedule: string[] // ["Mon", "Tue", "Thu"]
    nextDue: string    // "2026-02-16"
    status: "pending" | "contacted" | "ordered"
    notes?: string
}

export const supplierTasks: SupplierTask[] = [
    { id: "sup_01", supplierName: "Bakery", category: "bread", schedule: ["Mon", "Tue", "Thu"], nextDue: "2026-02-16", status: "pending" },
    { id: "sup_02", supplierName: "Fishmonger", category: "fish", schedule: ["Wed"], nextDue: "2026-02-19", status: "pending", notes: "Whole fish if available" },
]