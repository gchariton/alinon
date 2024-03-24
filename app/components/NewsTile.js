import React from 'react';
import {
    StyleSheet,
    Linking,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

import colors from '../config/colors';
import getDomain from '../functions/getDomain';

function NewsTile({ feed, index, renderRightActions }) {
    const publishedDate = new Date(feed.published);
    const formattedDate = publishedDate.toLocaleString('el-GR', {
        hour12: false,
        timeZone: 'Europe/Athens',
    });

    return (
        <Swipeable renderRightActions={renderRightActions}>
            <TouchableOpacity
                style={styles.container}
                key={index}
                onPress={() => Linking.openURL(String(feed.id))}
            >
                <Text style={styles.title}>{String(feed.title)}</Text>
                <View style={styles.meta}>
                    <Text style={styles.pubdate}>
                        {formattedDate.substring(0, 16)}
                    </Text>
                    <Text style={styles.source}>
                        {String(getDomain(feed.id))}
                    </Text>
                </View>
            </TouchableOpacity>
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.secondary,
        borderRadius: 10,
        elevation: 2,
        margin: 5,
        padding: 10,
    },
    meta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        width: '100%',
    },
    pubdate: {
        fontFamily: 'monospace',
        color: colors.blue,
    },
    source: {
        fontFamily: 'monospace',
        color: colors.green,
    },
    title: {
        fontFamily: 'monospace',
        fontSize: 16,
        color: colors.white,
    },
});

export default NewsTile;
