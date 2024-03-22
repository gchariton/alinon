import React, { useEffect, useState, useCallback } from 'react';
import {
    FlatList,
    RefreshControl,
    ScrollView,
    StyleSheet,
    TextInput,
    View,
} from 'react-native';

import Screen from './Screen';
import CryptoTile from '../components/CryptoTile';
import { fetchCryptoList } from '../functions/fetchCryptoList';
import colors from '../config/colors';

function CryptoScreen({}) {
    const [cryptoList, setCryptoList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchCryptoList(setCryptoList, setRefreshing);
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchCryptoList(setCryptoList, setRefreshing);
    }, []);

    const renderCryptoTile = ({ item }) => (
        <CryptoTile key={item.id} cryptoitem={item} />
    );

    const filteredCryptoList = cryptoList.filter(
        (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Screen>
            <View style={styles.searchbox}>
                <TextInput
                    style={styles.input}
                    placeholder='Search coin...'
                    placeholderTextColor={'gray'}
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                />
            </View>
            <FlatList
                style={styles.flatlist}
                data={filteredCryptoList}
                renderItem={renderCryptoTile}
                keyExtractor={(item) => item.id.toString()}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[colors.red, colors.green, colors.blue]}
                        progressBackgroundColor={colors.primary}
                        size={'large'}
                    />
                }
            ></FlatList>
        </Screen>
    );
}

const styles = StyleSheet.create({
    flatlist: {
        margin: 5,
        padding: 5,
    },
    input: {
        color: colors.blue,
        fontFamily: 'monospace',
        fontWeight: 'bold',
        fontSize: 20,
    },

    searchbox: {
        backgroundColor: colors.secondary,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        marginTop: 25,
        padding: 10,
        width: '90%',
    },
});

export default CryptoScreen;
