import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import colors from '../config/colors';

function ButtonTile({ label }) {
    return (
        <TouchableOpacity style={styles.button}>
            <View>
                <Text style={styles.text}>{label}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.secondary,
        borderRadius: 5,
        elevation: 5,
        margin: 5,
        padding: 5,
        width: '80%',
    },
    text: {
        color: colors.white,
        fontFamily: 'monospace',
    },
});

export default ButtonTile;
