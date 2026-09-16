import { StyleSheet, Text, View } from 'react-native';
import { Colors, Radius, Spacing, Typography } from '../constants/theme';

// Mensaje de estado reutilizable para formularios: variant="error" | "success".
export function Banner({ message, variant = 'error' }) {
  if (!message) return null;

  const isError = variant === 'error';

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isError ? Colors.errorBackground : Colors.successBackground },
      ]}
    >
      <Text style={[styles.text, { color: isError ? Colors.error : Colors.success }]}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  text: {
    ...Typography.body,
    textAlign: 'center',
  },
});
