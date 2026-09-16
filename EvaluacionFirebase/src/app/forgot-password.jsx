import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Link, router } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { ScreenContainer } from '../components/ScreenContainer';
import { Header } from '../components/Header';
import { CustomInput } from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';
import { Banner } from '../components/Banner';
import { Colors, Spacing, Typography } from '../constants/theme';
import { getFirebaseErrorMessage, validateEmail } from '../utils/validation';

export default function ForgotPasswordScreen() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [fieldError, setFieldError] = useState(null);
  const [formError, setFormError] = useState(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    const error = validateEmail(email);
    setFieldError(error);
    setFormError(null);
    if (error) return;

    setLoading(true);
    try {
      await resetPassword(email.trim());
      setSent(true);
    } catch (submitError) {
      setFormError(getFirebaseErrorMessage(submitError));
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScreenContainer contentStyle={styles.content}>
      <Animated.View entering={FadeInDown.duration(400)}>
        <Header
          align="center"
          markSize={64}
          title="Recupera tu acceso"
          subtitle="Te enviaremos un enlace a tu correo para restablecer tu contraseña."
        />
      </Animated.View>

      <Animated.View entering={FadeInUp.duration(400).delay(100)} style={styles.form}>
        <Banner message={formError} variant="error" />

        {sent ? (
          <>
            <Banner
              message="Si el correo está registrado, te enviamos un enlace para restablecer tu contraseña."
              variant="success"
            />
            <CustomButton title="Volver a iniciar sesión" onPress={() => router.replace('/login')} />
          </>
        ) : (
          <>
            <CustomInput
              label="Correo electrónico"
              placeholder="tucorreo@ejemplo.com"
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
              value={email}
              onChangeText={setEmail}
              error={fieldError}
            />
            <CustomButton title="Enviar enlace" onPress={handleSubmit} loading={loading} />
          </>
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>¿Ya la recordaste?</Text>
          <Link href="/login" style={styles.link}>
            Inicia sesión
          </Link>
        </View>
      </Animated.View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
  },
  form: {
    gap: Spacing.three,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.one,
    marginTop: Spacing.two,
  },
  footerText: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  link: {
    ...Typography.body,
    fontWeight: '700',
    color: Colors.secondary,
  },
});
