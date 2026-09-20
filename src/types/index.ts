export type RiskLevel = 'healthy' | 'attention' | 'high-risk';
export type Species = 'Cattle' | 'Buffalo' | 'Sheep' | 'Goat' | 'Poultry';

export interface Animal {
  id: string;
  species: Species;
  age: number;
  status: 'Monitored' | 'Unchecked';
  riskLevel: RiskLevel;
  riskScore: number;
  lastChecked: string;
  location: string;
}

export interface HealthAlert {
  id: string;
  animalId: string;
  species: Species;
  title: string;
  description: string;
  severity: RiskLevel;
  time: string;
}

export interface Indicator {
  name: string;
  detail: string;
  severity: 'normal' | 'caution' | 'critical';
}

export interface RiskReportData {
  animalId: string;
  species: Species;
  age: number;
  location: string;
  analyzedAt: string;
  overallRiskLevel: RiskLevel;
  riskScore: number;
  flagReason: string;
  nextAction: string;
  visualIndicators: Indicator[];
  audioIndicators: Indicator[];
  behaviourIndicators: Indicator[];
  farmConditionIndicators: Indicator[];
}

export interface RiskDistribution {
  healthy: number;
  attention: number;
  highRisk: number;
}

export interface SpeciesCount {
  species: Species;
  count: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  time: string;
}
