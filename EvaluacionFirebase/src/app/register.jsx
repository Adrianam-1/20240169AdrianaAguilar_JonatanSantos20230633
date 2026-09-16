import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Link, router } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { createUserProfile } from '../services/userService';
import { ScreenContainer } from '../components/ScreenContainer';
import { Header } from '../components/Header';
import { CustomInput } from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';
import { Banner } from '../components/Banner';
import { Colors, Spacing, Typography } from '../constants/theme';
import {
  getFirebaseErrorMessage,
  validateBirthDate,
  validateConfirmPassword,
  validateEmail,
  validateImageUrl,
  validatePassword,
  validateRequired,
} from '../utils/validation';

const initialForm = {
  fullName: '',
  birthDate: '',
  institutionalId: '',
  photoURL: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default function RegisterScreen() {
  const { signUp, signOut } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState(null);
  const [loading, setLoading] = useState(false);

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validateForm() {
    const errors = {
      fullName: validateRequired(form.fullName, 'El nombre completo'),
      birthDate: validateBirthDate(form.birthDate),
      institutionalId: validateRequired(form.institutionalId, 'El carnet institucional'),
      photoURL: validateImageUrl(form.photoURL),
      email: validateEmail(form.email),
      password: validatePassword(form.password),
      confirmPassword: validateConfirmPassword(form.password, form.confirmPassword),
    };
    setFieldErrors(errors);
    return Object.values(errors).every((error) => !error);
  }

  async function handleSubmit() {
    setFormError(null);
    if (!validateForm()) return;

    setLoading(true);
    let createdUser = null;
    try {
      createdUser = await signUp(form.email.trim(), form.password);
      await createUserProfile(createdUser.uid, form.email.trim(), {
        fullName: form.fullName.trim(),
        birthDate: form.birthDate.trim(),
        institutionalId: form.institutionalId.trim(),
        photoURL: form.photoURL.trim(),
      });
      router.replace('/dashboard');
    } catch (error) {
      // Si la cuenta de Auth se creó pero Firestore falló, no dejamos una sesión a medias.
      if (createdUser) {
        await signOut().catch(() => {});
      }
      setFormError(getFirebaseErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScreenContainer>
      <Animated.View entering={FadeInDown.duration(400)}>
        <Header title="Crea tu cuenta" subtitle="Completa tus datos para comenzar" markSize={48} />
      </Animated.View>

      <Animated.View entering={FadeInUp.duration(400).delay(100)} style={styles.form}>
        <Banner message={formError} variant="error" />

        <CustomInput
          label="Nombre completo"
          placeholder="Ej. María López Ramírez"
          value={form.fullName}
          onChangeText={(value) => updateField('fullName', value)}
          error={fieldErrors.fullName}
        />

        <CustomInput
          label="Fecha de nacimiento"
          placeholder="AAAA-MM-DD"
          autoCapitalize="none"
          value={form.birthDate}
          onChangeText={(value) => updateField('birthDate', value)}
          error={fieldErrors.birthDate}
        />

        <CustomInput
          label="Carnet institucional"
          placeholder="Ej. 20231234"
          autoCapitalize="characters"
          value={form.institutionalId}
          onChangeText={(value) => updateField('institutionalId', value)}
          error={fieldErrors.institutionalId}
        />

        <CustomInput
          label="URL de imagen de perfil"
          placeholder="https://..."
          autoCapitalize="none"
          keyboardType="url"
          value={form.photoURL}
          onChangeText={(value) => updateField('photoURL', value)}
          error={fieldErrors.photoURL}
        />

        <CustomInput
          label="Correo electrónico"
          placeholder="tucorreo@ejemplo.com"
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
          value={form.email}
          onChangeText={(value) => updateField('email', value)}
          error={fieldErrors.email}
        />

        <CustomInput
          label="Contraseña"
          placeholder="Mínimo 6 caracteres"
          secureTextEntry
          autoCapitalize="none"
          value={form.password}
          onChangeText={(value) => updateField('password', value)}
          error={fieldErrors.password}
        />

        <CustomInput
          label="Confirmar contraseña"
          placeholder="Repite tu contraseña"
          secureTextEntry
          autoCapitalize="none"
          value={form.confirmPassword}
          onChangeText={(value) => updateField('confirmPassword', value)}
          error={fieldErrors.confirmPassword}
        />

        <CustomButton title="Crear cuenta" onPress={handleSubmit} loading={loading} />

        <View style={styles.footer}>
          <Text style={styles.footerText}>¿Ya tienes cuenta?</Text>
          <Link href="/login" style={styles.link}>
            Inicia sesión
          </Link>
        </View>
      </Animated.View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
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
