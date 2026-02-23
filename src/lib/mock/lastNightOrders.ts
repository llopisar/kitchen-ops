export type DishCount = {
    id: string
    name: string
    qty: number
    station?: "grill" | "cold" | "hot" | "pastry"
}

export const topDishesLastNight: DishCount[] = [
    { id: "d1", name: "Bacalhau à Brás", qty: 15, station: "hot" },
    { id: "d2", name: "Polvo à Lagareiro", qty: 12, station: "hot" },
    { id: "d3", name: "Pastel de Nata", qty: 20, station: "pastry" },
]