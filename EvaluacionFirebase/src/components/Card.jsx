import { StyleSheet, View } from 'react-native';
import { Colors, Radius, Shadow, Spacing } from '../constants/theme';

export function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.four,
    ...Shadow.card,
  },
});
