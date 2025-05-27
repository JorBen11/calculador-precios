import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { ReactNode, memo, useCallback } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { IconSymbol } from './ui/IconSymbol';

type AppHeaderProps = {
  title: string;
  onBack?: () => void;
  leftButton?: ReactNode;
  rightButton?: ReactNode;
};

const ICON_SIZE = 24;

const AppHeader = ({ title, onBack, leftButton, rightButton }: AppHeaderProps) => {
  const theme = useTheme();
  const {canGoBack, goBack } = useNavigation<NativeStackNavigationProp<any>>();

  const handleBack = useCallback(() => {
    if (onBack) {
      onBack();
    } else {
      goBack();
    }
  }, [onBack, goBack]);

  return (
    <View style={[styles.container, { borderBottomColor: theme.colors.outline }]}>
      <View style={styles.side}>
        {leftButton ?? (
          (onBack || canGoBack()) && (
            <TouchableOpacity
              onPress={handleBack}
              accessibilityRole="button"
              accessibilityLabel="Volver atrás"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={{ borderRadius: 20, backgroundColor: theme.colors.surface, padding: 8 }}
            >
              <IconSymbol name="chevron.left" size={ICON_SIZE} color={theme.colors.primary} />
            </TouchableOpacity>
          )
        )}
      </View>

      <View style={styles.titleContainer} pointerEvents="none">
        <Text
          style={[styles.title, { color: theme.colors.onSurface }]}
          numberOfLines={1}
          ellipsizeMode="tail"
          accessibilityRole="header"
        >
          {title}
        </Text>
      </View>

      <View style={styles.side}>
        {rightButton ?? <View style={{ width: ICON_SIZE }} />}
      </View>
    </View>
  );
};

export default memo(AppHeader);

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  side: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: Platform.OS === 'ios' ? '600' : '700',
  },
});
