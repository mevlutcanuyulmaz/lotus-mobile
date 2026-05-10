import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppToast from '../../components/AppToast';
import AppTopBar from '../../components/AppTopBar';
import { ProfileResponse } from '../../types/profile';
import { AuthUser } from '../../services/auth';
import { fetchProfileSummaryAction, submitLogoutAction } from './ProfileSummaryScreen.actions';
import { formatFitnessGoal } from '../../utils/goalFormatters';
import { styles } from './ProfileSummaryScreen.styles';

type Props = {
  onLogout: () => void;
  navigation: any;
};

const formatValue = (value: string | number | null | undefined) => {
  if (value === null || value === undefined || value === '') {
    return '-';
  }
  return String(value);
};

const formatGender = (value?: string | null) => {
  if (!value) return '-';
  const normalized = value.trim().toLowerCase();
  if (normalized === 'male' || normalized === 'erkek') return 'Erkek';
  if (normalized === 'female' || normalized === 'kadin' || normalized === 'kadın') return 'Kadın';
  return value;
};

const ProfileSummaryScreen = ({ onLogout, navigation }: Props) => {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [toast, setToast] = useState<{
    visible: boolean;
    title: string;
    message: string;
    type: 'success' | 'error';
  }>({
    visible: false,
    title: '',
    message: '',
    type: 'success',
  });

  const loadSummary = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchProfileSummaryAction();
      setUser(data.user);
      setProfile(data.profile);
    } catch (error: any) {
      setToast({
        visible: true,
        title: 'Hata',
        message: error?.message || 'Profil bilgileri alınamadı.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSummary();
  }, [loadSummary]);

  const handleLogout = async () => {
    await submitLogoutAction();
    onLogout();
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingWrap, { paddingTop: insets.top, paddingBottom: Math.max(insets.bottom, 20) }]}>
        <ActivityIndicator size="large" color="#7C3AED" />
        <Text style={styles.loadingText}>Profil bilgileri yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8, paddingBottom: Math.max(insets.bottom, 20) }]}>
      <AppToast
        visible={toast.visible}
        title={toast.title}
        message={toast.message}
        type={toast.type}
        onHide={() => setToast(prev => ({ ...prev, visible: false }))}
      />
      <AppTopBar title="Profil Özeti" onBack={() => navigation.goBack()} containerStyle={styles.topBar} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Hesap Bilgisi</Text>
          <View style={styles.row}>
            <Text style={styles.keyText}>E-posta</Text>
            <Text style={styles.valueText}>{formatValue(user?.email)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.keyText}>Ad Soyad</Text>
            <Text style={styles.valueText}>{formatValue(user?.full_name)}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Profil</Text>
          <View style={styles.row}>
            <Text style={styles.keyText}>Cinsiyet</Text>
            <Text style={styles.valueText}>{formatGender(profile?.gender)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.keyText}>Yaş</Text>
            <Text style={styles.valueText}>{formatValue(profile?.age)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.keyText}>Boy (cm)</Text>
            <Text style={styles.valueText}>{formatValue(profile?.height_cm)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.keyText}>Kilo (kg)</Text>
            <Text style={styles.valueText}>{formatValue(profile?.weight_kg)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.keyText}>Hedef</Text>
            <Text style={styles.valueText}>{formatFitnessGoal(profile?.fitness_goal)}</Text>
          </View>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.neutralButton} onPress={() => navigation.navigate('WeeklyPlans')} activeOpacity={0.8}>
            <Text style={styles.neutralButtonText}>Planlarımı Gör</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.primaryButton} onPress={handleLogout} activeOpacity={0.8}>
            <Text style={styles.primaryButtonText}>Çıkış Yap</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileSummaryScreen;
