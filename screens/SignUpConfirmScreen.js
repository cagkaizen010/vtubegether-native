import React, {useState,useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native'
import {View, Text, StatusBar, Image} from 'react-native'
import { supabase } from '../lib/helper/supabaseClient';
import { Button } from 'react-native-elements';

export default function SignUpConfirmScreen() {
    useEffect(() => {
        // getImage();
        console.log("BEFORE UPDATE! metadata.alias: " + alias);
        console.log("BEFORE UPDATE! metadata.email: " + email);
        console.log("BEFORE UPDATE! metadata.image: " + imageURL);
        onAuthStateChange();
        outputUpdatedValues();
    }, [])
    const [alias, onChangeAlias] = useState(null)
    const [email, onChangeEmail] = useState(null)
    // const [imageURL, onChangeImageURL] = useState(null);
      
    const [imageURL, onChangeImageURL] = useState(null);

    

    const getImage = async () => {
        const {data, error} = await supabase.auth.getSession()
        imageURL = JSON.stringify(data.session.user.user_metadata.image)
        console.log(imageURL)
    }

    const outputUpdatedValues = async() => {
        // console.log("AFTER UPDATE! metadata.alias: " + alias);
        // console.log("AFTER UPDATE! metadata.email: " + email);
        // console.log("AFTER UPDATE! metadata.image: " + imageURL);
    }

    const onAuthStateChange = async () => {
        try {
            const {data, error} = await supabase.auth.getSession()
            if (error) {
                console.log(error);
                throw error
            }
            try {

                onChangeEmail(data.session.user.user_metadata.email)
                onChangeImageURL( data.session.user.user_metadata.image)
                onChangeAlias(data.session.user.user_metadata.alias)
            }
            catch {
                console.log(error)
            } finally {
               const {data: Profile } = await supabase
               .from('Profile')
               .insert([
                   {
                       alias: alias,
                       email: email,
                       image: imageURL
                   }
               ])
 
            }
            console.log("AuthStateChange Successful")

    
        } catch (error){
            console.log(error);
        }
        
    }


    // const updateData = async () => {

    //     onChangeMetadata({
    //         createdAt: data.session.user.email_change_sent_at,
    //         alias: data.session.user.user_metadata.alias,
    //         email: data.session.user.user_metadata.email,
    //         image: data.session.user.user_metadata.image
    //     })
    //     console.log(metadata);
    // }

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

                        {/* <View className="flex-1 -mt-6"> */}
                        <View className="bg-white h-3/4 rounded-xl relative"> 
                            <Image 
                                className="absolute top-0 h-full w-full rounded-xl"
                                source = {{uri: imageURL }}
                            />
                            <View className="absolute bottom-0 bg-white w-full h-20 justify-between items-center flex-row px-6 py-2 rounded-b-xl shadow-xl">
                                <View >
                                    <Text className="text-xl font-bold">{alias}</Text>
                                    <Text>Placeholder for text</Text>
                                </View>

                            </View>
                        </View>
                        <View>
                            <Button onPress={() => updateData}></Button>
                        </View>
                    </View>
                {/* </View> */}

            </View>
        </View>
    )
}