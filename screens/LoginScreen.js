import React, {useEffect} from 'react'
import Animated, {FadeInUp, FadeInDown} from 'react-native-reanimated'
import {  KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import {View, Image, StatusBar, Text} from 'react-native'
import { supabase } from '../lib/helper/supabaseClient'
import { getUserID, clearMatchData } from '../components/testTools/testTools'
// import { getSession, clearMatchData} from "../testTools/testTools"
import * as QueryParams from "expo-auth-session/build/QueryParams"
import * as Linking from "expo-linking"
import { signInWithEmail } from '../components/user/authHandler'
import { useNavigation} from '@react-navigation/native'
import { loadUserData } from '../components/user/userData'


// const createSessionFromUrl = async (url) => {
//     const {params, errorCode} = QueryParams.getQueryParams(url);
//     if (errorCode) throw new Error(errorCode);

//     const {access_token, refresh_token} = params;
//     globalAccessToken = access_token;
//     if (!access_token) return;

//     const {data, error} = await supabase.auth.setSession({
//         access_token,
//         refresh_token
//     });
//     if (error) throw error;
//     console.log("data.session: " + data.session)
//     return data.session;

// }

export default function LoginScreen() {

    const navigation = useNavigation();
    // const url = Linking.useURL();
    // if (url) createSessionFromUrl(url); 

    [email, onChangeUsername] = React.useState();
    [password, onChangePassword] = React.useState();


    const subscription = supabase.auth.onAuthStateChange((event) => {


        if (event === 'SIGNED_IN') {
            // Clearing match data for matching algorithm debugging
            // getUserID()
            // .then((data) => clearMatchData(data))

            loadUserData()
            .then(() =>
            navigation.push('Swipe'))
        } 
    })


    useEffect(() => {

        // getSession();
    })

    const handleEmailLogIn = () => {
        signInWithEmail({
            email: email,
            password: password,
        })
    }

    return (
        <KeyboardAvoidingView behavior='padding'>
        <View className='bg-rose-700 h-full w-full'>
            <StatusBar style="light"/>
            <Image className='h-full w-full absolute' source={require('../assets/images/background.png')}/>

            {/* Title and Form */}
            <View className="h-full w-full flex justify-around pt-40 pb-10">
                {/* Title */}
                <View className="flex items-center">
                    <Animated.Text entering={FadeInUp.duration(1000).springify()}  className="text-orange-100 font-bold tracking-wider text-5xl">
                        VTubeGether
                    </Animated.Text>
                </View>

                {/* Form */}
                <View className='flex items-center mx-4 space-y-4'>
                    <Animated.View entering={FadeInDown.duration(1000).springify()} className="bg-orange-100 p-5 rounded-2xl w-full">
                        <TextInput onChangeText={onChangeUsername} placeholder={email} placeholderTextColor={'gray'}/>
                    </Animated.View>
                    <Animated.View entering={FadeInDown.duration(200).springify()} className="bg-orange-100 p-5 rounded-2xl w-full mb-3">
                        <TextInput secureTextEntry={true} onChangeText={onChangePassword} placeholder={password} placeholderTextColor={'gray'} />
                    </Animated.View>
                    <Animated.View entering={FadeInDown.duration(400).springify()} className='w-full'>
                        <TouchableOpacity
                            // onPress={()=>navigation.push('Swipe')}
                            onPress = {handleEmailLogIn}
                            className="w-full bg-sky-400 p-3 rounded-2xl mb-3">
                                <Text className="text-xl font-bold text-white text-center">Login</Text>
                        </TouchableOpacity>

                    </Animated.View>
                    <Animated.View entering={FadeInDown.duration(600).springify()} className='flex-row justify-center'>
                        <Text className='text-white'>Don't have an account?</Text>
                        <TouchableOpacity
                            onPress={()=>navigation.push('Signup')}>
                            <Text className='text-sky-600 font-bold' > Signup</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </View>
        </View></KeyboardAvoidingView>
    )
}