import React, { useRef, useState } from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import axios from 'axios';

import SignupScreen from './SignupScreen';
import colors from '../config/colors';

function LoginScreen({}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const userRef = useRef(null);
    const passRef = useRef(null);

    const authenticateUser = async (user, pass) => {
        if (user !== '' && pass !== '') {
            try {
                const response = await axios.post(
                    'https://api-dev.laiki.eu/auth/local',
                    {
                        identifier: user,
                        password: pass,
                    },
                    {
                        headers: {
                            Origin: 'https://wms-dev.laiki.eu',
                        },
                    }
                );

                if (response.status === 200) {
                    console.log('Authentication successful');

                    const jwtToken = response.data.jwt;
                    console.log('JWT token:', jwtToken);

                    setIsLoggedIn(true);
                    return true;
                } else {
                    console.log('Authentication failed:', response.data);
                    userRef.current.clear();
                    passRef.current.clear();
                    setUser('');
                    setPass('');
                    return false;
                }
            } catch (error) {
                console.error('Error during authentication:', error);
                return false;
            }
        } else {
            console.log('Username or Password fields cannot be empty');
            return false;
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser('');
        setPass('');
    };

    const handleModalVisibility = () => {
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <Modal visible={modalVisible} animationType='slide'>
                <View style={styles.modalcontainer}>
                    <View style={styles.modal}>
                        <SignupScreen onClose={handleModalVisibility} />
                    </View>
                </View>
            </Modal>

            {isLoggedIn ? (
                <>
                    <Text style={styles.text}>Welcome {user}!</Text>
                    <TouchableOpacity onPress={handleLogout}>
                        <Text style={styles.link}>LOGOUT</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <>
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
                        secureTextEntry={true}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => authenticateUser(user, pass)}
                    >
                        <Text style={styles.text}>LOGIN</Text>
                    </TouchableOpacity>
                    <Text></Text>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Text style={styles.link}>Sign Up!</Text>
                    </TouchableOpacity>
                </>
            )}
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
        alignSelf: 'center',
        borderColor: colors.blue,
        borderWidth: 2,
        backgroundColor: colors.secondary,
        borderRadius: 10,
        height: '80%',
        justifyContent: 'center',
        width: '90%',
    },
    modalcontainer: {
        alignItems: 'center',
        backgroundColor: colors.primary,
        flex: 1,
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

export default LoginScreen;
