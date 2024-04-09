import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SettingsScreen from '../screens/SettingsScreen';
import NewsSettingsScreen from '../screens/NewsSettingsScreen';
import SoccerScreen from '../screens/SoccerScreen';
import AboutScreen from '../screens/AboutScreen';

import colors from '../config/colors';

const Stack = createStackNavigator();

function SettingsNav({}) {
    return (
        <Stack.Navigator
            screenOptions={{
                cardStyle: { backgroundColor: colors.primary },
            }}
        >
            <Stack.Screen
                name='SettingsScreen'
                component={SettingsScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='NewsSettingsScreen'
                component={NewsSettingsScreen}
                options={{
                    ...headerOptions,
                    title: 'News',
                }}
            />
            <Stack.Screen
                name='SoccerScreen'
                component={SoccerScreen}
                options={{
                    ...headerOptions,
                    title: 'Soccer',
                }}
            />
            <Stack.Screen
                name='AboutScreen'
                component={AboutScreen}
                options={{
                    ...headerOptions,
                    title: 'About',
                }}
            />
        </Stack.Navigator>
    );
}

const headerOptions = {
    headerStyle: {
        backgroundColor: colors.blue,
        borderBottomColor: colors.blue,
        borderBottomWidth: 1,
    },
    headerTintColor: colors.secondary,
    headerTitleStyle: {
        color: colors.secondary,
        fontFamily: 'monospace',
        fontSize: 24,
    },
};

export default SettingsNav;
