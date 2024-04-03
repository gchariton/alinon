import React from 'react';
import { StyleSheet, View } from 'react-native';
import RadioTile from '../components/RadioTile';

import Screen from './Screen';

const RadioScreen = () => {
    const radioStations = [
        { name: 'ΣΚΑΪ', url: 'http://netradio.live24.gr:80/skai1003' },
        { name: 'ΕΡΑΣΠΟΡ', url: 'http://radiostreaming.ert.gr/ert-erasport' },
        { name: 'SPORT FM', url: 'http://www.gointernet.gr:8005/' },
    ];

    return (
        <Screen>
            {radioStations.map((station, index) => (
                <RadioTile key={index} station={station} />
            ))}
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {},
});

export default RadioScreen;
