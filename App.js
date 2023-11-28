import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SwipeScreen from './screens/SwipeScreen.js';
import SignupScreen from './screens/SignupScreen.js';
import LoginScreen from './screens/LoginScreen.js'

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen}/>
        <Stack.Screen name="Swipe" component={SwipeScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;