import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SaveButton from "../components/Buttons/SaveButton";
import CancelButton from "../components/Buttons/CancelButton";
import axios from "axios";

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken'); // Récupération du token
                if (!token) {
                    throw new Error('Token non trouvé'); // Ajoutez cette vérification
                }

                const response = await axios.get('http://10.0.2.2:8000/api/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Envoi du token dans l'en-tête
                    },
                });
                setUserData(response.data); // Stockage des données utilisateur
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error); // Affichez l'erreur
                setError(error.message || 'Impossible de récupérer les données utilisateur.');
            } finally {
                setLoading(false); // Fin du chargement
            }
        };
        fetchUserData();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff"/>;
    }
    if (error) {
        return <Text style={styles.error}>{error}</Text>;
    }
    return (

        <View style={styles.container}>
            <View style={styles.form}>

                <Text style={styles.subtitle}>Informations de votre compte utilisateur</Text>
                <Text style={styles.text}>Mettre à jour vos informations</Text>

                <View style={styles.fieldSet}>
                    <Text style={styles.legend}>Adresse email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={userData.email}
                        onChangeText={setUserData}
                        value={userData.email}
                    />
                </View>

                <View style={styles.fieldSet}>
                    <Text style={styles.legend}>Nom</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={userData.lastName}
                        onChangeText={setUserData}
                        value={userData.lastName}
                    />
                </View>

                <View style={styles.fieldSet}>
                    <Text style={styles.legend}>Prénom</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={userData.firstName}
                        onChangeText={setUserData}
                        value={userData.firstName}
                    />
                </View>

                <CancelButton>Annuler</CancelButton>
                <SaveButton>Enregistrer</SaveButton>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F0F3F4',
    },
    title: {
        fontSize: 24,
        color: '#344260',
        fontFamily: 'Outfit-Bold.ttf',
        fontWeight: 'bold',
        marginVertical: 20,
    },
    subtitle: {
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 14,
        color: '#344260',
        fontFamily: 'Outfit-Bold.ttf',
        fontWeight: 'bold',
    },
    text: {
        marginBottom: 40,
        textAlign: 'center',
        fontSize: 12,
        color: '#344260',
        fontFamily: 'Outfit-Regular.ttf',
        fontWeight: 'regular',
    },
    form: {
        width: '100%',
        padding: 20,
        backgroundColor: '#fff',
        flexDirection: 'column',
    },
    input: {
        marginTop: 10,
        height: 40, // Less or equal 40 = doesnt show text android 💩
        borderWidth: 0,
        paddingLeft: 10,
        width: '100%',
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
    error: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default Profile;
