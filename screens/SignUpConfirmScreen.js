import React, {useState,useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native'
import {View, Text, StatusBar, Image} from 'react-native'
import { supabase } from '../lib/helper/supabaseClient';
import { Button } from 'react-native-elements';

export default function SignUpConfirmScreen() {

    [imageURL, onChangeImageURL] = useState();
    useEffect(() => {
        // getImage();
        updateImageInstance();

        
    }, [])

    const getImage = async () => {
        const {data, error} = await supabase.auth.getSession()
        imageURl = JSON.stringify(data.session.user.user_metadata.image)
        console.log(imageURL)
    }

    const updateImageInstance = async () => {
        const {error} = await supabase
        .from('Profile')
        .update({image: "FUCK YOU"})
        .eq('id', 1)
        .select()
    }

    return (
        <View>
            <View className='bg-rose-700 h-full w-full'>
                <StatusBar style="light"/>
                <Image className='h-full w-full absolute' source={require('../assets/images/background.png')}/>
                <View className="h-full w-full flex justify-around pt-40 pb-10">
                    {/* Heading */}
                    <View className="flex items-center">
                        <Text className="text-orange-100 font-bold tracking-wider text-3xl">
                        Press confirm to begin swiping!
                        </Text>
                    </View>

                    <View className="bg-white h-3/4 rounded-xl relative"> 
                        <Image 
                            className="absolute top-0 h-full w-full rounded-xl"
                            source={{uri: imageURL}}
                        />
                    </View>
                    <View>
                        <Button onPress={() => {console.log("Button Pressed")}}></Button>
                    </View>
                </View>
            </View>

        </View>
    )
}