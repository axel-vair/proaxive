// app/index.jsx
import React from 'react';
import { View, Text } from 'react-native';
import HomeScreen from './HomeScreen'; // Import de HomeScreen

export default function App() {
    return (
        <View style={{ flex: 1 }}>
            <HomeScreen />
        </View>
    );
}
