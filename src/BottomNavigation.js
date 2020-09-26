import * as React from 'react';
import { ROUTE_KEY } from './constants/constants'

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Home, Profile, Setting, Favorite } from './components/tabScreens'
import Details from './components/screens/Details';

import Icon from 'react-native-vector-icons/Feather';
import Music from './components/tabScreens/Music';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack({ route, navigation }) {
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen
                name="Home"
                component={Home}
            />
            <Stack.Screen
                name="Details"
                component={Details}
            />
        </Stack.Navigator>
    )
}
const tabBarOptions = {
    activeTintColor: "#000",
    showLabel: false,

}
function MyBottomTab() {
    return (
        <Tab.Navigator tabBarOptions={tabBarOptions}
        >
            <Tab.Screen
                name={"Film"}
                component={HomeStack}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="film" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name={"Music"}
                component={Music}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="music" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name={"Favorite"}
                component={Favorite}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="heart" color={color} size={size} />
                    ),
                }}
            />




            <Tab.Screen
                name={"Profile"}
                component={Profile}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="user" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default function BottomNavigation() {
    return (
        <MyBottomTab />
    );
}