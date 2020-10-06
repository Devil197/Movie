import * as React from 'react';
import 'react-native-gesture-handler';
import {ROUTE_KEY} from './constants/constants';
import {createStackNavigator} from '@react-navigation/stack';
import {Login, Details,Splash} from './components/screens';
import {NavigationContainer} from '@react-navigation/native';
import BottomNavigation from './BottomNavigation';
const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName={ROUTE_KEY.BottomNavigation}>
      <Stack.Screen
        name={ROUTE_KEY.BottomNavigation}
        component={BottomNavigation}
      />
      <Stack.Screen name={ROUTE_KEY.Login} component={Login} />
      <Stack.Screen name={ROUTE_KEY.Details} component={Details} />
      <Stack.Screen name={ROUTE_KEY.Splash} component={Splash} />
    </Stack.Navigator>
  );
}
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}