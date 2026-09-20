import { ShieldCheck, LayoutDashboard, ScanLine, HeartPulse, Bell, MessageCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export type PageId = 'dashboard' | 'analyze' | 'processing' | 'report' | 'assistant';

interface NavItem {
  id: PageId;
  label: string;
  icon: typeof LayoutDashboard;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'analyze', label: 'Analyze Animal', icon: ScanLine },
  { id: 'assistant', label: 'AI Assistant', icon: MessageCircle },
];

// Extra nav items shown but pointing to dashboard with alert filter
const infoItems = [
  { label: 'Animals', icon: HeartPulse, badge: '147' },
  { label: 'Alerts', icon: Bell, badge: '5' },
];

interface SidebarProps {
  current: PageId;
  onNavigate: (page: PageId) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export function Sidebar({ current, onNavigate, mobileOpen, onCloseMobile }: SidebarProps) {
  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-ink-900/40 backdrop-blur-sm lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-ink-200/70 bg-white transition-transform duration-300 lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between border-b border-ink-100 px-5 py-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-sm">
              <ShieldCheck className="h-5.5 w-5.5" strokeWidth={2.2} />
            </div>
            <div>
              <h1 className="font-display text-base font-bold leading-tight text-ink-900">
                LivestockGuard
              </h1>
              <p className="text-xs font-medium text-brand-600">AI Health Monitor</p>
            </div>
          </div>
          <button
            onClick={onCloseMobile}
            className="rounded-lg p-1.5 text-ink-400 hover:bg-ink-100 hover:text-ink-600 lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-ink-400">
            Monitoring
          </p>
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = current === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                      active
                        ? 'bg-brand-50 text-brand-700'
                        : 'text-ink-600 hover:bg-ink-50 hover:text-ink-900',
                    )}
                  >
                    <Icon
                      className={cn('h-5 w-5 shrink-0', active ? 'text-brand-600' : 'text-ink-400')}
                      strokeWidth={2}
                    />
                    {item.label}
                    {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-brand-500" />}
                  </button>
                </li>
              );
            })}
          </ul>

          <p className="mb-2 mt-6 px-3 text-xs font-semibold uppercase tracking-wider text-ink-400">
            Overview
          </p>
          <ul className="space-y-1">
            {infoItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label}>
                  <button
                    onClick={() => onNavigate('dashboard')}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-600 transition-all hover:bg-ink-50 hover:text-ink-900"
                  >
                    <Icon className="h-5 w-5 shrink-0 text-ink-400" strokeWidth={2} />
                    {item.label}
                    <span className="ml-auto rounded-full bg-ink-100 px-2 py-0.5 text-xs font-semibold text-ink-500">
                      {item.badge}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Status footer */}
        <div className="border-t border-ink-100 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success-500 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success-500" />
            </span>
            <div>
              <p className="text-xs font-semibold text-ink-700">System Active</p>
              <p className="text-xs text-ink-400">Monitoring 147 animals</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
