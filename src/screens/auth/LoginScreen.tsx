import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowRight } from 'lucide-react-native';
import { styles } from './LoginScreen.styles';
import { OnboardingProfilePayload } from '../../types/profile';
import { submitLoginAction } from './LoginScreen.actions';
import AppToast from '../../components/AppToast';
import AppTopBar from '../../components/AppTopBar';
import { clearRememberedLogin, getRememberedLogin, saveRememberedLogin } from '../../services/auth';

const LoginScreen = ({ navigation, route, onAuthenticated }: any) => {
  const insets = useSafeAreaInsets();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
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

  const onboardingPayload = route?.params?.onboardingPayload as OnboardingProfilePayload | undefined;
  const isFormValid = email.length > 0 && password.length > 0 && !isSubmitting;

  useEffect(() => {
    const loadRememberedLogin = async () => {
      const remembered = await getRememberedLogin();
      if (!remembered) return;
      setEmail(remembered.email);
      setPassword(remembered.password);
      setRememberMe(true);
    };
    loadRememberedLogin();
  }, []);

  const handleLogin = async () => {
    try {
      setIsSubmitting(true);
      const result = await submitLoginAction({
        email,
        password,
        onboardingPayload,
      });

      if (result.didSubmitOnboardingProfile) {
        setToast({
          visible: true,
          title: 'Başarılı',
          message: 'Profilin başarıyla oluşturuldu.',
          type: 'success',
        });
      } else {
        setToast({
          visible: true,
          title: 'Başarılı',
          message: 'Giriş işlemi tamamlandı.',
          type: 'success',
        });
      }

      if (rememberMe) {
        await saveRememberedLogin({ email: email.trim(), password });
      } else {
        await clearRememberedLogin();
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
        title: 'Giriş Hatası',
        message: error?.message || 'Giriş sırasında bir hata oluştu.',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
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
        keyboardShouldPersistTaps="always"
        bounces={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <AppTopBar title="Giris" onBack={() => navigation.goBack()} containerStyle={styles.topBar} />

          <View style={styles.badge}>
            <ShieldCheck size={14} color="#6D28D9" />
            <Text style={styles.badgeText}>Güvenli Giriş</Text>
          </View>
          <Text style={styles.title}>Tekrar Hoş Geldin!</Text>
          <Text style={styles.subtitle}>
            Kaldığın yerden devam etmek için hesabına giriş yap.
          </Text>
        </View>

        {/* Form */}
        <View style={styles.formCard}>
          <View style={styles.formContainer}>
          
          {/* Email Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>E-posta Adresi</Text>
            <View style={styles.inputContainer}>
              <Mail 
                size={20} 
                color="#A0AEC0" 
                style={styles.inputIcon} 
              />
              <TextInput
                style={styles.input}
                placeholder="ornek@email.com"
                placeholderTextColor="#A0AEC0"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>

          {/* Password Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Şifre</Text>
            <View style={styles.inputContainer}>
              <Lock 
                size={20} 
                color="#A0AEC0" 
                style={styles.inputIcon} 
              />
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#A0AEC0"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity 
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
                activeOpacity={0.7}
              >
                {showPassword ? (
                  <EyeOff size={20} color="#A0AEC0" />
                ) : (
                  <Eye size={20} color="#A0AEC0" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Forgot Password */}
          <View style={styles.rememberRow}>
            <TouchableOpacity style={styles.rememberButton} activeOpacity={0.8} onPress={() => setRememberMe(prev => !prev)}>
              <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
                {rememberMe ? <Text style={styles.checkboxTick}>✓</Text> : null}
              </View>
              <Text style={styles.rememberText}>Beni Hatırla</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.forgotPasswordContainer}
            activeOpacity={0.7}
          >
            <Text style={styles.forgotPasswordText}>Şifremi Unuttum</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            style={[
              styles.loginButton,
              !isFormValid && styles.loginButtonDisabled
            ]}
            activeOpacity={0.8}
            disabled={!isFormValid}
            onPress={handleLogin}
          >
            <View style={styles.loginButtonContent}>
              <Text style={styles.loginButtonText}>
                {isSubmitting ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
              </Text>
              {!isSubmitting && <ArrowRight size={18} color="#FFFFFF" />}
            </View>
          </TouchableOpacity>

          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Hesabın yok mu?</Text>
          <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.footerLink}>Hemen Katıl</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
