import { StyleSheet, Text, View } from 'react-native';
import { Colors, Radius, Spacing, Typography } from '../constants/theme';
import { BrandMark } from './BrandMark';

// Tarjeta de estado vacío: se usa cuando aún no hay datos que mostrar (ej. perfil sin completar).
export function EmptyState({ title, message }) {
  return (
    <View style={styles.container}>
      <BrandMark size={48} />
      {title ? <Text style={styles.title}>{title}</Text> : null}
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.four,
    paddingHorizontal: Spacing.three,
    backgroundColor: Colors.background,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    borderStyle: 'dashed',
  },
  title: {
    ...Typography.subtitle,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  message: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});
