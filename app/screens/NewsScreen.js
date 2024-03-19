import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, StyleSheet, RefreshControl } from 'react-native';

import Screen from './Screen';
import NewsTile from '../components/NewsTile';
import colors from '../config/colors';
import { fetchNews } from '../functions/fetchNews';

function NewsScreen() {
    const [sortedFeed, setSortedFeed] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchNews(setSortedFeed, setRefreshing);
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchNews(setSortedFeed, setRefreshing);
    }, []);

    return (
        <Screen>
            <ScrollView
                style={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[colors.red, colors.green, colors.blue]}
                        progressBackgroundColor={colors.primary}
                        size={'large'}
                    />
                }
            >
                {sortedFeed.map((feeditem) => (
                    <NewsTile key={feeditem.id} feed={feeditem} />
                ))}
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 5,
        padding: 5,
    },
});

export default NewsScreen;
