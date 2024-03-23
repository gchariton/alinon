import React, { useRef, useEffect } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import Screen from './Screen';

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
        </Screen>
    );
};

const styles = StyleSheet.create({
    logo: {
        width: 100,
        height: 100,
    },
});

export default HomeScreen;
