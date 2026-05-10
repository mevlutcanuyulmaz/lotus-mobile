import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppToast from '../../components/AppToast';
import AppTopBar from '../../components/AppTopBar';
import { WeeklyPlanResponse } from '../../types/plan';
import { formatFitnessGoal } from '../../utils/goalFormatters';
import { createStarterWeeklyPlanAction, fetchWeeklyPlansAction } from './WeeklyPlansScreen.actions';
import { styles } from './WeeklyPlansScreen.styles';

const formatDateRange = (start?: string | null, end?: string | null) => {
  if (!start && !end) return '-';
  return `${start ?? '-'} / ${end ?? '-'}`;
};

const WeeklyPlansScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [plans, setPlans] = useState<WeeklyPlanResponse[]>([]);
  const [toast, setToast] = useState({
    visible: false,
    title: '',
    message: '',
    type: 'success' as 'success' | 'error',
  });

  const loadPlans = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchWeeklyPlansAction();
      setPlans(data);
    } catch (error: any) {
      setToast({
        visible: true,
        title: 'Hata',
        message: error?.message || 'Haftalık planlar alınamadı.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPlans();
  }, [loadPlans]);

  const handleCreateStarter = async () => {
    try {
      setCreating(true);
      await createStarterWeeklyPlanAction();
      setToast({
        visible: true,
        title: 'Başarılı',
        message: 'Örnek haftalık plan oluşturuldu.',
        type: 'success',
      });
      await loadPlans();
    } catch (error: any) {
      setToast({
        visible: true,
        title: 'Hata',
        message: error?.message || 'Plan oluşturulamadı.',
        type: 'error',
      });
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { paddingTop: insets.top, justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#7C3AED" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top + 6, paddingBottom: Math.max(insets.bottom, 20) }]}>
      <AppToast
        visible={toast.visible}
        title={toast.title}
        message={toast.message}
        type={toast.type}
        onHide={() => setToast(prev => ({ ...prev, visible: false }))}
      />
      <AppTopBar title="Haftalık Planlarım" onBack={() => navigation.goBack()} containerStyle={styles.topBar} />
      <Text style={styles.subtitle}>Planını seç, günlerine ve egzersizlerine adım adım geç.</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {plans.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>Henüz haftalık planın yok. Hızlıca başlangıç planı oluşturabilirsin.</Text>
            <TouchableOpacity style={styles.primaryButton} onPress={handleCreateStarter} disabled={creating} activeOpacity={0.8}>
              <Text style={styles.primaryButtonText}>{creating ? 'Oluşturuluyor...' : 'Başlangıç Planı Oluştur'}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          plans.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              style={styles.card}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('DailyPlans', { weeklyPlan: plan })}
            >
              <Text style={styles.cardTitle}>{plan.title}</Text>
              <Text style={styles.cardMeta}>Tarih: {formatDateRange(plan.start_date, plan.end_date)}</Text>
              <Text style={styles.cardMeta}>Hedef: {formatFitnessGoal(plan.goal)}</Text>
              <View style={styles.row}>
                <View style={styles.pill}>
                  <Text style={styles.pillText}>{plan.status}</Text>
                </View>
                <Text style={styles.openText}>Günleri Aç</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default WeeklyPlansScreen;
