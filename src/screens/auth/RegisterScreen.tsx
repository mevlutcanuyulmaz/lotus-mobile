import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react-native';

import { styles } from './RegisterScreen.styles';
import { OnboardingProfilePayload } from '../../types/profile';
import { submitRegisterAction } from './RegisterScreen.actions';
import AppToast from '../../components/AppToast';
import AppTopBar from '../../components/AppTopBar';

const RegisterScreen = ({ navigation, route, onAuthenticated }: any) => {
  const insets = useSafeAreaInsets();

  const onboardingPayload = route?.params?.onboardingPayload as OnboardingProfilePayload | undefined;

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const isFormValid =
    fullName.trim().length > 0 &&
    email.trim().length > 0 &&
    password.length >= 6 &&
    confirmPassword.length >= 6 &&
    !isSubmitting;

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setToast({
        visible: true,
        title: 'Hata',
        message: 'Şifreler eşleşmiyor.',
        type: 'error',
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const result = await submitRegisterAction({
        fullName,
        email,
        password,
        onboardingPayload,
      });

      if (result.didSubmitOnboardingProfile) {
        setToast({
          visible: true,
          title: 'Başarılı',
          message: 'Hesabın ve profilin oluşturuldu.',
          type: 'success',
        });
      } else {
        setToast({
          visible: true,
          title: 'Başarılı',
          message: 'Hesabın oluşturuldu.',
          type: 'success',
        });
      }

      setTimeout(() => {
        if (onAuthenticated) {
          onAuthenticated();
        } else {
          navigation.navigate('Welcome');
        }
      }, 700);
    } catch (error: any) {
      setToast({
        visible: true,
        title: 'Kayıt Hatası',
        message: error?.message || 'Kayıt sırasında bir hata oluştu.',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: Math.max(insets.bottom, 24) }]}>
      <AppToast
        visible={toast.visible}
        title={toast.title}
        message={toast.message}
        type={toast.type}
        onHide={() => setToast(prev => ({ ...prev, visible: false }))}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bounces={false}
      >
        <View style={styles.header}>
          <AppTopBar title="Kayit" onBack={() => navigation.goBack()} containerStyle={styles.topBar} />

          <Text style={styles.title}>Hesap Oluştur</Text>
          <Text style={styles.subtitle}>Kişisel planın için hızlıca hesabını oluşturalım.</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Ad Soyad</Text>
            <View style={[styles.inputContainer, focusedInput === 'fullName' && styles.inputContainerFocused]}>
              <User size={20} color={focusedInput === 'fullName' ? '#805AD5' : '#A0AEC0'} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Ad Soyad"
                placeholderTextColor="#A0AEC0"
                value={fullName}
                onChangeText={setFullName}
                onFocus={() => setFocusedInput('fullName')}
                onBlur={() => setFocusedInput(null)}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>E-posta Adresi</Text>
            <View style={[styles.inputContainer, focusedInput === 'email' && styles.inputContainerFocused]}>
              <Mail size={20} color={focusedInput === 'email' ? '#805AD5' : '#A0AEC0'} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="ornek@email.com"
                placeholderTextColor="#A0AEC0"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
                onFocus={() => setFocusedInput('email')}
                onBlur={() => setFocusedInput(null)}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Şifre</Text>
            <View style={[styles.inputContainer, focusedInput === 'password' && styles.inputContainerFocused]}>
              <Lock size={20} color={focusedInput === 'password' ? '#805AD5' : '#A0AEC0'} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="En az 6 karakter"
                placeholderTextColor="#A0AEC0"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput(null)}
              />
              <TouchableOpacity style={styles.eyeButton} onPress={() => setShowPassword(!showPassword)} activeOpacity={0.7}>
                {showPassword ? <EyeOff size={20} color="#A0AEC0" /> : <Eye size={20} color="#A0AEC0" />}
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Şifre Tekrar</Text>
            <View style={[styles.inputContainer, focusedInput === 'confirmPassword' && styles.inputContainerFocused]}>
              <Lock
                size={20}
                color={focusedInput === 'confirmPassword' ? '#805AD5' : '#A0AEC0'}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Şifreni tekrar gir"
                placeholderTextColor="#A0AEC0"
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                onFocus={() => setFocusedInput('confirmPassword')}
                onBlur={() => setFocusedInput(null)}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                activeOpacity={0.7}
              >
                {showConfirmPassword ? <EyeOff size={20} color="#A0AEC0" /> : <Eye size={20} color="#A0AEC0" />}
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.registerButton, !isFormValid && styles.registerButtonDisabled]}
            activeOpacity={0.8}
            disabled={!isFormValid}
            onPress={handleRegister}
          >
            <Text style={styles.registerButtonText}>{isSubmitting ? 'Hesap Oluşturuluyor...' : 'Hesap Oluştur'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Zaten hesabın var mı?</Text>
          <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.footerLink}>Giriş Yap</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default RegisterScreen;
