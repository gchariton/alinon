import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import Screen from './Screen';
import FeedTile from '../components/FeedTile';

import colors from '../config/colors';
import feed from '../config/feed';

function NewsSettingsScreen({}) {
    const [sourceDomain, setSourceDomain] = useState('');

    return (
        <Screen style={styles.container}>
            <Text style={styles.text}>Current news feed sources:</Text>
            <Text style={styles.text}>
                {feed.news.map((item) => (
                    <FeedTile key={item} source={item} />
                ))}
            </Text>
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
    },
});

export default NewsSettingsScreen;
