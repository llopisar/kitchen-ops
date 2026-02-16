import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"

const data = [
    { time: "18:00", value: 4 },
    { time: "19:00", value: 12 },
    { time: "19:30", value: 18 },
    { time: "20:00", value: 26 },
    { time: "20:30", value: 28 },
    { time: "21:00", value: 22 },
    { time: "21:30", value: 17 },
    { time: "22:00", value: 13 },
    { time: "22:30", value: 10 },
    { time: "23:00", value: 6 },
]

export function LoadByHourChart() {
    return (
        <Card className="border-zinc-800 bg-zinc-900/60 text-zinc-100">
            <CardHeader className="pb-2">
                <CardTitle className="text-base">Carga por Hora</CardTitle>
            </CardHeader>
            <CardContent className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="4 4" opacity={0.15} />
                        <XAxis dataKey="time" tick={{ fill: "#a1a1aa", fontSize: 12 }} />
                        <YAxis tick={{ fill: "#a1a1aa", fontSize: 12 }} />
                        <Tooltip
                            contentStyle={{
                                background: "rgba(24, 24, 27, 0.9)",
                                border: "1px solid rgba(63, 63, 70, 0.8)",
                                borderRadius: 10,
                                color: "#fff",
                            }}
                            labelStyle={{ color: "#fff" }}
                            cursor={{ fill: "rgba(255,255,255,0.06)" }}
                        />
                        {/* No pongo color “hardcodeado” del tema, pero para parecerse a la imagen uso un ámbar */}
                        <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#f59e0b" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
