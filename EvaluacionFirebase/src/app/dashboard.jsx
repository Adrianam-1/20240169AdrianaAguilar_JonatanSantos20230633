import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useAuth } from '../context/AuthContext';
import { createUserProfile, getUserProfile, updateUserProfile } from '../services/userService';
import { Avatar } from '../components/Avatar';
import { Card } from '../components/Card';
import { CustomButton } from '../components/CustomButton';
import { CustomInput } from '../components/CustomInput';
import { ProfileField } from '../components/ProfileField';
import { Banner } from '../components/Banner';
import { Loading } from '../components/Loading';
import { EmptyState } from '../components/EmptyState';
import { Header } from '../components/Header';
import { ScreenContainer } from '../components/ScreenContainer';
import { Spacing } from '../constants/theme';
import {
  getFirebaseErrorMessage,
  validateBirthDate,
  validateImageUrl,
  validateRequired,
} from '../utils/validation';

export default function DashboardScreen() {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [saveError, setSaveError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchProfile = useCallback(async () => {
    try {
      const data = await getUserProfile(user.uid);
      setProfile(data);
      setLoadError(null);
    } catch (error) {
      setLoadError(getFirebaseErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, [user.uid]);

  useEffect(() => {
    // Carga el perfil desde Firestore al montar; no hay una capa de data-fetching
    // (React Query/Suspense) en el proyecto, así que este es el patrón estándar de Expo Router.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProfile();
  }, [fetchProfile]);

  function retryLoad() {
    setLoading(true);
    fetchProfile();
  }

  function startEditing() {
    setForm({
      fullName: profile?.fullName ?? '',
      birthDate: profile?.birthDate ?? '',
      institutionalId: profile?.institutionalId ?? '',
      photoURL: profile?.photoURL ?? '',
    });
    setFieldErrors({});
    setSaveError(null);
    setSuccessMessage(null);
    setEditing(true);
  }

  function cancelEditing() {
    setEditing(false);
    setForm(null);
    setFieldErrors({});
    setSaveError(null);
  }

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validateForm() {
    const errors = {
      fullName: validateRequired(form.fullName, 'El nombre completo'),
      birthDate: validateBirthDate(form.birthDate),
      institutionalId: validateRequired(form.institutionalId, 'El carnet institucional'),
      photoURL: validateImageUrl(form.photoURL),
    };
    setFieldErrors(errors);
    return Object.values(errors).every((error) => !error);
  }

  async function handleSave() {
    setSaveError(null);
    setSuccessMessage(null);
    if (!validateForm()) return;

    const payload = {
      fullName: form.fullName.trim(),
      birthDate: form.birthDate.trim(),
      institutionalId: form.institutionalId.trim(),
      photoURL: form.photoURL.trim(),
    };

    setSaving(true);
    try {
      if (profile) {
        await updateUserProfile(user.uid, payload);
      } else {
        await createUserProfile(user.uid, user.email ?? '', payload);
      }
      setProfile((prev) => ({ ...prev, ...payload, uid: user.uid, email: user.email }));
      setEditing(false);
      setForm(null);
      setSuccessMessage('Tu información se actualizó correctamente.');
    } catch (error) {
      setSaveError(getFirebaseErrorMessage(error));
    } finally {
      setSaving(false);
    }
  }

  async function handleSignOut() {
    await signOut().catch(() => {});
  }

  function renderCardBody() {
    if (editing) {
      return (
        <View style={styles.form}>
          <CustomInput
            label="Nombre completo"
            value={form.fullName}
            onChangeText={(value) => updateField('fullName', value)}
            error={fieldErrors.fullName}
          />
          <CustomInput
            label="Fecha de nacimiento"
            placeholder="AAAA-MM-DD"
            value={form.birthDate}
            onChangeText={(value) => updateField('birthDate', value)}
            error={fieldErrors.birthDate}
          />
          <CustomInput
            label="Carnet institucional"
            value={form.institutionalId}
            onChangeText={(value) => updateField('institutionalId', value)}
            error={fieldErrors.institutionalId}
          />
          <CustomInput
            label="URL de imagen de perfil"
            autoCapitalize="none"
            keyboardType="url"
            value={form.photoURL}
            onChangeText={(value) => updateField('photoURL', value)}
            error={fieldErrors.photoURL}
          />

          <View style={styles.actionsRow}>
            <CustomButton
              title="Cancelar"
              variant="ghost"
              onPress={cancelEditing}
              style={styles.actionButton}
              disabled={saving}
            />
            <CustomButton
              title="Guardar cambios"
              onPress={handleSave}
              loading={saving}
              style={styles.actionButton}
            />
          </View>
        </View>
      );
    }

    if (!profile) {
      return (
        <View style={styles.details}>
          <EmptyState
            title="Aún no completas tu perfil"
            message="Agrega tu nombre, fecha de nacimiento, carnet e imagen para terminar tu registro."
          />
          <CustomButton title="Completar perfil" onPress={startEditing} style={styles.editButton} />
        </View>
      );
    }

    return (
      <View style={styles.details}>
        <ProfileField label="Nombre completo" value={profile?.fullName} />
        <ProfileField label="Fecha de nacimiento" value={profile?.birthDate} />
        <ProfileField label="Carnet institucional" value={profile?.institutionalId} />
        <ProfileField label="Correo electrónico" value={profile?.email ?? user.email} />

        <CustomButton title="Editar información" onPress={startEditing} style={styles.editButton} />
      </View>
    );
  }

  if (loading) {
    return <Loading fullscreen label="Cargando tu perfil..." />;
  }

  return (
    <ScreenContainer keyboardAvoiding={editing}>
      <Animated.View entering={FadeInDown.duration(400)}>
        <Header
          title="Tu perfil"
          subtitle={user.email}
          markSize={44}
          right={
            <CustomButton
              title="Cerrar sesión"
              variant="ghost"
              onPress={handleSignOut}
              style={styles.signOutButton}
            />
          }
        />
      </Animated.View>

      <Animated.View entering={FadeInUp.duration(400).delay(100)}>
        {loadError ? (
          <Card style={styles.card}>
            <Banner message={loadError} variant="error" />
            <CustomButton title="Reintentar" onPress={retryLoad} style={styles.retryButton} />
          </Card>
        ) : (
          <Card style={styles.card}>
            <View style={styles.avatarRow}>
              <Avatar
                uri={editing ? form.photoURL : profile?.photoURL}
                fullName={editing ? form.fullName : profile?.fullName}
                size={96}
              />
            </View>

            <Banner message={successMessage} variant="success" />
            <Banner message={saveError} variant="error" />

            {renderCardBody()}
          </Card>
        )}
      </Animated.View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  signOutButton: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  card: {
    gap: Spacing.three,
  },
  avatarRow: {
    alignItems: 'center',
  },
  form: {
    gap: Spacing.three,
  },
  details: {
    gap: Spacing.one,
  },
  editButton: {
    marginTop: Spacing.three,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  actionButton: {
    flex: 1,
  },
  retryButton: {
    marginTop: Spacing.two,
  },
});
