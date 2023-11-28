import { useNavigation} from '@react-navigation/native'
import Animated, {FadeIn, FadeInUp, FadeInDown, FadeOut} from 'react-native-reanimated'
import React from 'react'
import { TextInput, TouchableOpacity } from 'react-native'
import {View, Image, StatusBar, Text} from 'react-native'


export default function LoginScreen() {
    const navigation = useNavigation();
    return (
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
                    <View className="bg-orange-100 p-5 rounded-2x1 w-full">
                        <TextInput placeholder="Username" placeholderTextColor={'gray'} />
                    </View>
                    <View className="bg-orange-100 p-5 rounded-2x1 w-full">
                        <TextInput placeholder="Email" placeholderTextColor={'gray'} />
                    </View> 
                    <View className="bg-orange-100 p-5 rounded-2x1 w-full">
                        <TextInput placeholder="Password" placeholderTextColor={'gray'} secureTextEntry={'True'}/>
                    </View>
                    <View className='w-full'>
                        <TouchableOpacity 
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
            {/*  */}
        </View>
    )
}