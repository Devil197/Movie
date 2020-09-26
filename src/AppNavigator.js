import * as React from 'react';
import { ROUTE_KEY } from './constants/constants'
 
import { NavigationContainer } from '@react-navigation/native';
import BottomNavigation from './BottomNavigation';
 

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <BottomNavigation />
        </NavigationContainer>

    );
}