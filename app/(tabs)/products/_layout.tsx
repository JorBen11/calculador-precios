import { Stack } from 'expo-router';

export default function ProductLayout() {
    return (
        <Stack initialRouteName='index'>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="create" options={{ headerShown: false }} />
        </Stack>
    );
}
