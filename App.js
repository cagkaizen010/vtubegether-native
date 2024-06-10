import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SwipeScreen from './screens/SwipeScreen.js';
import SignupScreen from './screens/SignupScreen.js';
import MessagesScreen from "./screens/MessagesScreen.js";
import SignUpAliasAddScreen from './screens/SignUpAliasAddScreen';
import SignUpImageAddScreen from './screens/SignUpImageAddScreen.js';
import InboxScreen from "./screens/Inbox.js"
import LoginScreen, {authSuccess, globalAccessToken}  from './screens/LoginScreen.js'
import * as SecureStore from 'expo-secure-store'

import { supabase } from './lib/helper/supabaseClient'

const Stack = createNativeStackNavigator();

function App({navigation}) {

  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false, gestureEnabled: false}}>
              {(authSuccess != true) &&
              <>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />
                <Stack.Screen name="SignUpAliasAdd" component={SignUpAliasAddScreen}/>
                <Stack.Screen name="SignUpImageAdd" component={SignUpImageAddScreen}/>
                <Stack.Screen name="Messages" component={MessagesScreen} />
                <Stack.Screen name="Inbox" component={InboxScreen} />
              </> 
              }
              
              <Stack.Screen name="Swipe" component={SwipeScreen} options={{gestureDirection: 'horizontal-inverted'}}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;