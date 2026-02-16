import { Button } from "@/components/ui/button"

type TopbarProps = {
    onOpenSidebar?: () => void
}

export function Topbar({ onOpenSidebar }: TopbarProps) {
    return (
        <header className="flex h-16 items-center gap-3 border-b bg-background/60 px-4 backdrop-blur">
            {onOpenSidebar && (
                <Button
                    variant="outline"
                    className="md:hidden"
                    onClick={onOpenSidebar}
                >
                    Menu
                </Button>
            )}

            {/* resto igual */}
        </header>
    )
}
