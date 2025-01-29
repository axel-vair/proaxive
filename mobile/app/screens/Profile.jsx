import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken'); // Récupération du token
                console.log('Token récupéré:', token); // Affichez le token pour déboguer

                if (!token) {
                    throw new Error('Token non trouvé'); // Ajoutez cette vérification
                }

                const response = await axios.get('http://10.0.2.2:8000/api/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Envoi du token dans l'en-tête
                    },
                });

                console.log('Données utilisateur:', response.data); // Affichez les données utilisateur
                setUserData(response.data); // Stockage des données utilisateur
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error); // Affichez l'erreur
                setError(error.message || 'Impossible de récupérer les données utilisateur.');
            } finally {
                setLoading(false); // Fin du chargement
            }
        };

        fetchUserData(); // Appel de la fonction pour récupérer les données
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />; // Afficher un indicateur de chargement
    }

    if (error) {
        return <Text style={styles.error}>{error}</Text>; // Afficher l'erreur si elle existe
    }

    return (
        <View style={styles.container}>
            {userData ? (
                <>
                    <Text style={styles.title}>Profil de {userData.name}</Text>
                    <Text>Email: {userData.email}</Text>
                    {/* Ajoutez d'autres informations utilisateur ici */}
                </>
            ) : (
                <Text>Aucune donnée disponible.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#F0F3F4',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default Profile;
