import { useEffect, useState } from 'react';
import {
  Camera,
  Mic,
  Footprints,
  Thermometer,
  FileText,
  CheckCircle2,
  Loader2,
  Cpu,
  Sparkles,
} from 'lucide-react';

import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import type { PageId } from '@/components/layout/Sidebar';

interface AnimalData {
  id: string;
  species: string;
  age: number;
}

interface AnalysisStep {
  id: string;
  label: string;
  description: string;
  icon: typeof Camera;
  details: string[];
}

const steps: AnalysisStep[] = [
  {
    id: 'visual',
    label: 'Visual Analysis',
    description: 'Processing image/video for physical indicators',
    icon: Camera,
    details: [
      'Detecting body condition score',
      'Analysing posture and gait',
      'Scanning for eye/nose discharge',
      'Evaluating coat quality',
    ],
  },
  {
    id: 'audio',
    label: 'Audio Analysis',
    description: 'Analysing audio for respiratory and vocal patterns',
    icon: Mic,
    details: [
      'Measuring respiratory rate',
      'Detecting coughing events',
      'Identifying wheezing sounds',
      'Classifying vocalisations',
    ],
  },
  {
    id: 'behaviour',
    label: 'Behaviour Analysis',
    description: 'Evaluating movement and activity indicators',
    icon: Footprints,
    details: [
      'Comparing activity to baseline',
      'Estimating rumination time',
      'Analysing feed intake patterns',
      'Checking social interaction',
    ],
  },
  {
    id: 'farm',
    label: 'Farm-Condition Analysis',
    description: 'Cross-referencing environmental data',
    icon: Thermometer,
    details: [
      'Evaluating temperature stress',
      'Assessing humidity impact',
      'Checking ventilation adequacy',
      'Contextualising activity setting',
    ],
  },
  {
    id: 'report',
    label: 'Generating Health-Risk Report',
    description: 'Synthesising all indicators into a risk assessment',
    icon: FileText,
    details: [
      'Weighting indicator severity',
      'Calculating risk score',
      'Generating explanation',
      'Compiling recommendations',
    ],
  },
];

const STEP_DURATION = 2200;

interface ProcessingPageProps {
  onNavigate: (page: PageId) => void;
  animal?: AnimalData | null;
}

export function ProcessingPage({
  onNavigate,
  animal,
}: ProcessingPageProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(
    new Set()
  );

  useEffect(() => {
    if (currentStep >= steps.length) {
      const timer = setTimeout(() => {
        onNavigate('report');
      }, 800);

      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setCompletedSteps((prev) => new Set([...prev, currentStep]));
      setCurrentStep((s) => s + 1);
    }, STEP_DURATION);

    return () => clearTimeout(timer);
  }, [currentStep, onNavigate]);

  const progress = Math.min(
    100,
    (currentStep / steps.length) * 100
  );

  const animalId = animal?.id || 'Animal';
  const species = animal?.species || 'Animal';
  const age = animal?.age ?? 0;

  return (
    <div className="mx-auto max-w-3xl space-y-5">

      {/* Header */}
      <Card className="overflow-hidden">
        <div className="relative bg-gradient-to-br from-brand-600 to-brand-800 px-6 py-8 text-center text-white">

          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 70% 60%, white 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          <div className="relative">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
              <Cpu className="h-7 w-7" />
            </div>

            <h2 className="mt-4 font-display text-xl font-bold">
              Analysis in Progress
            </h2>

            <p className="mt-1 text-sm text-brand-100">
              Analysing Animal {animalId} · {species} · {age} years
            </p>

          </div>
        </div>

        <div className="px-6 py-4">

          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium text-ink-600">
              Overall progress
            </span>

            <span className="font-bold text-brand-600">
              {Math.round(progress)}%
            </span>
          </div>

          <div className="h-2.5 w-full overflow-hidden rounded-full bg-ink-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

        </div>
      </Card>

      {/* Steps */}
      <div className="space-y-3">

        {steps.map((step, idx) => {

          const isCompleted = completedSteps.has(idx);
          const isActive = idx === currentStep;
          const isPending = idx > currentStep;

          const Icon = step.icon;

          return (
            <Card
              key={step.id}
              className={cn(
                'overflow-hidden transition-all duration-300',
                isActive && 'ring-2 ring-brand-500/20',
                isPending && 'opacity-50',
              )}
            >

              <div className="flex items-start gap-4 p-5">

                <div
                  className={cn(
                    'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all',
                    isCompleted &&
                      'bg-success-100 text-success-600',
                    isActive &&
                      'bg-brand-50 text-brand-600',
                    isPending &&
                      'bg-ink-100 text-ink-400',
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-5.5 w-5.5" />
                  ) : isActive ? (
                    <Loader2 className="h-5.5 w-5.5 animate-spin" />
                  ) : (
                    <Icon className="h-5.5 w-5.5" />
                  )}
                </div>

                <div className="min-w-0 flex-1">

                  <div className="flex items-center gap-2">

                    <h3 className="font-display text-sm font-semibold text-ink-900">
                      {step.label}
                    </h3>

                    {isCompleted && (
                      <span className="rounded-full bg-success-100 px-2 py-0.5 text-xs font-semibold text-success-700">
                        Complete
                      </span>
                    )}

                    {isActive && (
                      <span className="rounded-full bg-brand-100 px-2 py-0.5 text-xs font-semibold text-brand-700">
                        Processing
                      </span>
                    )}

                  </div>

                  <p className="mt-0.5 text-sm text-ink-500">
                    {step.description}
                  </p>

                  {(isActive || isCompleted) && (
                    <ul className="mt-3 space-y-1.5">

                      {step.details.map((detail, di) => {

                        const detailDone =
                          isCompleted ||
                          (isActive &&
                            di <
                              Math.floor(
                                (Date.now() / 600) %
                                  step.details.length
                              ));

                        return (
                          <li
                            key={di}
                            className={cn(
                              'flex items-center gap-2 text-xs transition-all',
                              isCompleted
                                ? 'text-ink-500'
                                : detailDone
                                  ? 'text-ink-600'
                                  : 'text-ink-400',
                            )}
                          >

                            {isCompleted ? (
                              <CheckCircle2 className="h-3.5 w-3.5 text-success-500" />
                            ) : (
                              <span
                                className={cn(
                                  'h-1.5 w-1.5 rounded-full',
                                  detailDone
                                    ? 'bg-brand-500'
                                    : 'bg-ink-300',
                                )}
                              />
                            )}

                            {detail}

                          </li>
                        );
                      })}

                    </ul>
                  )}

                </div>
              </div>

              {isActive && (
                <div className="relative h-0.5 overflow-hidden bg-brand-100">
                  <div className="absolute inset-0 animate-scan-line bg-gradient-to-r from-transparent via-brand-500 to-transparent" />
                </div>
              )}

            </Card>
          );
        })}

      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-ink-400">
        <Sparkles className="h-3.5 w-3.5" />
        AI-assisted prototype analysis — not a veterinary diagnosis
      </div>

    </div>
  );
}