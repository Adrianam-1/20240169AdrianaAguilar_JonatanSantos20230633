import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Link } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { ScreenContainer } from '../components/ScreenContainer';
import { Header } from '../components/Header';
import { CustomInput } from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';
import { Banner } from '../components/Banner';
import { Colors, Spacing, Typography } from '../constants/theme';
import { getFirebaseErrorMessage, validateEmail, validatePassword } from '../utils/validation';

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    const errors = {
      email: validateEmail(email),
      password: validatePassword(password),
    };
    setFieldErrors(errors);
    setFormError(null);

    if (errors.email || errors.password) return;

    setLoading(true);
    try {
      await signIn(email.trim(), password);
    } catch (error) {
      setFormError(getFirebaseErrorMessage(error));
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
          title="Bienvenido de vuelta"
          subtitle="Inicia sesión para ver tu perfil"
        />
      </Animated.View>

      <Animated.View entering={FadeInUp.duration(400).delay(100)} style={styles.form}>
        <Banner message={formError} variant="error" />

        <CustomInput
          label="Correo electrónico"
          placeholder="tucorreo@ejemplo.com"
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
          value={email}
          onChangeText={setEmail}
          error={fieldErrors.email}
        />

        <CustomInput
          label="Contraseña"
          placeholder="••••••••"
          secureTextEntry
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
          error={fieldErrors.password}
        />

        <Link href="/forgot-password" style={styles.forgotLink}>
          ¿Olvidaste tu contraseña?
        </Link>

        <CustomButton title="Iniciar sesión" onPress={handleSubmit} loading={loading} />

        <View style={styles.footer}>
          <Text style={styles.footerText}>¿No tienes cuenta?</Text>
          <Link href="/register" style={styles.link}>
            Regístrate
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
  forgotLink: {
    ...Typography.label,
    color: Colors.secondary,
    alignSelf: 'flex-end',
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
