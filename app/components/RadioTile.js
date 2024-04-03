import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import fetchRadio from '../functions/fetchRadio';
import colors from '../config/colors';

const RadioTile = ({ station }) => {
    const [sound, setSound] = useState(null);
    const [isBuffering, setIsBuffering] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, []);

    const handlePlayPause = async () => {
        setIsBuffering(true);
        if (sound) {
            const status = await sound.getStatusAsync();
            if (status.isPlaying) {
                await sound.pauseAsync();
                setIsPlaying(false);
            } else {
                await sound.unloadAsync();
                const newSound = await fetchRadio(station.url);
                setSound(newSound);
                await newSound.playAsync();
                setIsPlaying(true);
            }
        } else {
            const newSound = await fetchRadio(station.url);
            setSound(newSound);
            await newSound.playAsync();
            setIsPlaying(true);
        }
        setIsBuffering(false);
    };

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>
                    {station.name}{' '}
                    {isBuffering && (
                        <Text style={styles.bufferingText}>buffering...</Text>
                    )}
                </Text>
            </View>
            <View>
                <Pressable
                    style={({ pressed }) => [
                        styles.button,
                        isBuffering && { opacity: 0.5 },
                    ]}
                    disabled={isBuffering}
                    onPress={handlePlayPause}
                >
                    <Text style={styles.title}>
                        {isPlaying ? 'PAUSE' : 'PLAY'}
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    bufferingText: {
        color: colors.green,
        fontFamily: 'monospace',
    },
    button: {
        backgroundColor: colors.blue,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        overflow: 'hidden',
        width: 100,
    },
    container: {
        alignItems: 'center',
        backgroundColor: colors.secondary,
        borderColor: 'gray',
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        width: '90%',
    },
    title: {
        color: colors.white,
        fontFamily: 'monospace',
        fontWeight: 'bold',
        padding: 5,
        textAlign: 'center',
    },
});

export default RadioTile;
