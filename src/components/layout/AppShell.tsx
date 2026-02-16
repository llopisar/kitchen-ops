import { useMemo, useState } from "react"
import type { ReactNode } from "react"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Sidebar } from "./Sidebar"
import { Topbar } from "./Topbar"

type AppShellProps = { children: ReactNode }

export function AppShell({ children }: AppShellProps) {
    const [open, setOpen] = useState(false)

    const frameCls = useMemo(
        () =>
            "min-h-screen bg-gradient-to-b from-zinc-200 via-zinc-100 to-zinc-200 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950",
        []
    )

    return (
        <div className={frameCls}>
            <div className="mx-auto max-w-[1200px] p-6">
                <div className="rounded-2xl border bg-background/70 shadow-xl backdrop-blur supports-[backdrop-filter]:bg-background/55">
                    <div className="grid min-h-[720px] grid-cols-1 md:grid-cols-[260px_1fr]">
                        {/* Desktop sidebar */}
                        <div className="hidden md:block">
                            <Sidebar />
                        </div>

                        {/* Main */}
                        <div className="min-w-0">
                            <Topbar onOpenSidebar={() => setOpen(true)} />
                            <main className="p-4 md:p-6">{children}</main>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile sidebar */}
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side="left" className="p-0">
                    <Sidebar />
                </SheetContent>
            </Sheet>
        </div>
    )
}
