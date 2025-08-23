import { Tabs } from 'expo-router';
import React, { useMemo } from 'react';
import { Dimensions, Platform, StyleSheet } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabIcon from '@/components/TabIcon';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useThemeMode } from '@/hooks/useThemeMode';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const { resolvedTheme, theme } = useThemeMode();
  const { t } = useTranslation();
  const { bottom } = useSafeAreaInsets();
  
  // Obtener dimensiones actuales
  const { height: screenHeight } = Dimensions.get('window');
  
  // Calcular altura dinámica del tab bar
  const tabBarHeight = useMemo(() => {
    const baseHeight = 60;
    const safeAreaAdjustment = bottom;
    
    // Ajustes por plataforma y tipo de dispositivo
    const platformAdjustment = Platform.select({
      ios: 0,
      android: 5, // Un poco más de altura en Android
      default: 0,
    });
    
    // Para pantallas más pequeñas, usar menos altura
    const screenAdjustment = screenHeight < 700 ? -5 : 0;
    
    return Math.max(
      baseHeight + safeAreaAdjustment + platformAdjustment + screenAdjustment,
      55 // Altura mínima
    );
  }, [bottom, screenHeight]);
  
  // Estilos dinámicos del tab bar
  const tabBarStyle = useMemo(() => {
    const backgroundColor = resolvedTheme === 'dark' 
      ? 'rgba(18,29,42,0.85)' 
      : 'rgba(255,255,255,0.85)';
    
    return {
      ...styles.tabBar,
      borderColor: theme.colors?.outline,
      height: tabBarHeight,
      paddingBottom: Math.max(bottom - 5, 0), // Evitar padding negativo
      backgroundColor,
      // Ajustes adicionales para diferentes tipos de navegación
      marginBottom: Platform.OS === 'android' ? 0 : 0,
    };
  }, [resolvedTheme, theme.colors?.outline, tabBarHeight, bottom]);
  
  // Estilos dinámicos de los items
  const tabBarItemStyle = useMemo(() => ({
    ...styles.tabBarItem,
    paddingVertical: Math.max(8, (tabBarHeight - bottom - 44) / 2), // Centrar verticalmente
    flex: 1, // Asegurar distribución equitativa
  }), [tabBarHeight, bottom]);

  return (
    <Tabs
      screenOptions={{
        animation: 'shift',
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors[resolvedTheme].tabIconSelected,
        tabBarInactiveTintColor: Colors[resolvedTheme].tabIconDefault,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: tabBarStyle,
        tabBarItemStyle: tabBarItemStyle,
        tabBarIconStyle: { 
          width: '100%',
          height: 24, // Altura fija para consistencia
        },
        // Optimizaciones para diferentes plataformas
        tabBarHideOnKeyboard: Platform.OS === 'android',
        tabBarVisibilityAnimationConfig: {
          show: {
            animation: 'spring',
            config: {
              damping: 20,
              stiffness: 150,
            },
          },
          hide: {
            animation: 'spring',
            config: {
              damping: 20,
              stiffness: 150,
            },
          },
        },
      }}>
      
      <Tabs.Screen
        name="index"
        options={{
          title: t('menu.home'),
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
              label={t('menu.home')} 
              focused={focused} 
              name="house.fill" 
              color={color} 
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="inventory"
        options={{
          title: t('menu.inventory'),
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
              label={t('menu.inventory')} 
              focused={focused} 
              name="doc.plaintext" 
              color={color} 
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="products"
        options={{
          title: t('menu.products'),
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
              label={t('menu.products')} 
              focused={focused} 
              name="bag.fill" 
              color={color} 
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="settings"
        options={{
          title: t('menu.settings'),
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
              label={t('menu.settings')} 
              focused={focused} 
              name="gear" 
              color={color}
            />
          ),
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
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderRadius: 16,
    // Mejores sombras por plataforma
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  tabBarItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarLabel: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 2,
  },
});