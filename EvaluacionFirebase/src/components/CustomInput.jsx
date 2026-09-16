import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Colors, Radius, Spacing, Typography } from '../constants/theme';

export function CustomInput({ label, error, containerStyle, ...inputProps }) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        style={[
          styles.input,
          focused && styles.inputFocused,
          error && styles.inputError,
        ]}
        placeholderTextColor={Colors.placeholder}
        onFocus={(event) => {
          setFocused(true);
          inputProps.onFocus?.(event);
        }}
        onBlur={(event) => {
          setFocused(false);
          inputProps.onBlur?.(event);
        }}
        {...inputProps}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.one,
  },
  label: {
    ...Typography.label,
    color: Colors.textPrimary,
  },
  input: {
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two + 4,
    fontSize: 15,
    color: Colors.textPrimary,
  },
  inputFocused: {
    borderColor: Colors.secondary,
    borderWidth: 2,
  },
  inputError: {
    borderColor: Colors.error,
  },
  errorText: {
    ...Typography.small,
    color: Colors.error,
  },
});
