const lucide = require('lucide-react-native');
const icons = [
  'Target', 'Dumbbell', 'HeartPulse', 'Activity',
  'User', 'UserCircle', 'HelpCircle',
  'Leaf', 'TreePine',
  'Zap', 'Scale', 'Shield',
  'Apple', 'Monitor', 'Footprints',
  'Calendar', 'Flame', 'Rocket',
  'Sparkles', 'Battery', 'Brain',
  'Utensils', 'Coffee',
  'Bed', 'Moon',
  'CloudLightning', 'Smile',
  'Droplet', 'Waves',
  'Pizza', 'Clock', 'CheckCircle2', 'Timer', 'Flower', 'Key'
];
const missing = icons.filter(icon => !lucide[icon]);
console.log('Missing icons:', missing);
