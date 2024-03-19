import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Screen from './Screen';

import CryptoTile from '../components/CryptoTile';
import colors from '../config/colors';

function WalletScreen({}) {
    const [input, setInput] = useState('');
    return (
        <Screen>
            <View style={styles.container}>
                <CryptoTile cryptosymbol={'BTC'} />
                <CryptoTile cryptosymbol={'ETH'} />
                <CryptoTile cryptosymbol={'SOL'} />
                <CryptoTile cryptosymbol={'WLD'} />
                <TextInput
                    style={styles.input}
                    placeholder='SYMBOL'
                    value={input}
                    onChangeText={setInput}
                />
                <CryptoTile cryptosymbol={input} />
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        margin: 5,
        padding: 5,
        width: '80%',
    },
    input: {
        backgroundColor: colors.secondary,
        borderWidth: 1,
        borderColor: colors.secondary,
        borderRadius: 5,
        color: colors.blue,
        fontFamily: 'monospace',
        fontSize: 20,
        marginBottom: 25,
        marginTop: 25,
        padding: 5,
        width: '100%',
    },
    text: {
        fontFamily: 'monospace',
        color: colors.white,
    },
});

export default WalletScreen;
