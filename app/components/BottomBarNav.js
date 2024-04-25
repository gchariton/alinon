import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';

import HomeScreen from '../screens/HomeScreen';
import NewsScreen from '../screens/NewsScreen';
import RadioScreen from '../screens/RadioScreen';
import CryptoScreen from '../screens/CryptoScreen';

import SettingsNav from './SettingsNav';

import colors from '../config/colors';

const Tab = createBottomTabNavigator();

const TabIcon = ({ name, color, size }) => (
    <MaterialCommunityIcons name={name} color={color} size={size} />
);

const tabBarOptions = {
    tabBarActiveBackgroundColor: colors.secondary,
    tabBarInactiveBackgroundColor: colors.primary,
    tabBarShowLabel: false,
    tabBarStyle: {
        height: 50,
        borderTopColor: colors.blue,
        borderTopWidth: 1,
        backgroundColor: colors.primary,
    },
};

const screenOptions = {
    headerStyle: {
        backgroundColor: colors.secondary,
        borderBottomColor: colors.blue,
        borderBottomWidth: 1,
    },
    headerTintColor: colors.white,
    headerTitleStyle: {
        fontSize: 24,
        fontFamily: 'monospace',
    },
};

const BottomBarNav = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const isFocused = useIsFocused();

    useEffect(() => {
        checkLoginStatus();
    }, [isFocused]);

    const checkLoginStatus = async () => {
        try {
            const userToken = await SecureStore.getItemAsync('userToken');
            console.log(userToken);
            setIsLoggedIn(!!userToken);
        } catch (error) {
            console.error('Error checking login status:', error);
        } finally {
            //
        }
    };

    return (
        <Tab.Navigator screenOptions={tabBarOptions} initialRouteName={'Home'}>
            <Tab.Screen
                name='News'
                component={NewsScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <TabIcon name='newspaper' color={color} size={size} />
                    ),
                    ...screenOptions,
                    headerLeft: () => {
                        return (
                            <View style={{ marginLeft: 20 }}>
                                <TabIcon
                                    name='newspaper'
                                    color={colors.yellow}
                                    size={24}
                                />
                            </View>
                        );
                    },
                }}
                listeners={({ navigation }) => ({
                    tabPress: (e) => {
                        if (!isLoggedIn) {
                            e.preventDefault();
                            navigation.navigate('Home');
                        }
                    },
                })}
            />
            <Tab.Screen
                name='Radio'
                component={RadioScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <TabIcon name='radio' color={color} size={size} />
                    ),
                    ...screenOptions,
                    headerLeft: () => {
                        return (
                            <View style={{ marginLeft: 20 }}>
                                <TabIcon
                                    name='radio'
                                    color={colors.yellow}
                                    size={24}
                                />
                            </View>
                        );
                    },
                }}
                listeners={({ navigation }) => ({
                    tabPress: (e) => {
                        if (!isLoggedIn) {
                            e.preventDefault();
                            navigation.navigate('Home');
                        }
                    },
                })}
            />
            <Tab.Screen
                name='Home'
                component={HomeScreen}
                options={{
                    tabBarIcon: () => (
                        <TabIcon name='home' color={'green'} size={40} />
                    ),
                    ...screenOptions,
                    headerLeft: () => {
                        return (
                            <View style={{ marginLeft: 20 }}>
                                <TabIcon
                                    name='home'
                                    color={colors.yellow}
                                    size={24}
                                />
                            </View>
                        );
                    },
                }}
            />
            <Tab.Screen
                name='Crypto'
                component={CryptoScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <TabIcon name='bitcoin' color={color} size={size} />
                    ),
                    ...screenOptions,
                    headerLeft: () => {
                        return (
                            <View style={{ marginLeft: 20 }}>
                                <TabIcon
                                    name='bitcoin'
                                    color={colors.yellow}
                                    size={24}
                                />
                            </View>
                        );
                    },
                }}
                listeners={({ navigation }) => ({
                    tabPress: (e) => {
                        if (!isLoggedIn) {
                            e.preventDefault();
                            navigation.navigate('Home');
                        }
                    },
                })}
            />
            <Tab.Screen
                name='More'
                component={SettingsNav}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <TabIcon name='dots-square' color={color} size={size} />
                    ),
                    ...screenOptions,
                    headerLeft: () => {
                        return (
                            <View style={{ marginLeft: 20 }}>
                                <TabIcon
                                    name='dots-square'
                                    color={colors.yellow}
                                    size={24}
                                />
                            </View>
                        );
                    },
                }}
                listeners={({ navigation }) => ({
                    tabPress: (e) => {
                        if (!isLoggedIn) {
                            e.preventDefault();
                            navigation.navigate('Home');
                        }
                    },
                })}
            />
        </Tab.Navigator>
    );
};

export default BottomBarNav;
