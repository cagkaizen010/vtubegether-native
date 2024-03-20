import React from 'react';
import {SafeAreaView, Image, Text, View, StyleSheet, Button, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import {Swipe} from './SwipeScreen'
import { useNavigation } from '@react-navigation/native';
import Chat from '../components/message/Chat';
import Actions from '../components/message/Actions';

export default function MessagesScreen() {
    const navigation = useNavigation();

    const handleHomeButtonClick = () => {
        console.log("handleHomeButtonClick Triggered")
        navigation.push('Swipe')
    }
    return (
        <SafeAreaView className="flex-1 mt-6">
            <View className="flex-row items-center justify-between px-5">
                <TouchableOpacity onPress={handleHomeButtonClick}>
                    <Image 
                        className="h-10 w-10"
                        source= {require("../components/img/home.png")}
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
                        source={require("../components/img/message.png")}
                    />
                </TouchableOpacity>
                
            </View>
                <Chat />
                <Actions />
        </SafeAreaView>
    )
}