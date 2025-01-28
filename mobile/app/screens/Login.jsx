// app/screens/Login.jsx
import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image} from 'react-native';
import axios from 'axios';
import logo from '../assets/images/logo_proaxive2.png';


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
        <View style={styles.container}>
            <Image source={logo} style={styles.image} />
            <View style={styles.form}>
                <Text style={styles.title}>Connexion à votre espace client en ligne</Text>
                <Text style={styles.subtitle}>Pour vous connecter, utilisez votre adresse email fournie au technicien.</Text>

                {/* Fieldset pour l'input Email */}
                <View style={styles.fieldSet}>
                    <Text style={styles.legend}>Votre mot de passe</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Entrez votre email"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                {/* Fieldset pour l'input Mot de passe */}
                <View style={styles.fieldSet}>
                    <Text style={styles.legend}>Identifiant ou adresse email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Entrez votre mot de passe"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
                <Text style={styles.inline}>Votre accès est confidentiel, ne le communiquez jamais à autrui.</Text>
            </View>

            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Se connecter</Text>
            </TouchableOpacity>

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
    subtitle: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 20,
        marginBottom: 40,
    },
    inline: {
        textAlign: 'center',
        color: '#5B6880',
        fontSize: 14,
        marginVertical: 20,
    },
    input: {
        marginTop: 10,
        height: 20,
        borderWidth: 0,
        marginBottom: 10,
        paddingLeft: 10,
        width: '100%',
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
