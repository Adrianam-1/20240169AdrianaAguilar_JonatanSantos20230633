import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { Colors, Radius, Spacing, Typography } from '../constants/theme';

export function CustomButton({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
  style,
}) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        variant === 'primary' && styles.primary,
        variant === 'secondary' && styles.secondary,
        variant === 'ghost' && styles.ghost,
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={indicatorColor(variant)} />
      ) : (
        <Text style={[styles.text, textStyleFor(variant)]}>{title}</Text>
      )}
    </Pressable>
  );
}

function textStyleFor(variant) {
  if (variant === 'ghost') return styles.textGhost;
  if (variant === 'secondary') return styles.textOnSecondary;
  return styles.textOnPrimary;
}

function indicatorColor(variant) {
  if (variant === 'ghost') return Colors.secondary;
  if (variant === 'secondary') return Colors.textOnSecondary;
  return Colors.textOnPrimary;
}

const styles = StyleSheet.create({
  base: {
    borderRadius: Radius.pill,
    paddingVertical: Spacing.three,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  secondary: {
    backgroundColor: Colors.secondary,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: Colors.secondary,
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.92,
  },
  text: {
    ...Typography.subtitle,
  },
  textOnPrimary: {
    color: Colors.textOnPrimary,
  },
  textOnSecondary: {
    color: Colors.textOnSecondary,
  },
  textGhost: {
    color: Colors.secondary,
  },
});
