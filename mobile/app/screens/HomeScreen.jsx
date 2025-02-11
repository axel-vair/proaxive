// app/screens/HomeScreen.jsx
import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {useRouter} from 'expo-router';
import logo from '../assets/images/logo.png';
import {colors} from "../../styles/globalStyles";
import RedButtonHome from "@/app/components/Buttons/RedButtonHome";
import BlueButtonHome from "@/app/components/Buttons/BlueButtonHome";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function HomeScreen() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Function to check if the user is logged in (has a token)
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                setIsLoggedIn(!!token);
            } catch (error) {
                console.error("Error checking login status:", error);
                setIsLoggedIn(false);
            }
        };

        checkLoginStatus();
    }, []);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('userToken');
            setIsLoggedIn(false);
            router.push('/');
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <View style={styles.container}>
            <Image source={logo} style={{marginBottom: 30}}/>

            <Text style={styles.heading}>
                {"Votre "}
                <Text style={{color: colors.secondary500}}>App</Text>
                {"\n"}
                {"d'intervention en ligne"}
            </Text>
            {/*TODO: Changer les noms et les routes. Utilisation d'un register/login pour la facilité - notre produit fonctionne par la création d'un customer via l'interface admin */}
            {/* Espace Profile Button */}
            {isLoggedIn && (
                <>
                    <BlueButtonHome onPress={() => router.push('/profile')}>
                        Profil
                    </BlueButtonHome>

                    <RedButtonHome onPress={handleLogout}>
                        Déconnexion
                    </RedButtonHome>
                </>
            )}

            {!isLoggedIn && (
                <>
                    <RedButtonHome onPress={() => router.push('/register')}>
                        Inscription
                    </RedButtonHome>

                    <BlueButtonHome onPress={() => router.push('/login')}>
                        Connexion
                    </BlueButtonHome>
                </>
            )}

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
    },
    heading: {
        fontSize: 45,
        fontWeight: "bold",
        color: colors.primary500,
        fontFamily: 'Rubik-Bold.ttf',
        marginBottom: 60,
        marginRight: 20,
        marginLeft: 20,
    },

    colors: {
        secondary500: "#E53953"
    },
});