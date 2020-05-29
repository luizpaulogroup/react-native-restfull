import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import 'react-native-gesture-handler';

import Home from '../screens/Home';
import Details from '../screens/Details';

const Stack = createStackNavigator();

const Routes = () => (
    <>
        <StatusBar barStyle='light-content' />
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{
                        header: () => null,
                    }} />
                <Stack.Screen
                    name="Details"
                    component={Details}
                    options={{
                        // header: () => null,
                    }} />
            </Stack.Navigator>
        </NavigationContainer>
    </>
)

export default Routes;