// app/screens/Login.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';


export default function LoginForm(){
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
        <View>
            <Text>Formulaire de connexion</Text>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="Mot de passe"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}

            />
            <TouchableOpacity
                onPress={handleLogin}
            >
                <Text>Se connecter</Text>
            </TouchableOpacity>
        </View>
    );
}
