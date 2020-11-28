import * as React from 'react';
import { ROUTE_KEY } from './constants/constants';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

import { Home, Profile, Music, Category, Follow } from './components/tabScreens';
import { Videos } from './components/screens';

const Tab = createBottomTabNavigator();

const tabBarOptions = {
  activeTintColor: '#000',
  showLabel: false,
  keyboardHidesTabBar: true,
  style: {
    position: 'absolute',
  },
};
function MyBottomTab() {
  return (
    <Tab.Navigator tabBarOptions={tabBarOptions}>
      <Tab.Screen
        name={ROUTE_KEY.Film}
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="film" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTE_KEY.Music}
        component={Music}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="music" color={color} size={size} />
          ),
        }}
      />
      {/* <Tab.Screen
        name={ROUTE_KEY.Category}
        component={Category}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="grid" color={color} size={size} />
          ),
        }}
      /> */}
      <Tab.Screen
        name={ROUTE_KEY.Follow}
        component={Follow}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="heart" color={color} size={size} />
          ),
          tabBarBadge: 1,
        }}
      />

      <Tab.Screen
        name={ROUTE_KEY.Profile}
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
  return <MyBottomTab />;
}
