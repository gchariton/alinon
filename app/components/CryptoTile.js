import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

import colors from '../config/colors';

export default function CryptoTile({ cryptosymbol }) {
    const [coinData, setCoinData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
                    {
                        headers: {
                            'X-CMC_PRO_API_KEY':
                                'b0a5949f-b36c-479d-8cae-633c92223b01',
                        },
                    }
                );

                const json = response.data;
                setCoinData(
                    json.data.find((item) => item.symbol === cryptosymbol)
                );
            } catch (error) {
                console.log(error);
                throw error;
            }
        };

        fetchData();
    }, [cryptosymbol]);

    return (
        <View style={styles.container}>
            {coinData && (
                <>
                    <View>
                        <Text style={styles.coinsymbol}>{coinData.symbol}</Text>
                    </View>
                    <View>
                        <Text style={styles.coinprice}>
                            ${coinData.quote.USD.price}
                        </Text>
                    </View>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5,
        padding: 5,
        width: '100%',
    },
    coinprice: {
        fontFamily: 'monospace',
        fontSize: 20,
        color: colors.green,
    },
    coinsymbol: {
        fontFamily: 'monospace',
        fontSize: 20,
        color: colors.blue,
    },
});
