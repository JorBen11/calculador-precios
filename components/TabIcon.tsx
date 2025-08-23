import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { IconSymbol, IconSymbolName } from "./ui/IconSymbol";

interface TabIconProps {
  name: IconSymbolName;
  label: string;
  color: string;
  focused: boolean;
}

const TabIcon = ({ name, color, focused, label }: TabIconProps) => {

  const progress = useSharedValue(focused ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(focused ? 1 : 0, { duration: 300 });
  }, [focused, progress]);
  
  const animatedStyle =  useAnimatedStyle(() => ({
    //backgroundColor: interpolateColor(progress.value, [0, 1], ['transparent', '#E0E7FF']),
  }), [focused]);

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={[styles.iconContainer, { paddingHorizontal: focused ? 0 : 8 }]}>
        <IconSymbol name={name} size={focused ? 24 : 18} color={color}/>
      </View>
      <Text
        style={[styles.text, { color, opacity: focused ? 1 : 0.7, fontWeight: focused ? '800' : '400' }]}
        numberOfLines={1}
      >
        {label}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50, // Altura mínima consistente
    margin: 0,
    padding: 0,
    width: '100%',
    borderRadius: 12,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    marginBottom: 2,
    minHeight: 28, // Altura consistente para el contenedor del ícono
  },
  text: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 2,
  }
})

export default TabIcon;