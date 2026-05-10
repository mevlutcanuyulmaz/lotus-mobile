import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppTopBar from '../../components/AppTopBar';
import AppToast from '../../components/AppToast';
import { RetrievalSearchResponse } from '../../types/retrieval';
import { submitRetrievalSearchAction } from './RetrievalSearchScreen.actions';
import { styles } from './RetrievalSearchScreen.styles';

const RetrievalSearchScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<RetrievalSearchResponse | null>(null);
  const [toast, setToast] = useState({
    visible: false,
    title: '',
    message: '',
    type: 'success' as 'success' | 'error',
  });

  const handleSearch = async () => {
    if (query.trim().length < 2) {
      setToast({
        visible: true,
        title: 'Uyarı',
        message: 'Arama metni en az 2 karakter olmalı.',
        type: 'error',
      });
      return;
    }

    try {
      setLoading(true);
      const response = await submitRetrievalSearchAction(query, 10);
      setData(response);
    } catch (error: any) {
      setToast({
        visible: true,
        title: 'Arama Hatası',
        message: error?.message || 'Retrieval araması başarısız.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8, paddingBottom: Math.max(insets.bottom, 20) }]}>
      <AppToast
        visible={toast.visible}
        title={toast.title}
        message={toast.message}
        type={toast.type}
        onHide={() => setToast(prev => ({ ...prev, visible: false }))}
      />
      <AppTopBar title="Semantic Arama" onBack={() => navigation.goBack()} containerStyle={styles.topBar} />
      <Text style={styles.subtitle}>Sorgu yaz ve benzer segmentleri skorları ile getir.</Text>

      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          placeholder="örn: beginner hip opening sequence"
          placeholderTextColor="#94A3B8"
        />
        <TouchableOpacity style={styles.button} onPress={handleSearch} activeOpacity={0.8} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Aranıyor' : 'Ara'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {!data ? (
          <Text style={styles.emptyText}>Henüz arama yapılmadı.</Text>
        ) : data.result_count === 0 ? (
          <Text style={styles.emptyText}>Sonuç bulunamadı.</Text>
        ) : (
          data.results.map((item) => (
            <View key={item.segment_id} style={styles.resultCard}>
              <Text style={styles.resultTitle}>{item.exercise_name}</Text>
              <Text style={styles.resultMeta}>Score: {item.score.toFixed(4)}</Text>
              <Text style={styles.resultMeta}>Segment: {item.segment_id} | Exercise: {item.exercise_id}</Text>
              <Text style={styles.resultMeta}>Frame: {item.frame_start} - {item.frame_end}</Text>
              <Text style={styles.resultText}>{item.text}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default RetrievalSearchScreen;
