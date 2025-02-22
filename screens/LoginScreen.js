import React, {useEffect} from 'react'
import Animated, {FadeInUp, FadeInDown} from 'react-native-reanimated'
import {  KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import {View, Image, StatusBar, Text} from 'react-native'
import { useNavigation} from '@react-navigation/native'
import { supabase } from '../lib/helper/supabaseClient'
import { setItemAsync, getItemAsync } from 'expo-secure-store'
import { makeRedirectUri } from 'expo-auth-session'
import { getSession, clearMatchData } from '../components/testTools/testTools'
import * as QueryParams from "expo-auth-session/build/QueryParams"
import * as WebBrowser from "expo-web-browser"
import * as Linking from "expo-linking"



const createSessionFromUrl = async (url) => {
    const {params, errorCode} = QueryParams.getQueryParams(url);
    if (errorCode) throw new Error(errorCode);

    const {access_token, refresh_token} = params;
    globalAccessToken = access_token;
    if (!access_token) return;

    const {data, error} = await supabase.auth.setSession({
        access_token,
        refresh_token
    });
    if (error) throw error;
    return data.session;

}


const signInWithEmail = async (cred) => {


    const { data, error} = await supabase.auth.signInWithPassword({
        email: cred.email,
        password: cred.password,
    })
    if (error){
        console.log(error)
        throw error
    }

    try {
        await setItemAsync('userEmail', cred.email)

    }
    catch (error) {
        console.log("Error saving email to SecureStore", error)
    }
    // getSession();
}


// const performOAuthGoogle = async () => {
//     const {data, error} = await supabase.auth.signInWithOAuth({
//             provider: 'google',
//             options: {
//                 redirectTo,
//                 skipBrowserRedirect: true,
//             }
//     })

//     if (error) throw error;

//     const res = await WebBrowser.openAuthSessionAsync(
//         data?.url ?? "",
//         redirectTo
//     );

    
//     if (res.type === "success") {
//         const {url} = res;
//         await createSessionFromUrl(url);
//         console.log("Login Successful")
//     }
// };

// const performOAuthGithub = async () => {
//     const {data, error} = await supabase.auth.signInWithOAuth({
//             provider: 'github',
//             options: {
//                 redirectTo,
//                 skipBrowserRedirect: true,
//             }
//     })

//     if (error) throw error;

//     const res = await WebBrowser.openAuthSessionAsync(
//         data?.url ?? "",
//         redirectTo
//     );

    
//     if (res.type === "success") {
//         const {url} = res;
//         await createSessionFromUrl(url);
//         console.log("Login Successful")
//     }
// };




export default function LoginScreen() {

    const navigation = useNavigation();
    const url = Linking.useURL();
    if (url) createSessionFromUrl(url); 

    [email, onChangeUsername] = React.useState();
    [password, onChangePassword] = React.useState();

    useEffect(() => {
        const getEmailFromStore = async () => {
            try{
                const storedEmail = await getItemAsync('userEmail')
                if (storedEmail) {
                    onChangeUsername(storedEmail)

                } else {
                    console.log("Email not found in SecureStore")
                }

            } catch(error) {

            }
        }
        getEmailFromStore();
        // getSession();
    })

    const handleEmailLogIn = () => {
        // signInWithEmail().then(() => authSuccess == true ? navigation.push('Swipe') : console.log("Invalid Login Credentials."))
        signInWithEmail({
            email: email,
            password: password,
        })
        // console.log(password)
    }

    // const handleClickGoogle = () => {
    //     // performOAuthGoogle().then(() => authSuccess == true ? navigation.push('Swipe'): console.log("no pee pee found"))
    //     performOAuthGoogle();
    // }
    // const handleClickGithub = () => {
    //     // performOAuthGithub().then(() => authSuccess == true ? navigation.push('Swipe'): console.log("no pee pee found"))
    //     performOAuthGithub();
    // }

    const subscription = supabase.auth.onAuthStateChange((event, session) => {
        // console.log(event, session)

        if (event === 'INITIAL_SESSION') {
        // handle initial session
        } else if (event === 'SIGNED_IN') {
            // console.log("Inside SIGNED_IN");
            // console.log("flag: " + (JSON.stringify(session.user.user_metadata) && navigation.push('Swipe')) )

            getSession()
            .then((data) => clearMatchData(data))


            if (!JSON.stringify(session.user.user_metadata.image)){
                if(!JSON.stringify(session.user.user_metadata.alias))
                    navigation.push('SignUpAliasAdd')
                else navigation.push('SignUpImageAdd')
            }
            // else navigation.push('SignUpConfirm')
            else navigation.push('Swipe')

            // handle sign in event
        } else if (event === 'SIGNED_OUT') {
            console.log("Inside SIGNED_OUT");
            // handle sign out event
        } else if (event === 'PASSWORD_RECOVERY') {
            console.log("Inside PASSWORD_RECOVERY");
            // handle password recovery event
        } else if (event === 'TOKEN_REFRESHED') {
            console.log("Inside TOKEN_REFRESHED");
            // handle token refreshed event
        } else if (event === 'USER_UPDATED') {
            console.log("Inside USER_UPDATED");
        }
    })


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