import React from 'react';
import { StatusBar, Text, View } from 'react-native';
import Music from './Music';
import Profile from './Profile';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Film from './Film';
 
const Tab = createMaterialTopTabNavigator();
function Action() {
    return (
        <View>
            <Text>
                Action
            </Text>

        </View>
    )
}
function Sci() {
    return (
        <View>
            <Text>
                Sci - fi
            </Text>

        </View>
    )
}

function MyTabs() {
    return (
        <Tab.Navigator
        
        >
            <Tab.Screen name="Film" component={Film} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}
const Category = ({
    params,
}) => (



        <MyTabs />


    );

export default Category;
