import React from 'react';
import {View, Text, Image} from 'react-native';
import {useRouter} from 'expo-router';
import {globalStyles, colors} from "../../styles/globalStyles";
import logo from '../../assets/images/logo.png';
import RedButton from "../components/Buttons/RedButtonHome";
import BlueButtonHome from "../components/Buttons/BlueButtonHome";

export default function HomeScreen() {
    const router = useRouter();

    return (
        <View style={globalStyles.container}>
            <Image source={logo} style={{width: 200, height: 200, marginBottom: 30}}/>

            <Text style={globalStyles.heading}>
                {"Votre "}
                <Text style={{ color: colors.secondary500 }}>App</Text>
                {"\n"}
                {"d'intervention en ligne"}
            </Text>


            {/* Espace Client Button */}
            <BlueButtonHome onPress={() => router.push('/register')}>
                Espace Client
            </BlueButtonHome>

            {/* Espace Technicien Button */}
            <RedButton onPress={() => router.push('/login')}>
                Espace Technicien
            </RedButton>
        </View>
    );
}
