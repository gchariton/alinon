import { ScrollView, StyleSheet } from 'react-native';

import Screen from './Screen';
import NewsTile from '../components/NewsTile';

import useFetchNews from '../hooks/useFetchNews';

function NewsScreen({}) {
    const sortedFeed = useFetchNews();

    return (
        <Screen>
            <ScrollView style={styles.container}>
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
