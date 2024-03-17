import React from 'react';
import { StyleSheet } from 'react-native';

import Screen from './Screen';
import { Image } from 'react-native';

function HomeScreen({}) {
    return (
        <Screen>
            <Image
                style={styles.image}
                source={require('../assets/logo.png')}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
    },
});
export default HomeScreen;
