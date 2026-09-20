import type { LucideIcon } from 'lucide-react';
import { PawPrint, HeartPulse, AlertTriangle, ShieldAlert, ArrowUpRight, ArrowDownRight, Activity, TrendingUp, Bell } from 'lucide-react';
import { Card, CardHeader } from '@/components/ui/Card';
import { Badge, RiskBadge } from '@/components/ui/Badge';
import { riskScoreColor, riskScoreBarColor } from '@/lib/utils';
import { animals, healthAlerts, riskDistribution, speciesCounts, weeklyAlertTrend } from '@/data/mockData';
import type { PageId } from '@/components/layout/Sidebar';

interface StatCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  accent: 'brand' | 'success' | 'warning' | 'danger';
}

const accentMap = {
  brand: { bg: 'bg-brand-50', text: 'text-brand-600', ring: 'ring-brand-100' },
  success: { bg: 'bg-success-50', text: 'text-success-600', ring: 'ring-success-100' },
  warning: { bg: 'bg-warning-50', text: 'text-warning-600', ring: 'ring-warning-100' },
  danger: { bg: 'bg-danger-50', text: 'text-danger-600', ring: 'ring-danger-100' },
};

function StatCard({ label, value, icon: Icon, trend, trendUp, accent }: StatCardProps) {
  const c = accentMap[accent];
  return (
    <Card hover className="p-5">
      <div className="flex items-start justify-between">
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${c.bg} ${c.text} ring-4 ${c.ring}`}>
          <Icon className="h-5.5 w-5.5" strokeWidth={2.1} />
        </div>
        {trend && (
          <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${trendUp ? 'text-danger-600' : 'text-success-600'}`}>
            {trendUp ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
            {trend}
          </span>
        )}
      </div>
      <p className="mt-4 font-display text-3xl font-bold text-ink-900">{value}</p>
      <p className="mt-1 text-sm font-medium text-ink-500">{label}</p>
    </Card>
  );
}

function RiskDonut() {
  const total = riskDistribution.healthy + riskDistribution.attention + riskDistribution.highRisk;
  const segments = [
    { value: riskDistribution.healthy, color: '#22c55e', label: 'Healthy' },
    { value: riskDistribution.attention, color: '#f59e0b', label: 'Needs Attention' },
    { value: riskDistribution.highRisk, color: '#ef4444', label: 'High Risk' },
  ];
  let offset = 0;
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
      <div className="relative h-36 w-36 shrink-0">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle cx="60" cy="60" r={radius} fill="none" stroke="#f1f5f9" strokeWidth="14" />
          {segments.map((seg) => {
            const dash = (seg.value / total) * circumference;
            const circle = (
              <circle
                key={seg.label}
                cx="60"
                cy="60"
                r={radius}
                fill="none"
                stroke={seg.color}
                strokeWidth="14"
                strokeDasharray={`${dash} ${circumference - dash}`}
                strokeDashoffset={-offset}
                strokeLinecap="round"
                className="transition-all duration-700"
              />
            );
            offset += dash;
            return circle;
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-2xl font-bold text-ink-900">{total}</span>
          <span className="text-xs text-ink-400">Total Animals</span>
        </div>
      </div>
      <div className="flex-1 space-y-2.5">
        {segments.map((seg) => (
          <div key={seg.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: seg.color }} />
              <span className="text-sm font-medium text-ink-600">{seg.label}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-ink-900">{seg.value}</span>
              <span className="text-xs text-ink-400">
                ({Math.round((seg.value / total) * 100)}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AlertTrendChart() {
  const max = Math.max(...weeklyAlertTrend.map((d) => d.count));
  return (
    <div className="flex items-end justify-between gap-2 pt-2">
      {weeklyAlertTrend.map((d) => {
        const h = (d.count / max) * 100;
        return (
          <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex w-full flex-1 items-end">
              <div
                className="w-full rounded-t-md bg-gradient-to-t from-brand-400 to-brand-500 transition-all duration-500 hover:from-brand-500 hover:to-brand-600"
                style={{ height: `${h}%`, minHeight: '8px' }}
                title={`${d.count} alerts`}
              />
            </div>
            <span className="text-xs font-medium text-ink-400">{d.day}</span>
            <span className="text-xs font-bold text-ink-600">{d.count}</span>
          </div>
        );
      })}
    </div>
  );
}

function SpeciesBar() {
  const max = Math.max(...speciesCounts.map((s) => s.count));
  return (
    <div className="space-y-3">
      {speciesCounts.map((s) => (
        <div key={s.species} className="flex items-center gap-3">
          <span className="w-16 shrink-0 text-sm font-medium text-ink-600">{s.species}</span>
          <div className="h-5 flex-1 overflow-hidden rounded-md bg-ink-100">
            <div
              className="flex h-full items-center justify-end rounded-md bg-brand-500/80 px-2 text-xs font-semibold text-white transition-all duration-500"
              style={{ width: `${(s.count / max) * 100}%` }}
            >
              {s.count}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

interface DashboardPageProps {
  onNavigate: (page: PageId) => void;
}

export function DashboardPage({ onNavigate }: DashboardPageProps) {
  return (
    <div className="space-y-5">
      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Animals" value={riskDistribution.healthy + riskDistribution.attention + riskDistribution.highRisk} icon={PawPrint} accent="brand" />
        <StatCard label="Healthy" value={riskDistribution.healthy} icon={HeartPulse} accent="success" trend="3%" trendUp={false} />
        <StatCard label="Needs Attention" value={riskDistribution.attention} icon={AlertTriangle} accent="warning" trend="2" trendUp />
        <StatCard label="High Risk" value={riskDistribution.highRisk} icon={ShieldAlert} accent="danger" trend="1" trendUp />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        {/* Risk distribution */}
        <Card className="xl:col-span-1">
          <CardHeader title="Herd Health Status" subtitle="Risk distribution across all animals" icon={<Activity className="h-4.5 w-4.5" />} />
          <div className="p-5">
            <RiskDonut />
          </div>
        </Card>

        {/* Alert trend + species */}
        <div className="space-y-5 xl:col-span-2">
          <Card>
            <CardHeader
              title="Weekly Alert Trend"
              subtitle="Health alerts triggered in the last 7 days"
              icon={<TrendingUp className="h-4.5 w-4.5" />}
              action={<Badge variant="brand">30 total</Badge>}
            />
            <div className="px-5 pb-5 pt-4">
              <div className="flex h-32 items-end gap-2">
                {weeklyAlertTrend.map((d) => {
                  const max = Math.max(...weeklyAlertTrend.map((x) => x.count));
                  const h = (d.count / max) * 100;
                  return (
                    <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                      <div className="flex w-full flex-1 items-end">
                        <div
                          className="w-full rounded-t-md bg-gradient-to-t from-brand-400 to-brand-500 transition-all duration-500 hover:from-brand-500 hover:to-brand-600"
                          style={{ height: `${h}%`, minHeight: '8px' }}
                          title={`${d.count} alerts`}
                        />
                      </div>
                      <span className="text-xs font-medium text-ink-400">{d.day}</span>
                      <span className="text-xs font-bold text-ink-600">{d.count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader title="Animals by Species" subtitle="Distribution across livestock types" icon={<PawPrint className="h-4.5 w-4.5" />} />
            <div className="p-5">
              <SpeciesBar />
            </div>
          </Card>
        </div>
      </div>

      {/* Recent alerts */}
      <Card>
        <CardHeader
          title="Recent Health Alerts"
          subtitle="Latest flagged animals requiring attention"
          icon={<Bell className="h-4.5 w-4.5" />}
          action={
            <button onClick={() => onNavigate('dashboard')} className="text-sm font-semibold text-brand-600 hover:text-brand-700">
              View all
            </button>
          }
        />
        <div className="divide-y divide-ink-100">
          {healthAlerts.map((alert) => (
            <div key={alert.id} className="flex items-start gap-4 px-5 py-4 transition-colors hover:bg-ink-50/50">
              <div className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                alert.severity === 'high-risk' ? 'bg-danger-50 text-danger-600' : 'bg-warning-50 text-warning-600'
              }`}>
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-sm font-semibold text-ink-900">{alert.title}</h4>
                  <RiskBadge level={alert.severity} />
                </div>
                <p className="mt-1 text-sm text-ink-500">{alert.description}</p>
                <div className="mt-2 flex items-center gap-3 text-xs text-ink-400">
                  <span className="font-medium text-ink-600">{alert.animalId}</span>
                  <span>·</span>
                  <span>{alert.species}</span>
                  <span>·</span>
                  <span>{alert.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Monitoring table */}
      <Card>
        <CardHeader title="Animal Monitoring Table" subtitle="Real-time status of monitored livestock" icon={<PawPrint className="h-4.5 w-4.5" />} />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-ink-100 bg-ink-50/50 text-xs font-semibold uppercase tracking-wider text-ink-400">
                <th className="px-5 py-3">Animal ID</th>
                <th className="px-5 py-3">Species</th>
                <th className="px-5 py-3">Location</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Risk Level</th>
                <th className="px-5 py-3">Risk Score</th>
                <th className="px-5 py-3">Last Checked</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {animals.map((animal) => (
                <tr key={animal.id} className="transition-colors hover:bg-ink-50/50">
                  <td className="px-5 py-3.5">
                    <span className="font-semibold text-ink-900">{animal.id}</span>
                  </td>
                  <td className="px-5 py-3.5 text-ink-600">{animal.species}</td>
                  <td className="px-5 py-3.5 text-ink-500">{animal.location}</td>
                  <td className="px-5 py-3.5">
                    <Badge variant={animal.status === 'Monitored' ? 'brand' : 'neutral'} dot>
                      {animal.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-3.5">
                    <RiskBadge level={animal.riskLevel} />
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-12 overflow-hidden rounded-full bg-ink-100">
                        <div
                          className={`h-full rounded-full ${riskScoreBarColor(animal.riskScore)}`}
                          style={{ width: `${animal.riskScore}%` }}
                        />
                      </div>
                      <span className={`text-xs font-bold ${riskScoreColor(animal.riskScore)}`}>
                        {animal.riskScore}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-ink-500">{animal.lastChecked}</td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      onClick={() => onNavigate('report')}
                      className="text-xs font-semibold text-brand-600 hover:text-brand-700 hover:underline"
                    >
                      View Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
