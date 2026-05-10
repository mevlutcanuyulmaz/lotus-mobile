import { StyleSheet } from 'react-native';
import { appTheme } from '../../theme/appTheme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appTheme.colors.pageBg,
    paddingHorizontal: 16,
  },
  topBar: {
    marginBottom: 12,
  },
  card: {
    backgroundColor: appTheme.colors.cardBg,
    borderRadius: appTheme.radius.xl,
    borderWidth: 1,
    borderColor: appTheme.colors.cardBorder,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#0F172A',
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: appTheme.colors.textPrimary,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    gap: 10,
  },
  keyText: {
    fontSize: 14,
    color: appTheme.colors.textSecondary,
    flex: 1,
  },
  valueText: {
    fontSize: 14,
    color: appTheme.colors.textPrimary,
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  loadingWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  loadingText: {
    fontSize: 15,
    color: appTheme.colors.textSecondary,
  },
  actionRow: {
    marginTop: 8,
    gap: 10,
    marginBottom: 8,
  },
  primaryButton: {
    backgroundColor: appTheme.colors.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#6D5DFB',
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 14,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  neutralButton: {
    backgroundColor: '#E7EEFF',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  neutralButtonText: {
    color: appTheme.colors.primaryDark,
    fontSize: 15,
    fontWeight: '700',
  },
});
