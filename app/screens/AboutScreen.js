import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import Screen from './Screen';
import colors from '../config/colors';

function AboutScreen({}) {
    return (
        <Screen>
            <View style={styles.container}>
                <Text style={styles.text}>alinon</Text>
            </View>
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={require('../assets/logo.png')}
                />
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>1.0.0</Text>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        margin: 5,
        padding: 5,
    },
    image: {
        width: 100,
        height: 100,
    },
    text: {
        fontFamily: 'monospace',
        color: colors.white,
    },
});

export default AboutScreen;