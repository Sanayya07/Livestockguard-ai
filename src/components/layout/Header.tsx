import { Menu, Bell, Search } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onOpenMobile: () => void;
}

export function Header({ title, subtitle, onOpenMobile }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-ink-200/70 bg-white/80 backdrop-blur-md">
      <div className="flex items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobile}
            className="rounded-lg p-2 text-ink-500 hover:bg-ink-100 lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <h2 className="font-display text-lg font-bold text-ink-900 sm:text-xl">{title}</h2>
            {subtitle && <p className="hidden text-sm text-ink-500 sm:block">{subtitle}</p>}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative hidden md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
            <input
              type="text"
              placeholder="Search animals, alerts..."
              className="w-56 rounded-lg border border-ink-200 bg-ink-50 py-2 pl-9 pr-3 text-sm text-ink-700 placeholder-ink-400 transition-colors focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 lg:w-64"
            />
          </div>

          <button className="relative rounded-lg p-2 text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-700" aria-label="Notifications">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-danger-500 ring-2 ring-white" />
          </button>

          <div className="flex items-center gap-2.5 rounded-lg border border-ink-200 bg-white py-1.5 pl-1.5 pr-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-600 text-sm font-bold text-white">
              RK
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold leading-tight text-ink-800">Ravi Kumar</p>
              <p className="text-xs leading-tight text-ink-400">Farm Manager</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
