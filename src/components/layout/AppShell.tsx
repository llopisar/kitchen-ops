import type { ReactNode } from "react"

type AppShellProps = { children: ReactNode }

export function AppShell({ children }: AppShellProps) {
    return (
        <div className="h-dvh overflow-hidden bg-zinc-950 text-zinc-100">
            {/* subtle vignette (premium, no gradient obvio) */}
            <div className="h-dvh overflow-hidden bg-[radial-gradient(1200px_circle_at_50%_-20%,rgba(255,255,255,0.08),transparent_55%),radial-gradient(900px_circle_at_10%_20%,rgba(255,255,255,0.04),transparent_50%)]">
                <div className="mx-auto h-dvh max-w-[1200px] p-4 md:p-5">
                    <div className="h-full rounded-2xl bg-zinc-950/40 ring-1 ring-white/10 backdrop-blur-xl overflow-hidden">
                        <main className="h-full p-4 md:p-5 overflow-hidden">{children}</main>
                    </div>
                </div>
            </div>
        </div>
    )
}