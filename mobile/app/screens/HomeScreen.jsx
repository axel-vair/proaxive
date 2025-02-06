// app/screens/HomeScreen.jsx
import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {useRouter} from 'expo-router';
import logo from '../assets/images/logo.png';
import RedButton from "../components/Buttons/RedButtonHome";
import BlueButtonHome from "../components/Buttons/BlueButtonHome";
import {colors} from "../../styles/globalStyles";


export default function HomeScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Image source={logo} style={{marginBottom: 30}}/>

            <Text style={styles.heading}>
                {"Votre "}
                <Text style={{color: colors.secondary500}}>App</Text>
                {"\n"}
                {"d'intervention en ligne"}
            </Text>

            {/* Espace Profile Button */}
            <BlueButtonHome onPress={() => router.push('/profile')}>
                Profile
            </BlueButtonHome>

            {/* Espace Client Button */}
            <BlueButtonHome onPress={() => router.push('/register')}>
                Espace Client
            </BlueButtonHome>

            <RedButton onPress={() => router.push('/login')}>
                Espace Technicien
            </RedButton>
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