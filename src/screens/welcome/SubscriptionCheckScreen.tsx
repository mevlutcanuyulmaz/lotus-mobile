import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './SubscriptionCheckScreen.styles';

import { Sparkles, Key } from 'lucide-react-native';

const SubscriptionCheckScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: Math.max(insets.bottom, 24) }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Hoş Geldiniz</Text>
        <Text style={styles.subtitle}>Sizin için en uygun deneyimi hazırlayabilmemiz için lütfen durumunuzu seçin.</Text>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity 
          style={[styles.card, styles.primaryCard]}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('Onboarding')}
        >
          <View style={styles.cardIconContainer}>
            <Sparkles size={24} color="#805AD5" />
          </View>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitlePrimary}>Yeni Başlıyorum</Text>
            <Text style={styles.cardSubtitlePrimary}>Bana özel program oluştur</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.card}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Login')}
        >
          <View style={styles.cardIconContainerDark}>
            <Key size={24} color="#4A5568" />
          </View>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>Zaten Üyeyim</Text>
            <Text style={styles.cardSubtitle}>Kayıtlı hesabımla giriş yap</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SubscriptionCheckScreen;
