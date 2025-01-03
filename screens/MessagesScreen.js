import React, { useEffect }from 'react';
import {SafeAreaView, Image, Text, View, StyleSheet, Button, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Chat from '../components/message/Chat';
import { Icon } from 'react-native-elements';
import tw from 'twrnc'
import Actions from '../components/message/Actions';
import { supabase } from '../lib/helper/supabaseClient';


export default function MessagesScreen({route}) {
    const {chatroom} = route.params
    const navigation = useNavigation();
    useEffect(() => {
        console.log(chatroom)
    })

    const channels = supabase.channel('randomChannel')
        .on(
            'postgres_changes',
            {event: 'INSERT'},
            (payload) => console.log(payload)
        )
        .subscribe((status) => {
            console.log("status: " + status) 
        })

    const handleHomeButtonClick = () => {
        console.log("handleHomeButtonClick Triggered")
        channels.unsubscribe('randomChannel')
        navigation.push('Inbox')
    }

    return (
        <SafeAreaView className="flex-1 mt-6">
            <View className="flex-row items-center justify-between px-5">
                <TouchableOpacity onPress={handleHomeButtonClick}>
                    <Icon 
                        iconStyle={tw`px-2 py-2`}
                        name='chevron-back-outline'
                        type="ionicon"
                        solid={true}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image 
                        className='h-8 w-64'

                        source={require('../components/img/logo.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image 
                        className="h-10 w-10"
                    />
                </TouchableOpacity>
                
            </View>
                <Chat 
                    chatroomID={chatroom}  
                />
                <Actions 
                    chatroomID={chatroom}
                />
        </SafeAreaView>
    )
}

