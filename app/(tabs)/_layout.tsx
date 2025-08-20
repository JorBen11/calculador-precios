import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabIcon from '@/components/TabIcon';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useThemeMode } from '@/hooks/useThemeMode';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const {resolvedTheme, theme} = useThemeMode();
  const { t } = useTranslation();
  const { bottom } = useSafeAreaInsets();

  const backgroundColor = resolvedTheme === 'dark' ? 'rgba(18,29,42,0.85)' : 'rgba(255,255,255,0.85)';
  const barStyle = {
    ...styles.tabBar,
    borderColor: theme.colors?.outline,
    height: 60 + bottom, // Ajuste para el espaciado inferior
    paddingBottom: bottom, // Espaciado inferior para evitar superposición con el contenido
    backgroundColor
  };

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors[resolvedTheme].tabIconSelected,
        tabBarInactiveTintColor: Colors[resolvedTheme].tabIconDefault,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: barStyle,
        tabBarItemStyle: styles.tabBarItem,
        tabBarIconStyle: {width: '100%'}
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t('menu.home'),
          tabBarLabelStyle: {
            fontSize: 10,
            textAlign: 'center',
            marginTop: 2,
          },
          tabBarIcon: ({ color, focused }) => <TabIcon label={t('menu.home')} focused={focused} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="inventory"
        options={{
          title: t('menu.inventory'),
          tabBarIcon: ({ color, focused }) => <TabIcon label={t('menu.inventory')} focused={focused} name="doc.plaintext" color={color} />,
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: t('menu.products'),
          tabBarIcon: ({ color, focused }) => <TabIcon label={t('menu.products')} focused={focused} name="bag.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t('menu.settings'),
          tabBarIcon: ({ color, focused }) => <TabIcon label={t('menu.settings')} focused={focused} name="gear" color={color}/>,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    borderWidth: 1,
    elevation: 0,
    shadowOffset: {
      width: 10,
      height: -2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    borderRadius: 16,
  },
  tabBarItem: {
    paddingVertical: 8, // Espaciado vertical para los items
  },
});
