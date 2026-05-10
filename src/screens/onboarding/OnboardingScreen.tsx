import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated, LayoutAnimation, Platform, UIManager } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './OnboardingScreen.styles';
import { ONBOARDING_QUESTIONS } from './questions';
import { mapAnswersToProfilePayload } from './onboardingMapper';
import AppToast from '../../components/AppToast';
import AppTopBar from '../../components/AppTopBar';

// Android için LayoutAnimation aktif etme
// "fabric" nesnesi üzerinden yeni mimari kontrolü yapıyoruz.
const isFabric = (globalThis as any)?.RN$Bridgeless === true;

if (Platform.OS === 'android' && !isFabric && UIManager.setLayoutAnimationEnabledExperimental) {
  try {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  } catch (e) {
    console.log('LayoutAnimation could not be enabled', e);
  }
}

const OnboardingScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
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

  const currentQuestion = ONBOARDING_QUESTIONS[currentStep];
  const progressPercentage = ((currentStep + 1) / ONBOARDING_QUESTIONS.length) * 100;

  const animateTransition = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        250,
        LayoutAnimation.Types.easeInEaseOut,
        LayoutAnimation.Properties.opacity
      )
    );
  };

  const handleSelectOption = (optionId: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.key]: optionId
    }));
  };

  const handleNext = () => {
    if (currentStep < ONBOARDING_QUESTIONS.length - 1) {
      animateTransition();
      setCurrentStep(prev => prev + 1);
    } else {
      try {
        const onboardingPayload = mapAnswersToProfilePayload(answers);
        navigation.navigate('Register', { onboardingPayload });
      } catch (error) {
        setToast({
          visible: true,
          title: 'Hata',
          message: 'Profil verisi hazırlanırken bir hata oluştu. Lütfen tekrar deneyin.',
          type: 'error',
        });
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      animateTransition();
      setCurrentStep(prev => prev - 1);
    } else {
      navigation.goBack();
    }
  };

  const isCurrentQuestionAnswered = !!answers[currentQuestion.key];

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: Math.max(insets.bottom, 24) }]}>
      <AppToast
        visible={toast.visible}
        title={toast.title}
        message={toast.message}
        type={toast.type}
        onHide={() => setToast(prev => ({ ...prev, visible: false }))}
      />
      
      {/* Header & Progress */}
      <View style={styles.header}>
        <AppTopBar
          title="Profil Testi"
          onBack={handleBack}
          containerStyle={styles.topBar}
          titleStyle={styles.topBarTitle}
          rightContent={
            <View style={styles.progressContainer}>
              <Animated.View style={[styles.progressBar, { width: `${progressPercentage}%` }]} />
            </View>
          }
        />

        <View>
          <Text style={styles.stepIndicator}>Adım {currentStep + 1} / {ONBOARDING_QUESTIONS.length}</Text>
          <Text style={styles.title}>{currentQuestion.title}</Text>
          {currentQuestion.subtitle && (
            <Text style={styles.subtitle}>{currentQuestion.subtitle}</Text>
          )}
        </View>
      </View>

      {/* Options */}
      <ScrollView 
        style={styles.optionsContainer} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View>
          {currentQuestion.options.map((option) => {
            const isSelected = answers[currentQuestion.key] === option.id;
            const IconComponent = option.icon;

            return (
              <TouchableOpacity
                key={option.id}
                activeOpacity={0.7}
                style={[
                  styles.optionCard,
                  isSelected && styles.optionCardSelected
                ]}
                onPress={() => handleSelectOption(option.id)}
              >
                <View style={[styles.optionIconContainer, isSelected && styles.optionIconContainerSelected]}>
                  <IconComponent size={24} color={isSelected ? "#805AD5" : "#4A5568"} />
                </View>
                <View style={styles.optionTextContainer}>
                  <Text style={[styles.optionTitle, isSelected && styles.optionTitleSelected]}>
                    {option.title}
                  </Text>
                  {option.subtitle && (
                    <Text style={[styles.optionSubtitle, isSelected && styles.optionSubtitleSelected]}>
                      {option.subtitle}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.nextButton, !isCurrentQuestionAnswered && styles.nextButtonDisabled]}
          activeOpacity={0.8}
          disabled={!isCurrentQuestionAnswered}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>
            {currentStep === ONBOARDING_QUESTIONS.length - 1 ? 'Testi Tamamla' : 'Devam Et'}
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default OnboardingScreen;
