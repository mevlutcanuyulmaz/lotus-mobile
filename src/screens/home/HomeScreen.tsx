import React, { useEffect, useState } from 'react';
import { ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CalendarDays, Dumbbell, UserRound } from 'lucide-react-native';
import AppToast from '../../components/AppToast';
import { AuthUser } from '../../services/auth';
import { fetchHomeUserAction, fetchTodayDailyPlanAction, submitHomeLogoutAction } from './HomeScreen.actions';
import { styles } from './HomeScreen.styles';

type Props = {
  navigation: any;
  onLogout: () => void;
};

const HomeScreen = ({ navigation, onLogout }: Props) => {
  const insets = useSafeAreaInsets();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [toast, setToast] = useState({
    visible: false,
    title: '',
    message: '',
    type: 'success' as 'success' | 'error',
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await fetchHomeUserAction();
        setUser(currentUser);
      } catch (error: any) {
        setToast({
          visible: true,
          title: 'Hata',
          message: error?.message || 'Kullanıcı bilgisi alınamadı.',
          type: 'error',
        });
      }
    };

    loadUser();
  }, []);

  const handleLogout = async () => {
    await submitHomeLogoutAction();
    onLogout();
  };

  const handleOpenTodayPlan = async () => {
    try {
      const todayDailyPlan = await fetchTodayDailyPlanAction();
      navigation.navigate('DayExercises', { dailyPlan: todayDailyPlan });
    } catch (error: any) {
      setToast({
        visible: true,
        title: 'Plan Bilgisi',
        message: error?.message || 'Bugünün planı bulunamadı. Haftalık planlarından devam edebilirsin.',
        type: 'error',
      });
      navigation.navigate('WeeklyPlans');
    }
  };

  const shortcuts = [
    {
      key: 'weekly-plans',
      title: 'Plan Akışı',
      description: 'Haftalık planını ve günlerini aç.',
      previewLabel: 'Haftalık',
      onPress: () => navigation.navigate('WeeklyPlans'),
      icon: CalendarDays,
      previewImage: require('../../assets/images/home/haftalikplan.png'),
    },
    {
      key: 'profile',
      title: 'Profil Özeti',
      description: 'Hesap ve onboarding bilgilerini gör.',
      previewLabel: 'Profil',
      onPress: () => navigation.navigate('ProfileSummary'),
      icon: UserRound,
      previewImage: require('../../assets/images/home/profil.png'),
    },
    {
      key: 'today-plan',
      title: 'Bugünün Planı',
      description: 'Bugünkü egzersiz listene direkt geç.',
      previewLabel: 'Bugün',
      onPress: handleOpenTodayPlan,
      icon: CalendarDays,
      previewImage: require('../../assets/images/home/bugunlukplan.png'),
    },
    {
      key: 'exercise',
      title: 'Exercise Katalog',
      description: 'Hareketleri ve videoları incele.',
      onPress: () => navigation.navigate('ExerciseCatalog'),
      icon: Dumbbell,
      previewLabel: 'Katalog',
      previewImage: require('../../assets/images/home/exercisekatalog.png'),
    },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8, paddingBottom: Math.max(insets.bottom, 20) }]}>
      <AppToast
        visible={toast.visible}
        title={toast.title}
        message={toast.message}
        type={toast.type}
        onHide={() => setToast(prev => ({ ...prev, visible: false }))}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Hoş geldin{user?.full_name ? `, ${user.full_name}` : ''}</Text>
          <Text style={styles.subtitle}>Bugün ne yapmak istersin? Aşağıdan hızlıca bir alan seçebilirsin.</Text>
        </View>

        <View style={styles.grid}>
          {shortcuts.map(item => {
            const Icon = item.icon;
            return (
              <TouchableOpacity key={item.key} style={styles.tile} activeOpacity={0.9} onPress={item.onPress}>
                <ImageBackground source={item.previewImage} style={styles.preview} imageStyle={styles.previewImage}>
                  <View style={styles.previewOverlay} />
                  <View style={styles.previewBadge}>
                    <Icon size={14} color="#FFFFFF" />
                    <Text style={styles.previewBadgeText}>{item.previewLabel}</Text>
                  </View>
                </ImageBackground>
                <Text style={styles.tileTitle}>{item.title}</Text>
                <Text style={styles.tileDescription}>{item.description}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity style={styles.dangerButton} onPress={handleLogout} activeOpacity={0.8}>
          <Text style={styles.dangerButtonText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
