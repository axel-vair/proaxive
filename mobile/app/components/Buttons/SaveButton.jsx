import React from 'react';
import {StyleSheet, View, Text, Pressable} from "react-native";

const SaveButton = ({children, onPress}) => {
    return (
        <Pressable onPress={onPress} style={({pressed}) => [styles.container, pressed && styles.pressed]}>
            <View style={styles.buttonContent}>
                <Text style={styles.text}>{children}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F9556D',
        width: '100%',
        paddingVertical: 15,
        marginVertical: 10,
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
        color: "#E6EAF0",
        fontWeight: "bold",
        fontFamily: 'Rubik-Bold.tff'
    }
});

export default SaveButton;