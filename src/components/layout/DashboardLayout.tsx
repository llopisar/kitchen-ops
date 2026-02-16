import { useState } from "react"
import type { ReactNode } from "react"
import { Sidebar } from "./Sidebar"
import { Topbar } from "./Topbar"
import { Sheet, SheetContent } from "@/components/ui/sheet"

type DashboardLayoutProps = {
    children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    const [open, setOpen] = useState(false)

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Desktop layout */}
            <div className="hidden md:grid md:grid-cols-[256px_1fr]">
                <Sidebar />
                <div className="min-w-0">
                    <Topbar />
                    <main className="p-6">{children}</main>
                </div>
            </div>

            {/* Mobile layout */}
            <div className="md:hidden">
                <Topbar onOpenSidebar={() => setOpen(true)} />

                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetContent side="left" className="p-0">
                        <Sidebar className="border-r-0" />
                    </SheetContent>
                </Sheet>

                <main className="p-4">{children}</main>
            </div>
        </div>
    )
}
