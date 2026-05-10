import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFFFFF' 
  },
  topSection: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  logoContainer: { 
    alignItems: 'center' 
  },
  logoIcon: { 
    fontSize: 48, 
    marginBottom: 8 
  },
  logoText: { 
    fontSize: 28, 
    fontWeight: '600', 
    color: '#2D3748', 
    letterSpacing: 2 
  },
  middleSection: { 
    flex: 2, 
    paddingHorizontal: 32, 
    justifyContent: 'center' 
  },
  mainTitle: { 
    fontSize: 40, 
    fontWeight: '700', 
    color: '#1A202C', 
    lineHeight: 48, 
    marginBottom: 16 
  },
  subtitle: { 
    fontSize: 16, 
    color: '#718096', 
    lineHeight: 24 
  },
  bottomSection: { 
    flex: 1.5, 
    paddingHorizontal: 32, 
    justifyContent: 'flex-end', 
    paddingBottom: 20 
  },
  primaryButton: { 
    backgroundColor: '#805AD5', 
    paddingVertical: 18, 
    borderRadius: 16, 
    alignItems: 'center', 
    marginBottom: 16, 
    shadowColor: '#805AD5', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 8, 
    elevation: 5 
  },
  primaryButtonText: { 
    color: '#FFFFFF', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  secondaryButton: { 
    paddingVertical: 16, 
    borderRadius: 16, 
    alignItems: 'center', 
    marginBottom: 24, 
    backgroundColor: '#F7FAFC' 
  },
  secondaryButtonText: { 
    color: '#4A5568', 
    fontSize: 16, 
    fontWeight: '600' 
  },
  termsText: { 
    fontSize: 12, 
    color: '#A0AEC0', 
    textAlign: 'center', 
    lineHeight: 18 
  },
  linkText: { 
    color: '#805AD5', 
    fontWeight: '500' 
  },
});
