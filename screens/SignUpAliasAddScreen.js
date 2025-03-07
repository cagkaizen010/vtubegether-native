import React, {useState} from 'react';
import Animated, {FadeIn, FadeInUp, FadeInDown, FadeOut} from 'react-native-reanimated'
import {useNavigation, useRoute} from '@react-navigation/native'
import  {Text, TouchableOpacity, View, Image, SafeAreaView, KeyboardAvoidingView, TextInput, StatusBar } from 'react-native';
import {Icon} from 'react-native-elements'
import { supabase } from '../lib/helper/supabaseClient';
import tw from 'twrnc';
// import fileUploadModal from '../components/fileUpload/fileUpload'
import {email, password} from './SignupScreen'

export default function SignUpAliasAddScreen({route}) {
    const navigation = useNavigation();
    
    const email = route.params;
    [alias, onChangeAlias] = React.useState();

    const handleClickNext = () => {
        console.log("handleClickNext Triggered in SignUpAliasAddScreen()")


        const {data, error} = supabase.auth.updateUser({
            data: {alias: this.alias}
        })
        if (error){
            console.log(error)
            throw error;
        } 

        navigation.navigate('SignUpImageAdd',{
            email,
            alias,
        })
    }

  

    return (
        <KeyboardAvoidingView behavior='padding'>
            <View className='bg-rose-700 h-full w-full'>
                <StatusBar style="light"/>

                
                <Image className='h-full w-full absolute' source={require('../assets/images/background.png')}/>

                {/* Heading */}
                <View className="h-full w-full flex justify-around pt-40 pb-10">
                    <View className="flex items-center">
                        <Animated.Text entering={FadeInUp.duration(1000).springify()} className="text-orange-100 font-bold tracking-wider text-5xl">
                            Enter your Alias 
                        </Animated.Text>
                    </View>

                {/* Form */}
                    <View className='flex items-center mx-4 space-y-4'>
                        <View className="bg-orange-100 p-5 rounded-2x1 w-full">
                            <TextInput onChangeText={onChangeAlias} placeholder="Alias" placeholderTextColor={'gray'}/>
                        </View>
                        <View className='w-full'>
                            <TouchableOpacity
                                onPress={handleClickNext}
                                className='w-full bg-sky-400 p-3 rounded-2x1 mb-3'>
                                <Text className="text-x1 font-bold text-white text-center">Next</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>

    )
}