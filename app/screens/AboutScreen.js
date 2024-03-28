import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Screen from './Screen';

import colors from '../config/colors';

function AboutScreen({}) {
    return (
        <Screen style={styles.container}>
            <Text style={styles.text}>App created by G. Charitonidis.</Text>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 10,
    },
    text: {
        color: colors.white,
        fontFamily: 'monospace',
    },
});

export default AboutScreen;
