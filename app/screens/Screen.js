import React from 'react';
import { StyleSheet, View } from 'react-native';

import colors from '../config/colors';

function Screen({ children, style }) {
    return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: colors.primary,
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        width: '100%',
    },
});

export default Screen;
