import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import fetchCrypto from '../functions/fetchCrypto';

import colors from '../config/colors';

const CryptoTile = ({ cryptosymbol }) => {
    const [coinData, setCoinData] = useState(null);

    const fetchCoinData = useCallback(() => {
        fetchCrypto(cryptosymbol, setCoinData);
    }, [cryptosymbol]);

    useEffect(() => {
        fetchCoinData();

        // Set up interval to fetch data every 60 seconds
        // due to API restrictions
        const interval = setInterval(() => {
            fetchCoinData();
        }, 60000);

        return () => clearInterval(interval);
    }, [fetchCrypto]);

    return coinData ? (
        <View style={styles.container}>
            {coinData && (
                <>
                    <Text style={styles.coinsymbol}>{coinData.symbol}</Text>
                    <Text style={styles.coinprice}>
                        ${Number(coinData.quote.USD.price).toFixed(2)}
                    </Text>
                </>
            )}
        </View>
    ) : (
        <View style={styles.container}>
            <Text style={styles.error}>...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderBottomColor: colors.white,
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        width: '100%',
    },
    coinprice: {
        fontFamily: 'monospace',
        fontSize: 20,
        color: colors.yellow,
    },
    coinsymbol: {
        fontFamily: 'monospace',
        fontSize: 20,
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
