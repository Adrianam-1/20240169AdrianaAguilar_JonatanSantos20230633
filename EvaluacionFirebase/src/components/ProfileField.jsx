import { StyleSheet, Text, View } from 'react-native';
import { Colors, Spacing, Typography } from '../constants/theme';

export function ProfileField({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value || '—'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: Spacing.half,
    paddingVertical: Spacing.two,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  label: {
    ...Typography.label,
    color: Colors.textSecondary,
  },
  value: {
    ...Typography.body,
    color: Colors.textPrimary,
  },
});
