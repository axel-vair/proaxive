// app/register.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

export default function RegisterForm() {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/register', {
                email, first_name: firstName, last_name: lastName, password
            });
            if (response.status === 201) {
                Alert.alert('Inscription réussie', 'Votre compte a été créé.');
            }
        } catch (error) {
            Alert.alert('Erreur', 'Problème lors de l\'inscription.');
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
                onPress={handleRegister}
            >
                <Text style={{ color: '#FFFFFF', textAlign: 'center' }}>S'inscrire</Text>
            </TouchableOpacity>
        </View>
    );
}
