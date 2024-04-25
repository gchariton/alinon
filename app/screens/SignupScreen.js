import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';

import colors from '../config/colors';

const storeCredentials = async (user, pass) => {
    await SecureStore.setItemAsync(user, pass);
};

function SignupScreen({ onClose }) {
    const [message, setMessage] = useState('Register here!');
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');

    const handleSignup = () => {
        if (user.trim() === '') {
            setMessage('Username cannot be empty!');
        } else if (!/^[a-zA-Z0-9._-]+$/.test(user)) {
            setMessage(
                'Username can only contain alphanumeric characters, ".", "-", and "_"'
            );
        } else {
            storeCredentials(user, pass);
            onClose();
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{message}</Text>
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
                secureTextEntry={true}
            />
            <TouchableOpacity style={styles.button} onPress={handleSignup}>
                <Text style={styles.text}>SIGN UP</Text>
            </TouchableOpacity>
            <Text></Text>
            <TouchableOpacity onPress={onClose}>
                <MaterialCommunityIcons
                    name={'close-circle-outline'}
                    color={'gray'}
                    size={35}
                />
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
        fontWeight: 'bold',
    },
    textinput: {
        color: colors.blue,
        borderBottomColor: colors.blue,
        borderBottomWidth: 1,
        fontFamily: 'monospace',
        margin: 10,
        padding: 10,
        width: '70%',
    },
});

export default SignupScreen;
