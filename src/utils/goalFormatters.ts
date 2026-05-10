const GOAL_LABEL_MAP: Record<string, string> = {
  weight_loss: 'Kilo Verme',
  lose_weight: 'Kilo Verme',
  fat_loss: 'Yağ Yakma',
  muscle_gain: 'Kas Kazanımı',
  gain_muscle: 'Kas Kazanımı',
  healthy_lifestyle: 'Sağlıklı Yaşam',
  maintain_form: 'Form Koruma',
  maintain: 'Form Koruma',
  flexibility: 'Esneklik',
  mobility: 'Mobilite',
  endurance: 'Dayanıklılık',
  general_fitness: 'Genel Fitness',
  stress_relief: 'Stres Azaltma',
  posture: 'Duruş Düzeltme',
};

const toTitleCase = (value: string) =>
  value
    .replace(/[_-]/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

export const formatFitnessGoal = (value?: string | null) => {
  if (!value) return '-';
  const normalized = value.trim().toLowerCase();
  return GOAL_LABEL_MAP[normalized] ?? toTitleCase(value);
};
