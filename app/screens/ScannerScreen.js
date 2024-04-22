import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { CameraView, Camera } from 'expo-camera/next';

import Screen from './Screen';
import TextHyperlink from '../components/TextHyperlink';
import colors from '../config/colors';

function ScannerScreen() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [result, setResult] = useState(null);

    useEffect(() => {
        const getCameraPermissions = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getCameraPermissions();
    }, []);

    const handleBarCodeScanned = ({ data }) => {
        setScanned(true);
        setResult(data);
    };

    const handleResult = () => {
        if (!result) return null;

        if (result.startsWith('http')) {
            return (
                <TextHyperlink style={styles.link} url={result} text={result} />
            );
        } else {
            return <Text style={styles.text}>{result}</Text>;
        }
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <Screen>
            <View style={styles.camerabox}>
                <CameraView
                    onBarcodeScanned={
                        scanned ? undefined : handleBarCodeScanned
                    }
                    barcodeScannerSettings={{
                        barcodeTypes: ['qr', 'pdf417'],
                    }}
                    style={StyleSheet.absoluteFillObject}
                />
                {scanned && (
                    <Button
                        title={'Tap to Scan Again'}
                        onPress={() => setScanned(false)}
                    />
                )}
            </View>
            <View style={styles.textbox}>
                <Text style={styles.text} numberOfLines={5}>
                    {handleResult()}
                </Text>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    camerabox: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
    },
    link: {
        color: colors.blue,
        fontFamily: 'monospace',
        textDecorationLine: 'underline',
    },
    text: {
        color: colors.white,
        flexWrap: 'wrap',
        fontFamily: 'monospace',
        padding: 5,
    },
    textbox: {
        borderTopColor: colors.blue,
        borderTopWidth: 3,
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        width: '100%',
    },
});

export default ScannerScreen;
