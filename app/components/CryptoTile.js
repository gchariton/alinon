import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import colors from '../config/colors';

const CryptoTile = React.memo(({ cryptoitem }) => {
    return (
        <View style={styles.container}>
            {cryptoitem && (
                <>
                    <Text style={styles.coinsymbol}>
                        {cryptoitem.name} ({cryptoitem.symbol})
                    </Text>
                    <Text style={styles.coinprice}>
                        ${Number(cryptoitem.quote.USD.price).toFixed(5)}
                    </Text>
                </>
            )}
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        borderBottomColor: colors.white,
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        marginBottom: 5,
        padding: 10,
        width: '100%',
    },
    coinprice: {
        fontFamily: 'monospace',
        fontSize: 16,
        color: colors.yellow,
    },
    coinsymbol: {
        fontFamily: 'monospace',
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.blue,
    },
    error: {
        fontFamily: 'monospace',
        fontSize: 20,
        color: colors.red,
    },
});

export default CryptoTile;
