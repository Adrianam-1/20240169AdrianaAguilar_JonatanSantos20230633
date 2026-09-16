const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_REGEX = /^https?:\/\/.+\..+/i;
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export function validateEmail(email) {
  if (!email?.trim()) return 'El correo es obligatorio.';
  if (!EMAIL_REGEX.test(email.trim())) return 'Ingresa un correo válido.';
  return null;
}

export function validatePassword(password) {
  if (!password) return 'La contraseña es obligatoria.';
  if (password.length < 6) return 'La contraseña debe tener al menos 6 caracteres.';
  return null;
}

export function validateConfirmPassword(password, confirmPassword) {
  if (!confirmPassword) return 'Confirma tu contraseña.';
  if (password !== confirmPassword) return 'Las contraseñas no coinciden.';
  return null;
}

export function validateRequired(value, fieldLabel) {
  if (!value?.trim()) return `${fieldLabel} es obligatorio.`;
  return null;
}

export function validateBirthDate(value) {
  if (!value?.trim()) return 'La fecha de nacimiento es obligatoria.';
  if (!DATE_REGEX.test(value.trim())) return 'Usa el formato AAAA-MM-DD.';
  const date = new Date(value);
  if (Number.isNaN(date.getTime()) || date > new Date()) return 'Ingresa una fecha válida.';
  return null;
}

export function validateImageUrl(value) {
  if (!value?.trim()) return 'La URL de imagen es obligatoria.';
  if (!URL_REGEX.test(value.trim())) return 'Ingresa una URL de imagen válida (http/https).';
  return null;
}

export function getFirebaseErrorMessage(error) {
  const code = error?.code ?? '';
  const messages = {
    'auth/invalid-email': 'El correo electrónico no es válido.',
    'auth/user-disabled': 'Esta cuenta ha sido deshabilitada.',
    'auth/user-not-found': 'No existe una cuenta con ese correo.',
    'auth/wrong-password': 'La contraseña es incorrecta.',
    'auth/invalid-credential': 'Correo o contraseña incorrectos.',
    'auth/email-already-in-use': 'Ya existe una cuenta con ese correo.',
    'auth/weak-password': 'La contraseña es demasiado débil.',
    'auth/network-request-failed': 'Problema de conexión. Verifica tu internet.',
    'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde.',
    'auth/missing-password': 'Ingresa tu contraseña.',
    'auth/requires-recent-login': 'Por seguridad, vuelve a iniciar sesión para continuar.',
    'permission-denied': 'No tienes permisos para realizar esta acción.',
    unavailable: 'No se pudo conectar con el servidor. Intenta de nuevo.',
  };
  return messages[code] ?? 'Ocurrió un error inesperado. Intenta de nuevo.';
}
