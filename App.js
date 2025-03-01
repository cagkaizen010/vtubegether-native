// import * as React from 'react';
import React, {useState, useEffect, useLayoutEffect} from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SwipeScreen from './screens/SwipeScreen.js';
import SignupScreen from './screens/SignupScreen.js';
import MessagesScreen from "./screens/MessagesScreen.js";
import SignUpAliasAddScreen from './screens/SignUpAliasAddScreen';
import SignUpImageAddScreen from './screens/SignUpImageAddScreen.js';
import SignUpConfirmScreen from "./screens/SignUpConfirmScreen.js";
import InboxScreen from "./screens/Inbox.js"
import LoginScreen, {authSuccess, globalAccessToken}  from './screens/LoginScreen.js'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store'

// import { getSession, clearMatchData} from "../testTools/testTools"
import { getSession, clearMatchData } from './components/testTools/testTools.js';
import { loadUserData, data} from './components/user/userData.js';
import { useNavigation} from '@react-navigation/native'
import { supabase } from './lib/helper/supabaseClient'

const Stack = createNativeStackNavigator();

const App = () => {
  const [initialRoute, setInitialRoute] = useState(null)


  useEffect(() => {
    console.log("App.js useEffect()")
    // Persisting login for user
    const checkSession = async () => {
      console.log("Checking session")
      const userToken = await AsyncStorage.getItem('userToken');
      setInitialRoute(userToken ? 'Swipe' : 'Login')
    }
    
    checkSession()
    .then((res) => loadUserData())
    .catch((error) => {console.log(error)})
    
    console.log("data: " + JSON.stringify(data))


  }, [initialRoute])


  if ((initialRoute === null) ){
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>  

    )
  }

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute} screenOptions={{headerShown: false, gestureEnabled: false}}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />
                <Stack.Screen name="SignUpAliasAdd" component={SignUpAliasAddScreen}/>
                <Stack.Screen name="SignUpImageAdd" component={SignUpImageAddScreen}/>
                <Stack.Screen name="Messages" component={MessagesScreen} />
                <Stack.Screen name="Inbox" component={InboxScreen} />
                <Stack.Screen name="SignUpConfirm" component={SignUpConfirmScreen} />
              
                <Stack.Screen name="Swipe" component={SwipeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;