export type DishCount = {
    id: string
    name: string
    qty: number
    station?: "grill" | "cold" | "hot" | "pastry"
}

export const topDishesLastNightMock: DishCount[] = [
    { id: "d1", name: "Bacalhau à Brás", qty: 15, station: "hot" },
    { id: "d2", name: "Polvo à Lagareiro", qty: 12, station: "hot" },
    { id: "d3", name: "Picanha", qty: 9, station: "grill" },
    { id: "d4", name: "Salada da Casa", qty: 8, station: "cold" },
    { id: "d5", name: "Pastel de Nata", qty: 20, station: "pastry" },
]