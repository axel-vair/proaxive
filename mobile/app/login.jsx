// app/login.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/login', { email, password });
            if (response.status === 200) {
                Alert.alert('Login réussi', 'Vous êtes connecté.');
            }
        } catch (error) {
            Alert.alert('Erreur', 'Problème de connexion. Veuillez réessayer.');
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Formulaire de connexion</Text>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
            />
            <TextInput
                placeholder="Mot de passe"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
                style={{ borderWidth: 1, marginBottom: 20, padding: 10 }}
            />
            <TouchableOpacity
                style={{ backgroundColor: '#007BFF', padding: 15 }}
                onPress={handleLogin}
            >
                <Text style={{ color: '#FFFFFF', textAlign: 'center' }}>Se connecter</Text>
            </TouchableOpacity>
        </View>
    );
}
