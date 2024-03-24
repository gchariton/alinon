import React from 'react';

import BottomBarNav from './app/components/BottomBarNav';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomBarNav />
        </GestureHandlerRootView>
    );
}
