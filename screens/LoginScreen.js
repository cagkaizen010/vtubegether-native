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
                    <Animated.View entering={FadeInDown.duration(1000).springify()} className="bg-orange-100 p-5 rounded-2xl w-full">
                        <TextInput placeholder='Email' placeholderTextColor={'gray'}/>
                    </Animated.View>
                    <Animated.View entering={FadeInDown.duration(200).springify()} className="bg-orange-100 p-5 rounded-2xl w-full mb-3">
                        <TextInput placeholder='Password' placeholderTextColor={'gray'} />
                    </Animated.View>
                    <Animated.View entering={FadeInDown.duration(400).springify()} className='w-full'>
                        <TouchableOpacity
                            onPress={()=>navigation.push('Swipe')}
                            className="w-full bg-sky-400 p-3 rounded-2xl mb-3">
                                <Text className="text-xl font-bold text-white text-center">Login</Text>
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View entering={FadeInDown.duration(600).springify()} className='flex-row justify-center'>
                        <Text className='text-white'>Don't have an account?</Text>
                        <TouchableOpacity
                            onPress={()=>navigation.push('Signup')}>
                            <Text className='text-sky-600 font-bold'> Signup</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </View>
            {/*  */}
        </View>
    )
}