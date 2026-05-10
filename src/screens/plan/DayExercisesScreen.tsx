import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppToast from '../../components/AppToast';
import { DailyPlanResponse, PlanExerciseResponse } from '../../types/plan';
import { fetchDayExercisesAction } from './DayExercisesScreen.actions';
import { styles } from './DayExercisesScreen.styles';

const DayExercisesScreen = ({ route }: any) => {
  const insets = useSafeAreaInsets();
  const dailyPlan = route?.params?.dailyPlan as DailyPlanResponse;
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<PlanExerciseResponse[]>([]);
  const [toast, setToast] = useState({
    visible: false,
    title: '',
    message: '',
    type: 'success' as 'success' | 'error',
  });

  const loadExercises = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchDayExercisesAction(dailyPlan.id);
      setItems(data);
    } catch (error: any) {
      setToast({
        visible: true,
        title: 'Hata',
        message: error?.message || 'Egzersizler alınamadı.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  }, [dailyPlan.id]);

  useEffect(() => {
    loadExercises();
  }, [loadExercises]);

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
      <Text style={styles.title}>Gün {dailyPlan.day_index} Egzersizleri</Text>
      <Text style={styles.subtitle}>Sıra, set/tekrar ve dinlenme bilgilerini burada görebilirsin.</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {items.length === 0 ? (
          <Text style={styles.emptyText}>Bu gün için planlanmış egzersiz bulunamadı.</Text>
        ) : (
          items.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.row}>
                <Text style={styles.label}>Sıra</Text>
                <Text style={styles.value}>{item.order_index}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Exercise ID</Text>
                <Text style={styles.value}>{item.exercise_id ?? '-'}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Set / Tekrar</Text>
                <Text style={styles.value}>{item.sets ?? '-'} / {item.reps ?? '-'}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Süre / Dinlenme</Text>
                <Text style={styles.value}>{item.duration_seconds ?? '-'} sn / {item.rest_seconds ?? '-'} sn</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Yoğunluk</Text>
                <Text style={styles.value}>{item.intensity_level ?? '-'}</Text>
              </View>
              {item.notes ? <Text style={styles.notes}>Not: {item.notes}</Text> : null}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default DayExercisesScreen;
