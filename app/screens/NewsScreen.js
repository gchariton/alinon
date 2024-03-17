import { useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';

import Screen from './Screen';
import NewsTile from '../components/NewsTile';
import useFetchNews from '../hooks/useFetchNews';

import colors from '../config/colors';
import feed from '../config/feed';

function NewsScreen({}) {
    const [refreshing, setRefreshing] = useState(false);

    const feed01 = useFetchNews(feed.news.CAPITALGR);
    const feed02 = useFetchNews(feed.news.PROTOTHEMAGR);
    const feed03 = useFetchNews(feed.news.SPORT24GR);

    const rssFeed = [...feed01, ...feed02, ...feed03];

    const sortedFeed = rssFeed.sort((a, b) => {
        return (
            new Date(b.published).getTime() - new Date(a.published).getTime()
        );
    });

    const handleRefresh = () => {
        setRefreshing(true);
        // REFRESHINGCOMMANDS
        setRefreshing(false);
    };

    return (
        <Screen>
            <ScrollView
                style={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        colors={[colors.red, colors.green, colors.blue]}
                        enabled={true}
                        progressBackgroundColor={colors.primary}
                        progressViewOffset={0}
                        size='default'
                    />
                }
            >
                {sortedFeed.map((feeditem) => {
                    return <NewsTile key={feeditem.id} feed={feeditem} />;
                })}
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
