import { Image } from 'expo-image';

// Usa el mismo arte que el ícono/splash (generado en assets/images) para que
// el logo sea idéntico en toda la app, no una recreación aparte.
const markSource = require('../../assets/images/splash-icon.png');

export function BrandMark({ size = 56 }) {
  return (
    <Image
      source={markSource}
      style={{ width: size, height: size }}
      contentFit="contain"
      transition={0}
    />
  );
}
