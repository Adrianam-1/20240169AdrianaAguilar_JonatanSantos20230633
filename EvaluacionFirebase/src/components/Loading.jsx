import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Colors, Spacing, Typography } from '../constants/theme';
import { BrandMark } from './BrandMark';

export function Loading({ label = 'Cargando...', fullscreen = false }) {
  return (
    <View style={[styles.container, fullscreen && styles.fullscreen]}>
      {fullscreen ? <BrandMark size={64} /> : null}
      <ActivityIndicator size="large" color={Colors.secondary} />
      {label ? <Text style={styles.label}>{label}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
  },
  fullscreen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  label: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
});
