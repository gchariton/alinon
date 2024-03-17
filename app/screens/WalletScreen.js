import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Screen from './Screen';

import colors from '../config/colors';

function WalletScreen({}) {
    return (
        <Screen>
            <View style={styles.container}>
                <Text style={styles.text}>wallet</Text>
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
    text: {
        fontFamily: 'monospace',
        color: colors.white,
    },
});

export default WalletScreen;
