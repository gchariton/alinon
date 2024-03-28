import React, { useCallback, useRef, useEffect, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import TextHyperlink from '../components/TextHyperlink';
import Weather from '../components/Weather';

import Screen from './Screen';
import colors from '../config/colors';
import fetchMission from '../functions/fetchMission';

const logoImage = require('../assets/logo.png');

const HomeScreen = ({ navigation }) => {
    const translateY = useRef(new Animated.Value(-500)).current;
    const isFocused = useIsFocused();
    const [mission, setMission] = useState({});

    const fetchMissionData = useCallback(async () => {
        const data = await fetchMission();
        setMission(data);
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
            <View style={styles.containerinfo}>
                <Animated.Image
                    style={[styles.logo, { transform: [{ translateY }] }]}
                    source={logoImage}
                />
                <TextHyperlink
                    style={styles.text}
                    url='http://icloud.gr'
                    text='Hello George'
                />
                {mission && (
                    <Text style={styles.text}>
                        Let's {String(mission.activity).toLowerCase()}!
                    </Text>
                )}
            </View>
            <View style={styles.containerweather}>
                <Weather />
            </View>
        </Screen>
    );
};

const styles = StyleSheet.create({
    containerinfo: {
        alignItems: 'center',
        flex: 2,
        justifyContent: 'flex-end',
        margin: 5,
        width: '90%',
    },
    containerweather: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        margin: 5,
        width: '90%',
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
    },
});

export default HomeScreen;
