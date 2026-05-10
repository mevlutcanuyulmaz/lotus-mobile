import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './WelcomeScreen.styles';

import { Flower } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: Math.max(insets.bottom, 24) }]}>
      <View style={styles.topSection}>
        <View style={styles.logoContainer}>
          <Flower size={48} color="#805AD5" style={{ marginBottom: 8 }} />
          <Text style={styles.logoText}>Lotus</Text>
        </View>
      </View>

      <View style={styles.middleSection}>
        <Text style={styles.mainTitle}>İçindeki gücü{'\n'}uyandır.</Text>
        <Text style={styles.subtitle}>
          Kişiselleştirilmiş sağlıklı yaşam asistanın ile hedeflerine ulaş.
        </Text>
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity 
          style={styles.primaryButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('SubscriptionCheck')}
        >
          <Text style={styles.primaryButtonText}>Yolculuğa Başla</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.secondaryButtonText}>Zaten bir hesabım var</Text>
        </TouchableOpacity>
        
        <Text style={styles.termsText}>
          Devam ederek <Text style={styles.linkText}>Kullanım Koşulları</Text> ve <Text style={styles.linkText}>Gizlilik Politikası</Text>'nı kabul etmiş olursunuz.
        </Text>
      </View>
    </View>
  );
};

export default WelcomeScreen;
