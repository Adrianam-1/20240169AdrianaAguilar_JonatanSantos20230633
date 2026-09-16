import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing } from '../constants/theme';

// Envuelve el patrón repetido en las pantallas: SafeArea + teclado + scroll opcional.
export function ScreenContainer({ children, scroll = true, contentStyle, keyboardAvoiding = true }) {
  const content = scroll ? (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={[styles.scrollContent, contentStyle]}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.flexContent, contentStyle]}>{children}</View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {keyboardAvoiding ? (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
          {content}
        </KeyboardAvoidingView>
      ) : (
        content
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.five,
    gap: Spacing.five,
  },
  flexContent: {
    flex: 1,
    padding: Spacing.four,
    gap: Spacing.four,
  },
});
