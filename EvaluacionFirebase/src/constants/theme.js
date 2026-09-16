// Paleta "Goggle" — identidad visual inspirada en Minions (amarillo + denim azul),
// tratada con tono profesional en vez de infantil.
// La app usa un único tema (no cambia con el modo oscuro del sistema) para
// que la identidad visual se vea igual en cualquier dispositivo.
export const Colors = {
  primary: '#F6C915',
  primaryDark: '#D9A800',
  primaryLight: '#FFE585',
  secondary: '#1E3A5F',
  secondaryDark: '#142942',
  secondaryLight: '#3E63A0',
  accent: '#8FA3B3',
  background: '#FFFDF6',
  surface: '#FFFFFF',
  border: '#EDE6D0',
  textPrimary: '#1C2126',
  textSecondary: '#5C6670',
  textOnPrimary: '#1C2126',
  textOnSecondary: '#FFFFFF',
  success: '#2F8F5B',
  successBackground: '#E4F5EB',
  error: '#D6483C',
  errorBackground: '#FBEAE8',
  disabled: '#E5DFC9',
  placeholder: '#9CA6AE',
  overlay: 'rgba(20, 41, 66, 0.5)',
};

export const Radius = {
  sm: 10,
  md: 16,
  lg: 24,
  pill: 999,
};

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
};

export const Typography = {
  title: { fontSize: 28, fontWeight: '700' },
  subtitle: { fontSize: 16, fontWeight: '500' },
  body: { fontSize: 15, fontWeight: '400' },
  label: { fontSize: 13, fontWeight: '600' },
  small: { fontSize: 12, fontWeight: '400' },
};

export const Shadow = {
  card: {
    shadowColor: '#142942',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
  },
};
