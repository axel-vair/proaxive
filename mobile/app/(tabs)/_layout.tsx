import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Accueil',
                    headerShown: false,
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                    tabBarStyle: { display: 'none' }
                }}
            />
            <Tabs.Screen
                name="interventions"
                options={{
                    title: 'Interventions',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="hourglass" color={color} />,
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
                }}
            />
            <Tabs.Screen
                name="register"
                options={{
                    title: 'register',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="registered" color={color} />,
                }}
            />
        </Tabs>
    );
}
