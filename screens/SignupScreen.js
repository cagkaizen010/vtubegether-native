import { useNavigation} from '@react-navigation/native'
import Animated, {FadeIn, FadeInUp, FadeInDown, FadeOut} from 'react-native-reanimated'
import React from 'react'
import { TextInput, KeyboardAvoidingView, TouchableOpacity, Icon, StyleSheet } from 'react-native'
import {View, Image, StatusBar, Text} from 'react-native'
import { supabase } from '../lib/helper/supabaseClient'
import { signUpNewUser } from '../components/signUp'
import tw from 'twrnc'

let email = ''
let username = ''
let password = ''



export default function SignupScreen() {
    const navigation = useNavigation();

    [username, onChangeUsername] = React.useState();
    [password, onChangePassword] = React.useState();
    [email, onChangeEmail] = React.useState();

    const handleClickSignUp = () => {
        console.log("handleClickSignUp triggered")
        navigation.push('SignUpImageAdd')
        // signUpNewUser({username, 
        //     password, 
        //     email
        // });
    }
    // module.exports = {username, password, email};
    return (
    <KeyboardAvoidingView  behavior='padding'>
        <View className='bg-rose-700 h-full w-full'>
            <StatusBar style="light"/>
            <Image className='h-full w-full absolute' source={require('../assets/images/background.png')}/>

            {/* Title and Form */}
            <View className="h-full w-full flex justify-around pt-40 pb-10">
                {/* Title */}
                <View className="flex items-center">
                    <Animated.Text entering={FadeInUp.duration(1000).springify()} className="text-orange-100 font-bold tracking-wider text-5xl">
                        VTubeGether
                    </Animated.Text>
                </View>

                {/* Form */}
                <View className='flex items-center mx-4 space-y-4'>
                    <View className="bg-orange-100 p-5 rounded-2x1 w-full">
                        <TextInput onChangeText = {onChangeUsername} placeholder="Username" placeholderTextColor={'gray'} />
                    </View>
                    <View className="bg-orange-100 p-5 rounded-2x1 w-full">
                        <TextInput onChangeText = {onChangeEmail} placeholder="Email" placeholderTextColor={'gray'} />
                    </View> 
                    <View className="bg-orange-100 p-5 rounded-2x1 w-full">
                        <TextInput onChangeText={onChangePassword} placeholder="Password" placeholderTextColor={'gray'} secureTextEntry={true}/>
                    </View>

                    <View className='w-full'>
                        <TouchableOpacity 
                            onPress={handleClickSignUp}
                            className='w-full bg-sky-400 p-3 rounded-2x1 mb-3'>
                            <Text className="text-x1 font-bold text-white text-center">Signup</Text>
                        </TouchableOpacity>
                    </View>
                    <View className='flex-row justify-center'>
                        <Text className='text-white'>Already have an account?</Text>
                        <TouchableOpacity
                            onPress={()=>navigation.push('Login')}>
                            <Text className='text-sky-600 font-bold'> Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
        </KeyboardAvoidingView>
    )
}


