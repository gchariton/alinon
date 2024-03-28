import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import NewsScreen from '../screens/NewsScreen';
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

const BottomBarNav = () => (
    <NavigationContainer>
        <Tab.Navigator screenOptions={tabBarOptions}>
            <Tab.Screen
                name='Home'
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <TabIcon name='home' color={color} size={size} />
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
            />
            <Tab.Screen
                name='Settings'
                component={SettingsNav}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <TabIcon name='tools' color={color} size={size} />
                    ),
                    ...screenOptions,
                    headerLeft: () => {
                        return (
                            <View style={{ marginLeft: 20 }}>
                                <TabIcon
                                    name='tools'
                                    color={colors.yellow}
                                    size={24}
                                />
                            </View>
                        );
                    },
                }}
            />
        </Tab.Navigator>
    </NavigationContainer>
);

export default BottomBarNav;
