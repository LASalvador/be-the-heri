
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Detail from './pages/details';
import Incident from './pages/incidents';

const Stack = createStackNavigator();


export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Incident">
                <Stack.Screen name="Incident" component={Incident} />
                <Stack.Screen name="Detail" component={Detail} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}