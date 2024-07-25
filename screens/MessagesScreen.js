import React from 'react';
import {SafeAreaView, Image, Text, View, StyleSheet, Button, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Chat from '../components/message/Chat';
import { Icon } from 'react-native-elements';
import tw from 'twrnc'
import Actions from '../components/message/Actions';



export default function MessagesScreen() {

const navigation = useNavigation();
const handleHomeButtonClick = () => {
    console.log("handleHomeButtonClick Triggered")
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
                <Chat />
                <Actions />
        </SafeAreaView>
    )
}

