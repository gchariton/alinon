import React from 'react';
import { StyleSheet, Text } from 'react-native';

import Screen from './Screen';
import colors from '../config/colors';

function SettingsScreen({}) {
    return (
        <Screen>
            <Text style={styles.text}>settings screen</Text>
        </Screen>
    );
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'monospace',
        color: colors.white,
    },
});

export default SettingsScreen;
