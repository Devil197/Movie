import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {ROUTE_KEY} from './constants/constants'

import {Home,Profile,Setting, Favorite} from './components/tabScreens'

import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'

const Tab = createBottomTabNavigator();

function MyBottomTab() {
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: "#6c5ce7",
                inactiveTintColor: '#bebebe',
                showIcon: true,
                showLabel: false,
                style: {
                    backgroundColor: '#fff',
                }
            }}
        >
            <Tab.Screen
                name={ROUTE_KEY.Home}
                component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name={ROUTE_KEY.Profile}
                component={Profile}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-settings" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name={ROUTE_KEY.Setting}
                component={Setting}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="settings-outline" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name={ROUTE_KEY.Favorite}
                component={Favorite}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Fontisto name="favorite" color={color} size={size} />
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