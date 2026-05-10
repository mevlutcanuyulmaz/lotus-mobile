import { StyleSheet } from 'react-native';
import { appTheme } from '../../theme/appTheme';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: appTheme.colors.pageBg, paddingHorizontal: 16 },
  topBar: { marginBottom: 6 },
  subtitle: { fontSize: 14, color: appTheme.colors.textSecondary, marginBottom: 16, lineHeight: 20 },
  safetyCard: {
    backgroundColor: appTheme.colors.cardBg,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: appTheme.colors.cardBorder,
    padding: 14,
    marginBottom: 12,
  },
  safetyTitle: { fontSize: 15, fontWeight: '700', color: appTheme.colors.textPrimary, marginBottom: 4 },
  safetyText: { fontSize: 13, color: appTheme.colors.textSecondary, lineHeight: 19, marginBottom: 4 },
  riskLow: {
    borderColor: '#86EFAC',
    backgroundColor: '#F0FDF4',
  },
  riskMedium: {
    borderColor: '#FDE68A',
    backgroundColor: '#FFFBEB',
  },
  riskHigh: {
    borderColor: '#FCA5A5',
    backgroundColor: '#FEF2F2',
  },
  issueItem: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: appTheme.colors.cardBorder,
    paddingTop: 8,
  },
  issueMessage: { fontSize: 13, color: appTheme.colors.textPrimary, marginBottom: 4 },
  issueReco: { fontSize: 12, color: appTheme.colors.textSecondary },
  card: {
    backgroundColor: appTheme.colors.cardBg,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: appTheme.colors.cardBorder,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#6D5DFB',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 2,
  },
  dayTitle: { fontSize: 16, fontWeight: '700', color: appTheme.colors.textPrimary, marginBottom: 4 },
  meta: { fontSize: 13, color: appTheme.colors.textSecondary, marginBottom: 2 },
  openText: { color: appTheme.colors.primaryDark, fontWeight: '700', fontSize: 13, marginTop: 6 },
  emptyText: { fontSize: 14, color: appTheme.colors.textSecondary, backgroundColor: appTheme.colors.cardBg, padding: 14, borderRadius: 12, borderWidth: 1, borderColor: appTheme.colors.cardBorder },
});
