import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', paddingHorizontal: 16 },
  title: { fontSize: 24, fontWeight: '800', color: '#0F172A', marginBottom: 6 },
  subtitle: { fontSize: 14, color: '#64748B', marginBottom: 16, lineHeight: 20 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 14,
    marginBottom: 10,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  label: { fontSize: 13, color: '#64748B' },
  value: { fontSize: 13, color: '#0F172A', fontWeight: '700' },
  notes: { marginTop: 8, fontSize: 13, color: '#334155', lineHeight: 19 },
  emptyText: { fontSize: 14, color: '#475569', backgroundColor: '#FFFFFF', padding: 14, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0' },
});
