import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

import constants from '../config/constants';
import colors from '../config/colors';

const CryptoTile = ({ cryptosymbol }) => {
    const [coinData, setCoinData] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get(constants.CRYPTO.API_URL, {
                headers: {
                    'X-CMC_PRO_API_KEY': constants.CRYPTO.API_KEY,
                },
            });

            const { data } = response.data;
            const selectedCoin = data.find(
                (item) => item.symbol === cryptosymbol
            );

            if (!selectedCoin) {
                return (
                    <View style={styles.container}>
                        <Text style={styles.error}> COIN NOT FOUND</Text>
                    </View>
                );
            }
            setCoinData(selectedCoin);
        } catch (error) {
            console.log(error);
            // Handle error
        }
    }, [cryptosymbol]);

    useEffect(() => {
        fetchData();

        // Set up interval to fetch data every 61 seconds
        const interval = setInterval(() => {
            fetchData();
        }, 61000);

        return () => clearInterval(interval);
    }, [fetchData]);

    return (
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
        color: colors.blue,
    },
    error: {
        fontFamily: 'monospace',
        fontSize: 20,
        color: colors.red,
    },
});

export default CryptoTile;
