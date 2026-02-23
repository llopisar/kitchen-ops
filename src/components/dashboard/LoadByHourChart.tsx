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

type Props = {
    data: { time: string; value: number }[]
}

export function LoadByHourChart({ data }: Props) {
    return (
        <Card className="border-zinc-800 bg-zinc-900/60 text-zinc-100 h-full flex flex-col">
            <CardHeader className="pb-2">
                <CardTitle className="text-base">Load by Hour</CardTitle>
            </CardHeader>

            {/* flex-1 es la clave */}
            <CardContent className="flex-1 min-w-0 min-h-[160px]">
                <div className="h-full w-full min-w-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            margin={{ top: 0, right: 10, left: -10, bottom: 0 }}
                        >
                            <CartesianGrid strokeDasharray="4 4" opacity={0.15} />
                            <XAxis dataKey="time" tick={{ fill: "#a1a1aa", fontSize: 12 }} />
                            <YAxis tick={{ fill: "#a1a1aa", fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{
                                    background: "rgba(24, 24, 27, 0.95)",
                                    border: "1px solid rgba(63, 63, 70, 0.8)",
                                    borderRadius: 8,
                                    color: "#fff",
                                }}
                                labelStyle={{ color: "#fff" }}
                                cursor={{ fill: "rgba(255,255,255,0.06)" }}
                            />
                            <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#f59e0b" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
