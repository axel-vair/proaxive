// app/screens/LoginScreen/Login.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';


const LoginForm: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

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

export default LoginForm;