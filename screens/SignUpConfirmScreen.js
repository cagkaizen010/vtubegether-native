import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native'

import {View, Text, StatusBar, Image} from 'react-native'
import { supabase } from '../lib/helper/supabaseClient';

export default function SignUpConfirmScreen() {

    let imageURL = "";

        const {data, error} = supabase.auth.getSession()
        imageURL = JSON.stringify(data)
        console.log(imageURL)
    
    const getImage = async () => {
        const {data, error} = supabase.auth.getSession()
        imageURL = JSON.stringify(data)
        console.log(imageURL)
    }


    return (
        <View>
            <View className='bg-rose-700 h-full w-full'>
                <StatusBar style="light"/>
                <Image className='h-full w-full absolute' source={require('../assets/images/background.png')}/>
                <View className="h-full w-full flex justify-around pt-40 pb-10">
                    {/* Heading */}
                    <View className="flex items-center">
                        <Text className="text-orange-100 font-bold tracking-wider text-5xl">
                        Press confirm to begin swiping!
                        </Text>
                    </View>

                    <View className="bg-white h-3/4 rounded-xl relative"> 
                        <Image 
                            className="absolute top-0 h-full w-full rounded-xl"
                            source={() => getImage}
                        />
                    </View>
                </View>
            </View>

        </View>
    )
}