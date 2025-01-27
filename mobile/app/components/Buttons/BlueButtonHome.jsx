import React from 'react';
import {StyleSheet, View, Text, Pressable, Image} from "react-native";
import UserIcon from "../../../assets/icons/user-blank.svg";
import {colors} from "../../../styles/globalStyles";

const BlueButtonHome = ({children, onPress}) => {
    return (
        <Pressable onPress={onPress} style={({pressed}) => [styles.container, pressed && styles.pressed]}>
            <View style={styles.buttonContent}>
                <Image style={styles.icon} source={UserIcon}/>
                <Text style={styles.text}>{children}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary500,
        width: 300,
        padding: 10,
        margin: 10,
        alignItems: "center",
        borderRadius: 8,
    },
    pressed: {
        opacity: 0.7,
    },
    buttonContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        marginRight: 8
    },
    text: {
        color: "white",
    }
});

export default BlueButtonHome;