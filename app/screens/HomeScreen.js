import React, { useRef, useEffect } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import Screen from './Screen';
import colors from '../config/colors';

const logoImage = require('../assets/logo.png');

const HomeScreen = ({ navigation }) => {
    const translateY = useRef(new Animated.Value(-500)).current;
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            translateY.setValue(-500);
            Animated.timing(translateY, {
                toValue: 0,
                duration: 3000,
                useNativeDriver: true,
            }).start();
        }
    }, [isFocused]);

    return (
        <Screen>
            <Animated.Image
                style={[styles.logo, { transform: [{ translateY }] }]}
                source={logoImage}
            />
            <Text style={styles.text}>Welcome George</Text>
        </Screen>
    );
};

const styles = StyleSheet.create({
    logo: {
        width: 100,
        height: 100,
    },
    text: {
        color: colors.white,
        fontFamily: 'monospace',
        margin: 5,
    },
});

export default HomeScreen;
