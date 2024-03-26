import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

import constants from '../config/constants';

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const fetchWeather = async (lat, lon) => {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${constants.WEATHER.API_KEY}`
                );
                const { data } = response;
                setWeatherData(data);
            } catch (error) {
                console.error('[Weather.js] Error fetching weather:', error);
            }
        };

        fetchWeather(39.36, 22.94);
    }, []);

    if (!weatherData) {
        return null;
    }

    const { humidity, temp, weather } = weatherData.current;

    return (
        <View style={styles.weatherContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.tempText}>
                    {temp}˚C - {humidity}%
                </Text>
            </View>
            <View style={styles.bodyContainer}>
                <Text style={styles.title}>{weather[0].main}</Text>
                <Text style={styles.subtitle}>{weather[0].icon}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    weatherContainer: {
        flex: 1,
        backgroundColor: '#f7b733',
    },
    headerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tempText: {
        fontSize: 20,
        color: '#fff',
    },
    bodyContainer: {
        flex: 2,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        paddingLeft: 25,
        marginBottom: 40,
    },
    title: {
        fontSize: 20,
        color: '#fff',
    },
    subtitle: {
        fontSize: 20,
        color: '#fff',
    },
});

export default Weather;
