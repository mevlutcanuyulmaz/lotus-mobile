import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 16 : 8,
    paddingBottom: 24,
  },
  topBar: {
    marginBottom: 24,
  },
  topBarTitle: {
    fontSize: 20,
    fontWeight: '800',
  },
  progressContainer: {
    width: 130,
    height: 4,
    backgroundColor: '#EDF2F7',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#805AD5',
    borderRadius: 2,
  },
  stepIndicator: {
    fontSize: 14,
    fontWeight: '600',
    color: '#805AD5',
    marginBottom: 8,
    letterSpacing: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A202C',
    lineHeight: 36,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#718096',
    lineHeight: 22,
  },
  optionsContainer: {
    paddingHorizontal: 24,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  optionCardSelected: {
    backgroundColor: '#FAF5FF',
    borderColor: '#805AD5',
    shadowColor: '#805AD5',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  optionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F7FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionIconContainerSelected: {
    backgroundColor: '#FFFFFF',
  },
  optionIcon: {
    fontSize: 24,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D3748',
  },
  optionTitleSelected: {
    color: '#553C9A',
  },
  optionSubtitle: {
    fontSize: 13,
    color: '#718096',
    marginTop: 4,
  },
  optionSubtitleSelected: {
    color: '#805AD5',
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F7FAFC',
  },
  nextButton: {
    backgroundColor: '#805AD5',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#805AD5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  nextButtonDisabled: {
    backgroundColor: '#E2E8F0',
    shadowOpacity: 0,
    elevation: 0,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
