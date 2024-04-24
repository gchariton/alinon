import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';

import colors from '../config/colors';

const storeCredentials = async (user, pass) => {
    await SecureStore.setItemAsync(user, pass);
};

function LoginScreen({ onSignupSuccess }) {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');

    const handleSignup = () => {
        storeCredentials(user, pass);
        onSignupSuccess();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Register here!</Text>
            <TextInput
                style={styles.textinput}
                onChangeText={setUser}
                placeholder='user'
                placeholderTextColor={'gray'}
            />
            <TextInput
                style={styles.textinput}
                onChangeText={setPass}
                placeholder='pass'
                placeholderTextColor={'gray'}
            />
            <TouchableOpacity style={styles.button} onPress={handleSignup}>
                <Text style={styles.text}>SIGN UP</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: colors.blue,
        borderRadius: 5,
        justifyContent: 'center',
        margin: 10,
        padding: 10,
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: colors.white,
        fontFamily: 'monospace',
    },
    textinput: {
        color: colors.blue,
        borderBottomColor: colors.blue,
        borderBottomWidth: 1,
        fontFamily: 'monospace',
        margin: 10,
        padding: 5,
        width: '70%',
    },
});

export default LoginScreen;
