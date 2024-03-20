import React from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity } from 'react-native';

import colors from '../config/colors';

function TextHyperlink({ url, text }) {
    const handlePress = async () => {
        try {
            await Linking.openURL(url);
        } catch (error) {
            console.error('Error opening URL:', error);
        }
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    text: {
        color: colors.white,
        fontFamily: 'monospace',
    },
});

export default TextHyperlink;
