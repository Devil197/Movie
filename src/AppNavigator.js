import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTE_KEY } from './constants/constants'

// import
import BottomNavigation from './BottomNavigation';

import { Login } from './components/screens'

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator
            initialRouteName={ROUTE_KEY.BottomNavigation}
            headerMode="none"
            screenOptions={{
                headerTintColor: 'white',
                headerStyle: { backgroundColor: 'tomato' },
            }}
        >
            <Stack.Screen
                name={ROUTE_KEY.BottomNavigation}
                component={BottomNavigation}
            />
            <Stack.Screen
                name={ROUTE_KEY.Login}
                component={Login}
            />
        </Stack.Navigator>
    );
}
export default function AppNavigator() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}