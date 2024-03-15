import React from 'react';
import { StyleSheet, Text } from 'react-native';

import ButtonTile from '../components/ButtonTile';
import Screen from './Screen';
import colors from '../config/colors';

function MainScreen({}) {
    return (
        <Screen>
            <ButtonTile label={'00 about'} />
            <ButtonTile label={'01 news'} />
            <ButtonTile label={'02 crypto'} />
        </Screen>
    );
}

const styles = StyleSheet.create({
    text: {
        color: colors.white,
        fontFamily: 'monospace',
    },
});

export default MainScreen;
