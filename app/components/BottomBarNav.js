import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import NewsScreen from '../screens/NewsScreen';
import CryptoScreen from '../screens/CryptoScreen';
import InfoScreen from '../screens/InfoScreen';

import colors from '../config/colors';

const Tab = createBottomTabNavigator();

export default function BottomBarNav() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveBackgroundColor: colors.secondary,
                    tabBarInactiveBackgroundColor: colors.primary,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        height: 50,
                        borderTopColor: colors.blue,
                        borderTopWidth: 1,
                        backgroundColor: colors.primary,
                    },
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
                }}
            >
                <Tab.Screen
                    name='Home'
                    component={HomeScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons
                                name='home'
                                color={color}
                                size={size}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name='News'
                    component={NewsScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons
                                name='newspaper'
                                color={color}
                                size={size}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name='Crypto'
                    component={CryptoScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons
                                name='bitcoin'
                                color={color}
                                size={size}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name='Info'
                    component={InfoScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons
                                name='information'
                                color={color}
                                size={size}
                            />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
