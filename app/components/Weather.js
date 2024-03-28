import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import fetchWeather from '../functions/fetchWeather';
import colors from '../config/colors';

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [location, setLocation] = useState(null);
    const [currentAddress, setCurrentAddress] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            try {
                const location = await Location.getCurrentPositionAsync({});
                const address = await Location.reverseGeocodeAsync(
                    location.coords
                );
                setLocation(location);
                setCurrentAddress(address[0]);
            } catch (error) {
                setErrorMsg('Error fetching location');
            }
        })();
    }, []);

    const fetchWeatherData = async () => {
        try {
            const data = await fetchWeather(
                location.coords.latitude,
                location.coords.longitude
            );
            setWeatherData(data);
        } catch (error) {
            setErrorMsg('Error fetching weather data');
        }
    };

    useEffect(() => {
        if (location) {
            fetchWeatherData();
        }
    }, [location]);

    const handleWeather = () => {
        fetchWeatherData();
    };

    const weatherInfo = useMemo(() => {
        if (weatherData) {
            return (
                <>
                    <Text style={styles.weatherText}>
                        temp now:{' '}
                        <Text style={styles.weatherValues}>
                            {weatherData.current.temperature_2m}˚C
                        </Text>
                    </Text>
                    <Text style={styles.weatherText}>
                        humidity:{' '}
                        <Text style={styles.weatherValues}>
                            {weatherData.current.relative_humidity_2m}%
                        </Text>
                    </Text>
                    <Text></Text>
                    <Text style={styles.weatherText}>
                        max today:{' '}
                        <Text style={styles.weatherValues}>
                            {Math.max(...weatherData.daily.temperature_2m_max)}
                            ˚C
                        </Text>
                    </Text>
                    <Text style={styles.weatherText}>
                        min today:{' '}
                        <Text style={styles.weatherValues}>
                            {Math.min(...weatherData.daily.temperature_2m_min)}
                            ˚C
                        </Text>
                    </Text>
                    <Text></Text>
                    <Text style={styles.weatherText}>
                        sunrise:{' '}
                        <Text style={styles.weatherValues}>
                            {weatherData.daily.sunrise[0].substring(11, 16)}
                        </Text>
                    </Text>
                    <Text style={styles.weatherText}>
                        sunset:{' '}
                        <Text style={styles.weatherValues}>
                            {weatherData.daily.sunset[0].substring(11, 16)}
                        </Text>
                    </Text>
                </>
            );
        }
        return null;
    }, [weatherData]);

    return (
        <View style={styles.weatherContainer}>
            <View style={styles.weatherCard}>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={handleWeather}>
                        <MaterialCommunityIcons
                            name={'google-maps'}
                            color={colors.green}
                            size={90}
                        />
                    </TouchableOpacity>
                    {currentAddress && (
                        <>
                            <Text style={styles.address}>
                                {currentAddress.city}
                            </Text>
                            <Text style={styles.address}>
                                {currentAddress.country}
                            </Text>
                        </>
                    )}
                </View>
                <View style={styles.weatherInfoContainer}>{weatherInfo}</View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    address: {
        color: colors.green,
        fontFamily: 'monospace',
        fontSize: 14,
        fontWeight: 'bold',
        padding: 3,
    },
    weatherContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    weatherCard: {
        backgroundColor: colors.secondary,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        width: '100%',
    },
    weatherInfoContainer: {
        margin: 5,
        alignItems: 'flex-start',
    },
    weatherText: {
        fontFamily: 'monospace',
        color: colors.blue,
    },
    weatherValues: {
        fontFamily: 'monospace',
        color: colors.yellow,
    },
});

export default Weather;
