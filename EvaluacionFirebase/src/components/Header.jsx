import { StyleSheet, Text, View } from 'react-native';
import { Colors, Spacing, Typography } from '../constants/theme';
import { BrandMark } from './BrandMark';

// Cabecera reutilizable: marca + título/subtítulo a la izquierda, acción opcional a la derecha.
export function Header({ title, subtitle, mark = true, markSize = 48, right, align = 'left' }) {
  return (
    <View style={styles.row}>
      <View style={[styles.left, align === 'center' && styles.leftCenter]}>
        {mark ? <BrandMark size={markSize} /> : null}
        <View style={align === 'center' && styles.textCenter}>
          {title ? <Text style={styles.title}>{title}</Text> : null}
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
      </View>
      {right ? <View>{right}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.three,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    flexShrink: 1,
  },
  leftCenter: {
    flexDirection: 'column',
    alignSelf: 'center',
  },
  textCenter: {
    alignItems: 'center',
  },
  title: {
    ...Typography.title,
    color: Colors.textPrimary,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
});
