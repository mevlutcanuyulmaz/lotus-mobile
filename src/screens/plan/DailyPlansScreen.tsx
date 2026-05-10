import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppToast from '../../components/AppToast';
import AppTopBar from '../../components/AppTopBar';
import { DailyPlanResponse, WeeklyPlanResponse } from '../../types/plan';
import { PlanValidateResponse } from '../../types/safety';
import { fetchDailyPlansAction } from './DailyPlansScreen.actions';
import { validateWeeklyPlanSafetyAction } from './DailyPlansScreen.safety.actions';
import { styles } from './DailyPlansScreen.styles';

const DailyPlansScreen = ({ navigation, route }: any) => {
  const insets = useSafeAreaInsets();
  const weeklyPlan = route?.params?.weeklyPlan as WeeklyPlanResponse;
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState<DailyPlanResponse[]>([]);
  const [safetyResult, setSafetyResult] = useState<PlanValidateResponse | null>(null);
  const [toast, setToast] = useState({
    visible: false,
    title: '',
    message: '',
    type: 'success' as 'success' | 'error',
  });

  const loadDays = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchDailyPlansAction(weeklyPlan.id);
      setDays(data);
    } catch (error: any) {
      setToast({
        visible: true,
        title: 'Hata',
        message: error?.message || 'Gün planları alınamadı.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  }, [weeklyPlan.id]);

  const loadSafety = useCallback(async () => {
    try {
      const result = await validateWeeklyPlanSafetyAction(weeklyPlan.id);
      setSafetyResult(result);
    } catch (error: any) {
      setToast({
        visible: true,
        title: 'Safety Uyarısı',
        message: error?.message || 'Safety doğrulaması alınamadı.',
        type: 'error',
      });
    }
  }, [weeklyPlan.id]);

  useEffect(() => {
    loadDays();
    loadSafety();
  }, [loadDays, loadSafety]);

  const riskStyle =
    safetyResult?.risk_level === 'high'
      ? styles.riskHigh
      : safetyResult?.risk_level === 'medium'
        ? styles.riskMedium
        : styles.riskLow;

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
      <AppTopBar title={weeklyPlan.title} onBack={() => navigation.goBack()} containerStyle={styles.topBar} />
      <Text style={styles.subtitle}>Bu haftadaki gün planlarını görüntüleyip egzersiz detayına geçebilirsin.</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {safetyResult ? (
          <View style={[styles.safetyCard, riskStyle]}>
            <Text style={styles.safetyTitle}>Safety Kontrolü</Text>
            <Text style={styles.safetyText}>Risk Seviyesi: {safetyResult.risk_level}</Text>
            <Text style={styles.safetyText}>Tespit Edilen Issue: {safetyResult.issue_count}</Text>
            {safetyResult.issues.slice(0, 2).map((issue) => (
              <View key={issue.plan_exercise_id} style={styles.issueItem}>
                <Text style={styles.issueMessage}>{issue.message}</Text>
                <Text style={styles.issueReco}>Öneri: {issue.recommendation}</Text>
              </View>
            ))}
          </View>
        ) : null}

        {days.length === 0 ? (
          <Text style={styles.emptyText}>Bu haftada henüz daily plan yok.</Text>
        ) : (
          days.map((day) => (
            <TouchableOpacity
              key={day.id}
              style={styles.card}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('DayExercises', { dailyPlan: day })}
            >
              <Text style={styles.dayTitle}>Gün {day.day_index} {day.day_name ? `- ${day.day_name}` : ''}</Text>
              <Text style={styles.meta}>Odak: {day.focus_area || '-'}</Text>
              <Text style={styles.meta}>Tahmini süre: {day.estimated_minutes ? `${day.estimated_minutes} dk` : '-'}</Text>
              <Text style={styles.openText}>Egzersizleri Aç</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default DailyPlansScreen;
