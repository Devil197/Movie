import * as React from 'react';
import 'react-native-gesture-handler';
import { ROUTE_KEY } from './constants/constants';
import { createStackNavigator, TransitionPresets, CardStyleInterpolators } from '@react-navigation/stack';
import {
  Login,
  Videos,
  Splash,
  Details,
  History,
  Search,
  Setting,
  Notification,
  Actor,
  ViewMore,
  Players,
} from './components/screens';
import {
  Home, Profile, Follow
} from './components/tabScreens'
import { NavigationContainer } from '@react-navigation/native';
import BottomNavigation from './BottomNavigation';
import Play from './components/views/Player';
const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName={ROUTE_KEY.Splash}
      screenOptions={{
        // gestureEnabled: true,
        // gestureDirection: 'vertical',
        //CardStyleInterpolators: CardStyleInterpolators.forHorizontalIOS
        ...TransitionPresets.FadeFromBottomAndroid
      }}
    >
      {/* <Stack.Screen
        name={ROUTE_KEY.BottomNavigation}
        component={BottomNavigation}
      /> */}
      <Stack.Screen name={ROUTE_KEY.Login} component={Login} />
      <Stack.Screen name={ROUTE_KEY.Videos} component={Videos} />
      <Stack.Screen name={ROUTE_KEY.Splash} component={Splash} />
      <Stack.Screen name={ROUTE_KEY.Details} component={Details} />
      <Stack.Screen name={ROUTE_KEY.History} component={History} />
      <Stack.Screen name={ROUTE_KEY.Search} component={Search} />
      <Stack.Screen name={ROUTE_KEY.Setting} component={Setting} />
      <Stack.Screen name={ROUTE_KEY.Notification} component={Notification} />
      <Stack.Screen name={ROUTE_KEY.Actor} component={Actor} />
      <Stack.Screen name={ROUTE_KEY.Players} component={Players} />
      <Stack.Screen name={ROUTE_KEY.Home} component={Home} />
      <Stack.Screen name={ROUTE_KEY.Profile} component={Profile} />
      <Stack.Screen name={ROUTE_KEY.Follow} component={Follow} />
      <Stack.Screen name={ROUTE_KEY.ViewMore} component={ViewMore} />
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
