import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
    RefreshControl,
    ScrollView,
    Share,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Screen from './Screen';
import NewsTile from '../components/NewsTile';
import colors from '../config/colors';
import { fetchNews } from '../functions/fetchNews';

function NewsScreen() {
    const [sortedFeed, setSortedFeed] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const scrollRef = useRef();

    useEffect(() => {
        fetchNews(setSortedFeed, setRefreshing);
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchNews(setSortedFeed, setRefreshing);
    }, []);

    const handleShare = async (feed) => {
        try {
            await Share.share({
                message: `${feed.title} - ${feed.id}`,
            });
        } catch (error) {
            console.error(error.message);
        }
    };

    const onPressScrollToTop = () => {
        scrollRef.current?.scrollTo({ y: 0, animated: true });
    };

    return (
        <Screen>
            <ScrollView
                ref={scrollRef}
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
                    <NewsTile
                        key={feeditem.id}
                        feed={feeditem}
                        renderRightActions={() => (
                            <View style={styles.swipebox}>
                                <TouchableOpacity
                                    onPress={() => handleShare(feeditem)}
                                >
                                    <MaterialCommunityIcons
                                        name={'share'}
                                        color={colors.blue}
                                        size={36}
                                    />
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                ))}
            </ScrollView>
            <View style={styles.upbutton}>
                <TouchableOpacity onPress={onPressScrollToTop}>
                    <MaterialCommunityIcons
                        name={'arrow-up-circle'}
                        color={colors.blue}
                        size={50}
                    />
                </TouchableOpacity>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 5,
        padding: 5,
    },
    swipebox: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
        width: 80,
    },
    upbutton: {
        bottom: 20,
        elevation: 5,
        right: 20,
        position: 'absolute',
    },
});

export default NewsScreen;
