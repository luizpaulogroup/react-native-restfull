import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollView: {
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 50,
    },
    chooseImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        alignSelf: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    logo: {
        width: '100%',
        height: '100%',
        borderRadius: 40,
    },
    button: {
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#F05',
    },
    buttonText: {
        fontWeight: '700',
        color: '#FFF'
    },
});

export default styles;