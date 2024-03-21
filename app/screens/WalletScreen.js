import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Screen from './Screen';

import CryptoTile from '../components/CryptoTile';
import colors from '../config/colors';

function WalletScreen({}) {
    const [input, setInput] = useState('');
    return (
        <Screen>
            <Text style={styles.label}>auto updates every 60 sec</Text>
            <View style={styles.container}>
                <CryptoTile cryptosymbol={'BTC'} />
                <CryptoTile cryptosymbol={'ETH'} />
                <CryptoTile cryptosymbol={'SOL'} />
                <CryptoTile cryptosymbol={'ADA'} />
                <CryptoTile cryptosymbol={'XRP'} />
                <CryptoTile cryptosymbol={'DOT'} />
                <CryptoTile cryptosymbol={'XLM'} />
                <CryptoTile cryptosymbol={'WLD'} />
                <Text style={styles.label}>type your crypto symbol</Text>
                <TextInput
                    style={styles.input}
                    placeholder='SYMBOL'
                    placeholderTextColor={'gray'}
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
        borderColor: colors.white,
        borderRadius: 5,
        color: colors.blue,
        fontFamily: 'monospace',
        fontSize: 20,
        marginBottom: 25,
        padding: 5,
        width: '100%',
    },
    label: {
        color: 'gray',
        fontFamily: 'monospace',
        marginBottom: 25,
        marginTop: 25,
    },
    text: {
        fontFamily: 'monospace',
        color: colors.white,
    },
});

export default WalletScreen;
