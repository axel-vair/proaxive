// app/screens/Register.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import logo from "../assets/images/logo_proaxive2.png";

export default function RegisterForm() {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://10.0.2.2:8000/api/register', {
                email,
                first_name: firstName,
                last_name: lastName,
                password
            });
            if (response.status === 201) {
                Alert.alert('Inscription réussie', 'Votre compte a été créé.');
            }
        } catch (error) {
            Alert.alert('Erreur', 'Problème lors de l\'inscription.');
        }
    };

    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.image} />
            <View style={styles.form}>
                <Text style={styles.title}>Enregistrer un compte client en ligne</Text>

                <View style={styles.fieldSet}>
                    <Text style={styles.legend}>Adresse email</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#344260"
                        placeholder="adresse email"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <View style={styles.fieldSet}>
                    <Text style={styles.legend}>Prénom</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#344260"
                        placeholder="Prénom"
                        value={firstName}
                        onChangeText={setFirstName}
                    />
                </View>
                <View style={styles.fieldSet}>
                    <Text style={styles.legend}>Nom</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#344260"
                        placeholder="Nom"
                        value={lastName}
                        onChangeText={setLastName}
                    />
                </View>

                <View style={styles.fieldSet}>
                    <Text style={styles.legend}>Mot de passe</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#344260"
                        placeholder="Mot de passe"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleRegister}
                >
                    <Text style={styles.buttonText}>S'inscrire</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F0F3F4',
    },
    image: {
        marginBottom: 20,
    },
    form: {
        width: '80%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
        flexDirection: 'column',
    },
    fieldSet: {
        marginVertical: 10,
        paddingHorizontal: 10,
        paddingBottom: 10,
        borderWidth: 1,
        borderColor: '#344260',
        borderRadius: 5,
    },
    legend: {
        position: 'absolute',
        color: '#344260',
        top: -10,
        left: 10,
        fontWeight: 'regular',
        backgroundColor: '#fff',
        paddingHorizontal: 5,
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        marginTop: 10,
        height: 20,
        borderWidth: 0,
        marginBottom: 10,
        paddingLeft: 10,
        width: '100%',
        color: '#000',
    },
    button: {
        backgroundColor: '#F9556D',
        fontWeight: 'bold',
        paddingVertical: 20,
        borderRadius: 10,
        marginTop: 40,
        width: '79%',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
});
