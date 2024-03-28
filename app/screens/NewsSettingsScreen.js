import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Screen from './Screen';

import colors from '../config/colors';

function NewsSettingsScreen({}) {
    return (
        <Screen style={styles.container}>
            <Text style={styles.text}>News settings here...</Text>
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

export default NewsSettingsScreen;
