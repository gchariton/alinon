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

import * as Progress from 'react-native-progress';

import Screen from './Screen';
import NewsTile from '../components/NewsTile';
import colors from '../config/colors';
import { fetchNews } from '../functions/fetchNews';

function NewsScreen() {
    const [sortedFeed, setSortedFeed] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [isProgressHidden, setIsProgressHidden] = useState(false);

    const scrollRef = useRef();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsProgressHidden(false); // Show progress circle while fetching data
        try {
            await fetchNews(setSortedFeed, setRefreshing);
        } finally {
            setIsProgressHidden(true); // Hide progress circle when fetching is done
        }
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchData();
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
            {!isProgressHidden && (
                <View style={styles.progress}>
                    <Progress.CircleSnail
                        color={[colors.red, colors.green, colors.blue]}
                        hidesWhenStopped={!isProgressHidden}
                        size={100}
                    />
                </View>
            )}
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
                        size={58}
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
        position: 'relative',
        zIndex: 2,
    },
    progress: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        position: 'absolute',
        zIndex: 1,
    },
    swipebox: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
        width: 80,
    },
    upbutton: {
        alignItems: 'center',
        backgroundColor: colors.primary,
        borderRadius: 29,
        bottom: 20,
        height: 58,
        justifyContent: 'center',
        position: 'absolute',
        right: 20,
        width: 58,
    },
});

export default NewsScreen;
