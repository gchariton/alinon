import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Screen from './Screen';
import FeedTile from '../components/FeedTile';

import colors from '../config/colors';
import feed from '../config/feed';

function NewsSettingsScreen({}) {
    const sortedFeed = [...feed.news].sort();

    return (
        <Screen style={styles.container}>
            <Text style={styles.text}>Current news feed sources:</Text>
            <View>
                {sortedFeed.map((item) => (
                    <FeedTile key={item} source={item} />
                ))}
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 10,
    },
    text: {
        color: colors.white,
        fontFamily: 'monospace',
        margin: 10,
    },
});

export default NewsSettingsScreen;
