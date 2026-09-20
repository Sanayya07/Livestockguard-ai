import { useState } from 'react';
import { Sidebar, type PageId } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { DashboardPage } from '@/pages/DashboardPage';
import { AnalyzePage } from '@/pages/AnalyzePage';
import { ProcessingPage } from '@/pages/ProcessingPage';
import { ReportPage } from '@/pages/ReportPage';
import { AssistantPage } from '@/pages/AssistantPage';

const pageInfo: Record<PageId, { title: string; subtitle: string }> = {
  dashboard: { title: 'Dashboard', subtitle: 'Monitor your herd health at a glance' },
  analyze: { title: 'Analyze Animal', subtitle: 'Run a multi-signal AI health analysis' },
  processing: { title: 'Analysis Processing', subtitle: 'AI is analysing your animal data' },
  report: { title: 'Health Risk Report', subtitle: 'Detailed AI-assisted risk assessment' },
  assistant: { title: 'AI Assistant', subtitle: 'Ask questions about your monitored animals' },
};

function App() {
  const [page, setPage] = useState<PageId>('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = (p: PageId) => {
    setPage(p);
    setMobileOpen(false);
    window.scrollTo({ top: 0 });
  };

  const { title, subtitle } = pageInfo[page];

  return (
    <div className="min-h-screen bg-ink-50">
      <Sidebar
        current={page}
        onNavigate={navigate}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className="lg:pl-64">
        <Header title={title} subtitle={subtitle} onOpenMobile={() => setMobileOpen(true)} />
        <main className="px-4 py-5 sm:px-6 lg:px-8">
          {page === 'dashboard' && <DashboardPage onNavigate={navigate} />}
          {page === 'analyze' && <AnalyzePage onNavigate={navigate} />}
          {page === 'processing' && <ProcessingPage onNavigate={navigate} />}
          {page === 'report' && <ReportPage onNavigate={navigate} />}
          {page === 'assistant' && <AssistantPage />}
        </main>
      </div>
    </div>
  );
}

export default App;
