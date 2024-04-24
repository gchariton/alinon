import React, { useRef, useState } from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';

import SignupScreen from './SignupScreen';
import colors from '../config/colors';

function LoginScreen({}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const userRef = useRef(null);
    const passRef = useRef(null);

    const getPassword = async (user) => {
        const password = await SecureStore.getItemAsync(user);
        return password;
    };

    const authenticateUser = async (user, pass) => {
        const password = await getPassword(user);
        if (password === pass) {
            console.log('Authentication successful');
            userRef.current.clear();
            passRef.current.clear();
            return true;
        } else {
            console.log('Authentication failed');
            userRef.current.clear();
            passRef.current.clear();
            return false;
        }
    };

    const handleSignupSuccess = () => {
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <Modal
                style={styles.modal}
                visible={modalVisible}
                animationType='slide'
            >
                <View style={styles.modal}>
                    <SignupScreen onSignupSuccess={handleSignupSuccess} />
                </View>
            </Modal>

            <TextInput
                style={styles.textinput}
                onChangeText={setUser}
                placeholder='user'
                placeholderTextColor={'gray'}
                ref={userRef}
            />
            <TextInput
                style={styles.textinput}
                onChangeText={setPass}
                placeholder='pass'
                placeholderTextColor={'gray'}
                ref={passRef}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => authenticateUser(user, pass)}
            >
                <Text style={styles.text}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text></Text>
                <Text style={styles.link}>Sign Up!</Text>
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
        flex: 1,
        width: '100%',
    },
    link: {
        color: colors.blue,
        fontFamily: 'monospace',
        fontWeight: 'bold',
        padding: 10,
    },
    modal: {
        backgroundColor: colors.primary,
        flex: 1,
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
