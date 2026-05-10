import { ElementType } from 'react';
import {
  Target, Dumbbell, HeartPulse, Activity,
  User, HelpCircle, UserCheck,
  Leaf, Zap, Scale, Shield,
  Apple, Monitor, Footprints,
  Calendar, Flame, Rocket,
  Sparkles, Battery, Brain,
  Utensils, Coffee, Bed,
  Moon, Smile,
  Droplet, Waves, Clock, CheckCircle, Timer,
  Trophy, TrendingUp, Sun, Wind
} from 'lucide-react-native';

export interface Option {
  id: string;
  icon: any; // Lucide Icon Component
  title: string;
  subtitle?: string;
}

export interface Question {
  id: number;
  key: string;
  title: string;
  subtitle?: string;
  options: Option[];
}

export const ONBOARDING_QUESTIONS: Question[] = [
  {
    id: 1,
    key: 'fitness_goal',
    title: 'Lotus ile ana hedefin nedir?',
    subtitle: 'Sana en uygun programı oluşturmamız için ana hedefini seç.',
    options: [
      { id: 'a', icon: Target, title: 'Kilo Vermek', subtitle: 'Sağlıklı ve kalıcı bir şekilde' },
      { id: 'b', icon: Dumbbell, title: 'Kas Yapmak', subtitle: 'Güçlenmek ve şekillenmek' },
      { id: 'c', icon: HeartPulse, title: 'Daha Sağlıklı Yaşamak', subtitle: 'Enerjimi ve zindeliğimi artırmak' },
      { id: 'd', icon: Scale, title: 'Formu Korumak', subtitle: 'Mevcut kilomu sabitlemek' },
    ]
  },
  {
    id: 2,
    key: 'gender',
    title: 'Biyolojik cinsiyetin nedir?',
    subtitle: 'Metabolizma hızı ve kalori hesaplamaları için gereklidir.',
    options: [
      { id: 'female', icon: User, title: 'Kadın' },
      { id: 'male', icon: UserCheck, title: 'Erkek' },
      { id: 'other', icon: Sparkles, title: 'Belirtmek İstemiyorum' },
    ]
  },
  {
    id: 3,
    key: 'age_range',
    title: 'Hangi yaş aralığındasın?',
    options: [
      { id: '18-25', icon: Leaf, title: '18 - 25 Yaş' },
      { id: '26-35', icon: Zap, title: '26 - 35 Yaş' },
      { id: '36-45', icon: Flame, title: '36 - 45 Yaş' },
      { id: '46+', icon: Trophy, title: '46 Yaş ve Üzeri' },
    ]
  },
  {
    id: 4,
    key: 'current_body_type',
    title: 'Şu anki vücut tipini nasıl tanımlarsın?',
    options: [
      { id: 'slim', icon: Wind, title: 'İnce / Zayıf', subtitle: 'Kilo almakta zorlanıyorum' },
      { id: 'average', icon: Scale, title: 'Normal / Dengeli', subtitle: 'Kilo alıp vermem normal' },
      { id: 'overweight', icon: Shield, title: 'Fazla Kilolu', subtitle: 'Kilo vermekte zorlanıyorum' },
    ]
  },
  {
    id: 5,
    key: 'dream_body_type',
    title: 'Hayalindeki vücut tipi hangisi?',
    options: [
      { id: 'fit', icon: Activity, title: 'Fit ve İnce', subtitle: 'Yağ oranı düşük, estetik' },
      { id: 'athletic', icon: Dumbbell, title: 'Atletik ve Kaslı', subtitle: 'Belirgin hatlar, güçlü' },
      { id: 'healthy', icon: Apple, title: 'Sadece Sağlıklı', subtitle: 'Görünümden çok hissetmek önemli' },
    ]
  },
  {
    id: 6,
    key: 'daily_activity_level',
    title: 'Günlük aktivite seviyen nasıl?',
    subtitle: 'Gün içindeki hareketliliğin kalori ihtiyacını belirler.',
    options: [
      { id: 'sedentary', icon: Monitor, title: 'Hareketsiz', subtitle: 'Genelde masa başındayım' },
      { id: 'light', icon: Footprints, title: 'Hafif Aktif', subtitle: 'Ara sıra yürüyüş yaparım' },
      { id: 'active', icon: Activity, title: 'Çok Aktif', subtitle: 'Sürekli hareket halindeyim' },
    ]
  },
  {
    id: 7,
    key: 'weekly_workout_frequency',
    title: 'Haftada kaç gün egzersiz yapabilirsin?',
    options: [
      { id: '1-2', icon: Calendar, title: '1-2 Gün', subtitle: 'Hafif tempoda başlangıç' },
      { id: '3-4', icon: Flame, title: '3-4 Gün', subtitle: 'Düzenli ve dengeli' },
      { id: '5+', icon: Rocket, title: '5+ Gün', subtitle: 'Yoğun ve disiplinli' },
    ]
  },
  {
    id: 8,
    key: 'primary_motivation',
    title: 'Seni en çok ne motive eder?',
    options: [
      { id: 'looks', icon: Sparkles, title: 'Daha iyi görünmek' },
      { id: 'energy', icon: Battery, title: 'Daha enerjik hissetmek' },
      { id: 'health', icon: Shield, title: 'Sağlık sorunlarını önlemek' },
      { id: 'mental', icon: Brain, title: 'Mental olarak rahatlamak' },
    ]
  },
  {
    id: 9,
    key: 'diet_habit',
    title: 'Diyet alışkanlıkların nasıl?',
    options: [
      { id: 'everything', icon: Utensils, title: 'Her şeyi yerim', subtitle: 'Özel bir kısıtlamam yok' },
      { id: 'vegetarian', icon: Leaf, title: 'Vejetaryen', subtitle: 'Et tüketmiyorum' },
      { id: 'vegan', icon: Sun, title: 'Vegan', subtitle: 'Hayvansal gıda tüketmiyorum' },
      { id: 'healthy', icon: Apple, title: 'Sadece sağlıklı', subtitle: 'İşlenmiş gıdalardan uzak dururum' },
    ]
  },
  {
    id: 10,
    key: 'sleep_hours',
    title: 'Günde ortalama kaç saat uyuyorsun?',
    subtitle: 'Uyku, kas gelişimi ve kilo kontrolü için kritiktir.',
    options: [
      { id: '<5', icon: Battery, title: '5 saatten az' },
      { id: '5-7', icon: Bed, title: '5 - 7 saat arası' },
      { id: '7-9', icon: Moon, title: '7 - 9 saat arası' },
      { id: '>9', icon: Smile, title: '9 saatten fazla' },
    ]
  },
  {
    id: 11,
    key: 'daily_stress_level',
    title: 'Günlük stres seviyen genel olarak nasıl?',
    options: [
      { id: 'high', icon: Flame, title: 'Çok yüksek', subtitle: 'Sürekli baskı altındayım' },
      { id: 'medium', icon: TrendingUp, title: 'Orta', subtitle: 'Zaman zaman stresli oluyorum' },
      { id: 'low', icon: Smile, title: 'Düşük', subtitle: 'Genelde rahatım' },
    ]
  },
  {
    id: 12,
    key: 'daily_water',
    title: 'Günlük su tüketimin ne kadar?',
    options: [
      { id: 'low', icon: Droplet, title: '1 Litreden az', subtitle: 'Genelde unutuyorum' },
      { id: 'medium', icon: Coffee, title: '1 - 2 Litre', subtitle: 'Dikkat etmeye çalışıyorum' },
      { id: 'high', icon: Waves, title: '2 Litreden fazla', subtitle: 'Su içmek benim için rutin' },
    ]
  },
  {
    id: 13,
    key: 'bad_habit',
    title: 'Hangi kötü alışkanlıkla mücadele ediyorsun?',
    subtitle: 'Dürüst ol, bu aramızda kalacak.',
    options: [
      { id: 'sugar', icon: Flame, title: 'Şekerli gıdalar ve tatlılar' },
      { id: 'fastfood', icon: Utensils, title: 'Fast food ve abur cubur' },
      { id: 'irregular', icon: Clock, title: 'Düzensiz öğün saatleri' },
      { id: 'night', icon: Moon, title: 'Gece geç saatte yeme' },
      { id: 'none', icon: CheckCircle, title: 'Hiçbiri, oldukça iradeliyim' },
    ]
  },
  {
    id: 14,
    key: 'preferred_exercise',
    title: 'Ne tür egzersizleri seversin?',
    options: [
      { id: 'cardio', icon: Activity, title: 'Kardiyo ve Koşu' },
      { id: 'strength', icon: Dumbbell, title: 'Ağırlık ve Güç Antrenmanı' },
      { id: 'yoga', icon: HeartPulse, title: 'Yoga ve Pilates' },
      { id: 'hiit', icon: Timer, title: 'HIIT (Yüksek Yoğunluklu)' },
    ]
  },
  {
    id: 15,
    key: 'daily_time',
    title: 'Lotus için günde ne kadar zaman ayırabilirsin?',
    subtitle: 'Sana özel programın süresini buna göre ayarlayacağız.',
    options: [
      { id: '15m', icon: Zap, title: 'Günde 15 dakika' },
      { id: '30m', icon: Timer, title: 'Günde 30 dakika' },
      { id: '45m+', icon: Clock, title: 'Günde 45 dakika veya daha fazla' },
    ]
  }
];
