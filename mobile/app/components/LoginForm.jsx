import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import axios from 'axios';

export default function LoginForm() {
    // État pour les champs du formulaire
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Fonction pour gérer l'inscription
    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/login', {
                email,
                password,
            });

            // Gérer la réponse de l'API
            if (response.status === 201) {
                Alert.alert('Login réussi', 'Vous êtes connecté.');
            }
        } catch (error) {
            console.error('Erreur lors de la connexion', error);
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion. Veuillez réessayer.');
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
                onPress={handleRegister} // Appel de la fonction d'inscription
            >
                <Text style={{ color: '#FFFFFF', textAlign: 'center' }}>Se connecter</Text>
            </TouchableOpacity>
        </View>
    );
}
