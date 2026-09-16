import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { Colors, Typography } from '../constants/theme';

function getInitials(name) {
  if (!name?.trim()) return '?';
  const parts = name.trim().split(/\s+/);
  const initials = parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? '');
  return initials.join('') || '?';
}

export function Avatar({ uri, fullName, size = 96 }) {
  const [failed, setFailed] = useState(false);
  const dimension = { width: size, height: size, borderRadius: size / 2 };

  if (!uri || failed) {
    return (
      <View style={[styles.fallback, dimension]}>
        <Text style={[styles.initials, { fontSize: size * 0.36 }]}>{getInitials(fullName)}</Text>
      </View>
    );
  }

  return (
    <Image
      source={{ uri }}
      style={[styles.image, dimension]}
      onError={() => setFailed(true)}
      contentFit="cover"
      transition={150}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    backgroundColor: Colors.border,
  },
  fallback: {
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    ...Typography.title,
    color: Colors.textOnSecondary,
  },
});
