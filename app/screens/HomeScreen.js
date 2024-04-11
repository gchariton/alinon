import React, { useCallback, useRef, useEffect, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import TextHyperlink from '../components/TextHyperlink';

import Screen from './Screen';
import colors from '../config/colors';
import fetchMission from '../functions/fetchMission';

const logoImage = require('../assets/logo.png');

const HomeScreen = ({ navigation }) => {
    const translateY = useRef(new Animated.Value(-500)).current;
    const isFocused = useIsFocused();
    const [mission, setMission] = useState('');

    const fetchMissionData = useCallback(async () => {
        const data = await fetchMission();
        setMission(data.activity);
    }, []);

    useEffect(() => {
        if (isFocused) {
            translateY.setValue(-500);
            Animated.timing(translateY, {
                toValue: 0,
                duration: 3000,
                useNativeDriver: true,
            }).start();
            fetchMissionData();
        }
    }, [isFocused]);

    return (
        <Screen>
            <View>
                <View style={styles.containerTop}>
                    <Animated.Image
                        style={[styles.logo, { transform: [{ translateY }] }]}
                        source={logoImage}
                    />
                    <TextHyperlink
                        style={styles.text}
                        url='http://icloud.gr'
                        text='Hello George!'
                    />
                </View>
                <View style={styles.containerBottom}>
                    {mission !== '' && (
                        <Text style={[styles.text, { color: 'gray' }]}>
                            Today let's {String(mission).toLowerCase()}!
                        </Text>
                    )}
                </View>
            </View>
        </Screen>
    );
};

const styles = StyleSheet.create({
    containerBottom: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        width: '80%',
    },
    containerTop: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end',
    },
    logo: {
        height: 100,
        margin: 5,
        width: 100,
    },
    text: {
        color: colors.white,
        fontFamily: 'monospace',
        margin: 5,
        textAlign: 'center',
    },
});

export default HomeScreen;
