import { View, Text, StyleSheet } from 'react-native';
import RegisterForm from "@/app/screens/Register";

export default function Tab() {
    return (
        <RegisterForm />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
