import React from 'react';
import { StatusBar, Text } from 'react-native';
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
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#F05'
                    },
                    headerTintColor: '#FFF',
                    headerTitleStyle: {
                        fontWeight: '700'
                    }
                }}>
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerTitle: () => null }} />
                <Stack.Screen
                    name="Details"
                    component={Details}
                    options={{
                        headerTitle: () => <Text style={{ color: '#FFF', fontWeight: '700' }}>DETALHES</Text>,
                    }} />
            </Stack.Navigator>
        </NavigationContainer>
    </>
)

export default Routes;