import { StyleSheet } from "react-native";

const colors =  {
    background100: '#FFFFFF',
    background400: '#F6F8F9',
    background700: '#F0F3F4',

    primary100: '#C2CDE3',
    primary200: '#9CAED4',
    primary300: '#768FC5',
    primary400: '#5571B6',
    primary500: '#01358D',
    primary600: '#012C75',
    primary700: '#00235E',
    primary800: '#001A47',
    primary900: '#001130',

    secondary100: '#FFD1DC',
    secondary200: '#FFA6B7',
    secondary300: '#FF7B92',
    secondary400: '#F9556D',
    secondary500: '#E53953',
    secondary600: '#D11F3E',
    secondary700: '#BA0E2F',
    secondary800: '#A3001E',
    secondary900: '#7D0015',

    tertiary100: '#C2E0D6',
    tertiary200: '#9CCDC0',
    tertiary300: '#76BAAA',
    tertiary400: '#55A795',
    tertiary500: '#10AC84',
    tertiary600: '#0C8F6D',
    tertiary700: '#077356',
    tertiary800: '#035740',
    tertiary900: '#004030',

    gray100: '#E6EAF0',
    gray200: '#D1D6E0',
    gray300: '#B8C0CD',
    gray400: '#9EA9BA',
    gray500: '#5B6880',
    gray600: '#465270',
    gray700: '#344260',
    gray800: '#23304F',
    gray900: '#121B36',

    info100: '#E6EAF0',
    info200: '#D1D6E0',
    info300: '#B8C0CD',
    info400: '#9EA9BA',
    info500: '#5B6880',
    info600: '#465270',
    info700: '#344260',
    info800: '#23304F',
    info900: '#121B36',
}

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        backgroundColor: colors.background100,
    },
    heading: {
        fontSize: 45,
        fontWeight: "bold",
        color: colors.primary500,
        fontFamily: 'Outfit-Bold.ttf',
        marginTop: 20,
        marginBottom: 60,
        marginRight: 20,
        marginLeft: 20,
    },
    button: {
        backgroundColor: colors.primary500,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 5,
        marginBottom: 10,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: colors.background100,
        fontFamily: 'Outfit-Regular.ttf'

    },
});

export { colors };