import type { Animal, HealthAlert, RiskReportData, SpeciesCount, RiskDistribution } from '@/types';

export const animals: Animal[] = [
  { id: 'LG-017', species: 'Cattle', age: 4, status: 'Monitored', riskLevel: 'high-risk', riskScore: 78, lastChecked: '2 min ago', location: 'Barn A — Stall 3' },
  { id: 'LG-012', species: 'Cattle', age: 6, status: 'Monitored', riskLevel: 'attention', riskScore: 52, lastChecked: '15 min ago', location: 'Barn A — Stall 8' },
  { id: 'LG-023', species: 'Buffalo', age: 3, status: 'Monitored', riskLevel: 'healthy', riskScore: 12, lastChecked: '1 hr ago', location: 'Barn B — Stall 1' },
  { id: 'LG-031', species: 'Goat', age: 2, status: 'Monitored', riskLevel: 'attention', riskScore: 47, lastChecked: '3 hr ago', location: 'Pen C — Enclosure 2' },
  { id: 'LG-008', species: 'Sheep', age: 5, status: 'Monitored', riskLevel: 'healthy', riskScore: 8, lastChecked: '4 hr ago', location: 'Pasture D — Flock 1' },
  { id: 'LG-044', species: 'Poultry', age: 1, status: 'Unchecked', riskLevel: 'attention', riskScore: 41, lastChecked: '6 hr ago', location: 'Coop E — Row 2' },
  { id: 'LG-019', species: 'Cattle', age: 7, status: 'Monitored', riskLevel: 'healthy', riskScore: 15, lastChecked: '5 hr ago', location: 'Barn A — Stall 5' },
  { id: 'LG-027', species: 'Buffalo', age: 4, status: 'Monitored', riskLevel: 'high-risk', riskScore: 71, lastChecked: '20 min ago', location: 'Barn B — Stall 4' },
  { id: 'LG-036', species: 'Goat', age: 3, status: 'Monitored', riskLevel: 'healthy', riskScore: 19, lastChecked: '2 hr ago', location: 'Pen C — Enclosure 5' },
  { id: 'LG-052', species: 'Poultry', age: 2, status: 'Monitored', riskLevel: 'healthy', riskScore: 6, lastChecked: '30 min ago', location: 'Coop E — Row 1' },
];

export const healthAlerts: HealthAlert[] = [
  { id: 'A-104', animalId: 'LG-017', species: 'Cattle', title: 'Possible respiratory distress', description: 'Elevated breathing rate detected in audio analysis and reduced rumination activity.', severity: 'high-risk', time: '2 min ago' },
  { id: 'A-103', animalId: 'LG-027', species: 'Buffalo', title: 'Lameness indicator detected', description: 'Asymmetric gait pattern identified in video analysis. Weight shifting favouring left side.', severity: 'high-risk', time: '20 min ago' },
  { id: 'A-102', animalId: 'LG-012', species: 'Cattle', title: 'Reduced activity level', description: 'Movement below baseline for 48 hours. Possible early-stage illness or heat stress.', severity: 'attention', time: '15 min ago' },
  { id: 'A-101', animalId: 'LG-031', species: 'Goat', title: 'Abnormal coat condition', description: 'Dull coat and slight weight loss detected in image analysis. Recommend monitoring feed intake.', severity: 'attention', time: '3 hr ago' },
  { id: 'A-100', animalId: 'LG-044', species: 'Poultry', title: 'Overdue health check', description: 'No analysis performed in over 6 hours. Schedule a routine monitoring session.', severity: 'attention', time: '6 hr ago' },
];

export const riskDistribution: RiskDistribution = {
  healthy: 128,
  attention: 14,
  highRisk: 5,
};

export const speciesCounts: SpeciesCount[] = [
  { species: 'Cattle', count: 62 },
  { species: 'Buffalo', count: 28 },
  { species: 'Sheep', count: 34 },
  { species: 'Goat', count: 18 },
  { species: 'Poultry', count: 5 },
];

export const weeklyAlertTrend = [
  { day: 'Mon', count: 3 },
  { day: 'Tue', count: 5 },
  { day: 'Wed', count: 2 },
  { day: 'Thu', count: 7 },
  { day: 'Fri', count: 4 },
  { day: 'Sat', count: 6 },
  { day: 'Sun', count: 3 },
];

export const demoReport: RiskReportData = {
  animalId: 'LG-017',
  species: 'Cattle',
  age: 4,
  location: 'Barn A — Stall 3',
  analyzedAt: 'Today, 9:42 AM',
  overallRiskLevel: 'high-risk',
  riskScore: 78,
  flagReason:
    'This animal was flagged because three independent analysis channels — audio, behaviour, and farm conditions — converged on indicators consistent with early respiratory distress. The audio model detected an elevated breathing rate and mild wheezing not present in the previous baseline recording. Behaviour analysis showed reduced rumination time and decreased overall movement over the last 24 hours. Environmental data indicates high humidity and elevated temperature in Barn A, which are known stress factors for bovine respiratory conditions.',
  nextAction:
    'Isolate Animal LG-017 for closer observation and contact a veterinarian for a clinical examination within 24 hours. Ensure adequate ventilation in Barn A and reduce ambient humidity if possible. Continue monitoring with a follow-up analysis in 6 hours to track whether indicators worsen or improve.',
  visualIndicators: [
    { name: 'Body condition score', detail: 'Score 3/5 — slight rib visibility, within normal range but lower than last check.', severity: 'caution' },
    { name: 'Eye discharge', detail: 'Mild bilateral ocular discharge detected in uploaded image.', severity: 'caution' },
    { name: 'Posture', detail: 'Head held slightly lower than baseline — possible discomfort.', severity: 'caution' },
    { name: 'Coat condition', detail: 'Glossy and uniform — no abnormalities detected.', severity: 'normal' },
  ],
  audioIndicators: [
    { name: 'Respiratory rate', detail: '42 breaths/min — elevated (normal range: 26–35 for adult cattle).', severity: 'critical' },
    { name: 'Wheezing sounds', detail: 'Low-frequency wheezing detected in 3 of 5 audio segments analysed.', severity: 'critical' },
    { name: 'Cough frequency', detail: '2 coughing events detected in a 60-second window.', severity: 'caution' },
    { name: 'Vocalisation', detail: 'Normal vocalisation patterns — no distress calls.', severity: 'normal' },
  ],
  behaviourIndicators: [
    { name: 'Rumination time', detail: 'Reduced to 5.2 hours (baseline: 7–8 hours/day).', severity: 'critical' },
    { name: 'Activity level', detail: '32% below baseline movement over the last 24 hours.', severity: 'caution' },
    { name: 'Feed intake', detail: 'Slightly reduced — estimated 15% drop from sensor-fed trough.', severity: 'caution' },
    { name: 'Social interaction', detail: 'Normal — still integrating with herd group.', severity: 'normal' },
  ],
  farmConditionIndicators: [
    { name: 'Ambient temperature', detail: '34°C in Barn A — above recommended comfort zone (15–25°C).', severity: 'critical' },
    { name: 'Humidity', detail: '78% relative humidity — high, increases respiratory stress.', severity: 'critical' },
    { name: 'Ventilation', detail: 'Airflow rated adequate but not optimal for current humidity.', severity: 'caution' },
    { name: 'Activity level setting', detail: 'Low — barn occupancy below 40%, normal for time of day.', severity: 'normal' },
  ],
};

export const exampleQuestions = [
  'Why was Animal LG-017 flagged?',
  'What indicators were detected?',
  'Show me recent alerts.',
  'How many animals need attention?',
  'What does the risk score mean?',
];

export const demoChatResponses: Record<string, string> = {
  'why was animal lg-017 flagged':
    'Animal LG-017 was flagged because three analysis channels detected converging indicators of possible respiratory distress:\n\n1. Audio analysis found an elevated respiratory rate of 42 breaths/min (normal: 26–35) and mild wheezing in 3 of 5 segments.\n2. Behaviour analysis showed rumination time dropped to 5.2 hours from a baseline of 7–8 hours, and activity is 32% below normal.\n3. Farm conditions in Barn A show 34°C temperature and 78% humidity — both above recommended comfort levels.\n\nThe combined risk score is 78 out of 100, classifying this animal as high-risk. The recommended next action is to isolate the animal for observation and contact a veterinarian within 24 hours.',
  'what indicators were detected':
    'Across the most recent analyses, the system detected the following indicator types:\n\n• Visual: body condition, eye discharge, posture, coat condition\n• Audio: respiratory rate, wheezing, cough frequency, vocalisation\n• Behaviour: rumination time, activity level, feed intake, social interaction\n• Farm conditions: temperature, humidity, ventilation, activity setting\n\nEach indicator is classified as normal, caution, or critical. Critical indicators are weighted most heavily in the overall risk score calculation.',
  'show me recent alerts':
    'Here are the 5 most recent health alerts:\n\n1. [High Risk] LG-017 — Possible respiratory distress (2 min ago)\n2. [High Risk] LG-027 — Lameness indicator detected (20 min ago)\n3. [Attention] LG-012 — Reduced activity level (15 min ago)\n4. [Attention] LG-031 — Abnormal coat condition (3 hr ago)\n5. [Attention] LG-044 — Overdue health check (6 hr ago)\n\nTwo animals are currently classified as high-risk and three need attention. I recommend reviewing the Health Risk Report for LG-017 first.',
  'how many animals need attention':
    'Currently, 14 animals are classified as "Needs Attention" and 5 as "High Risk". That means 19 out of 147 total animals (about 13%) require some form of follow-up. 128 animals are classified as healthy.',
  'what does the risk score mean':
    'The risk score is a number from 0 to 100 that represents the combined likelihood that an animal has a health condition requiring attention. It is calculated by weighting indicators from all four analysis channels:\n\n• 0–25: Healthy — no significant indicators detected\n• 26–50: Needs Attention — minor indicators present, monitor closely\n• 51–100: High Risk — multiple critical indicators detected, veterinary review recommended\n\nThe score is AI-assisted and based on prototype analysis. It is not a veterinary diagnosis.',
};

export function getAssistantResponse(question: string): string {
  const normalized = question.toLowerCase().trim();
  for (const key of Object.keys(demoChatResponses)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return demoChatResponses[key];
    }
  }
  if (normalized.includes('alert')) {
    return demoChatResponses['show me recent alerts.'];
  }
  if (normalized.includes('attention') || normalized.includes('how many')) {
    return demoChatResponses['how many animals need attention'];
  }
  return "I'm a demo assistant for LivestockGuard AI. I can answer questions about monitored animals, detected indicators, recent alerts, and risk scores. Try one of the example questions below, or ask me about a specific animal ID like LG-017.";
}
