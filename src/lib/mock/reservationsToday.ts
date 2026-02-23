export type Reservation = {
    id: string;
    time: string;      // "19:15"
    covers: number;    // personas
    name: string;
    tags: string[];
    allergies: string[];
    notes?: string;
};

export const reservationsToday: Reservation[] = [
    { id: "res_001", time: "19:15", covers: 4, name: "Pérez", tags: ["vegano"], allergies: [] },
    { id: "res_002", time: "19:30", covers: 6, name: "Silva", tags: ["cumpleaños"], allergies: ["nuts"], notes: "Traer vela" },
    { id: "res_003", time: "20:00", covers: 2, name: "Lopes", tags: [], allergies: ["gluten"] },
    { id: "res_004", time: "20:30", covers: 5, name: "Costa", tags: [], allergies: [] },
    { id: "res_005", time: "21:00", covers: 8, name: "Martins", tags: ["grupo"], allergies: [], notes: "Llegan puntuales" }
];
