import * as React from 'react';
import 'react-native-gesture-handler';
import {ROUTE_KEY} from './constants/constants';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Login,
  Videos,
  Splash,
  Details,
  History,
  Search,
  Setting,
  Notification,
} from './components/screens';
import {NavigationContainer} from '@react-navigation/native';
import BottomNavigation from './BottomNavigation';
import Play from './components/views/Player';
const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator headerMode="none" initialRouteName={ROUTE_KEY.Splash}>
      <Stack.Screen
        name={ROUTE_KEY.BottomNavigation}
        component={BottomNavigation}
      />
      <Stack.Screen name={ROUTE_KEY.Login} component={Login} />
      <Stack.Screen name={ROUTE_KEY.Videos} component={Videos} />
      <Stack.Screen name={ROUTE_KEY.Splash} component={Splash} />
      <Stack.Screen name={ROUTE_KEY.Details} component={Details} />
      <Stack.Screen name={ROUTE_KEY.History} component={History} />
      <Stack.Screen name={ROUTE_KEY.Search} component={Search} />
      <Stack.Screen name={ROUTE_KEY.Setting} component={Setting} />
      <Stack.Screen name={ROUTE_KEY.Notification} component={Notification} />
      {/* <Stack.Screen name={'play'} component={Play} /> */}
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
