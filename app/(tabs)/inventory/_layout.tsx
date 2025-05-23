import { Stack } from 'expo-router';

export default function InventoryLayout() {
    return (
        <Stack initialRouteName='index'>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="MaterialForm" options={{ headerShown: false }} />
        </Stack>
    );
}
