import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import axios from 'axios';

export default function RegisterForm() {
    // État pour les champs du formulaire
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');

    // Fonction pour gérer l'inscription
    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/register', {
                email,
                first_name: firstName, // Utilisez 'first_name' au lieu de 'firstName'
                last_name: lastName,   // Utilisez 'last_name' au lieu de 'lastName'
                password,
            });

            // Gérer la réponse de l'API
            if (response.status === 201) {
                Alert.alert('Inscription réussie', 'Votre compte a été créé avec succès.');
            }
        } catch (error) {
            console.error('Erreur lors de l\'inscription', error);
            Alert.alert('Erreur', 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.');
        }
    };


    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Formulaire d'inscription</Text>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
            />
            <TextInput
                placeholder="Prénom"
                value={firstName}
                onChangeText={setFirstName}
                style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
            />
            <TextInput
                placeholder="Nom"
                value={lastName}
                onChangeText={setLastName}
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
                <Text style={{ color: '#FFFFFF', textAlign: 'center' }}>S'inscrie</Text>
            </TouchableOpacity>
        </View>
    );
}
