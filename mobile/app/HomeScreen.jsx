// app/HomeScreen.jsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
    const router = useRouter();

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Home Screen</Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
                <Text style={{ color: '#007BFF', marginTop: 20 }}>Se connecter</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/register')}>
                <Text style={{ color: '#007BFF', marginTop: 10 }}>S'inscrire</Text>
            </TouchableOpacity>
        </View>
    );
}
