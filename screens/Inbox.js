import React from 'react'
import { StyleSheet, TouchableOpacity, View, SafeAreaView, Image, ScrollView, Text} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc'
import {Icon} from 'react-native-elements'
import userData from '../components/message/data/userData'

export default function InboxScreen(){
    const navigation = useNavigation()

    const handleHomeButtonClick = () => {
        console.log("handleHomeButtonClick Triggered")
        navigation.push('Swipe')
    }

    const handleMessagesClick = () => {
        console.log("handleMessagesClick Triggered")
        navigation.push('Messages')
    }
    return (
        <SafeAreaView>
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
                        source={require("../components/img/message.png")}
                    />
                </TouchableOpacity>
                
            </View>

            <ScrollView style={[{
                }]}>
                {userData.map((userData, i) => (
                    <TouchableOpacity
                        key={i}
                        onPress={handleMessagesClick}
                        style={[tw`flex-row `, 
                            // styles.icon
                        ]}
                    >   
                        <Image 
                            style={[tw`h-20 w-20 rounded-full`,
                                styles.icon
                            ]}
                            src={userData.icon}
                        />
                        <View>

                        <Text 
                            style={[tw`text-2xl font-bold`,
                                styles.name
                            ]}
                            >
                        {userData.name} 
                        </Text>
                        <Text 
                            style={[tw``,
                            styles.lastText]}
                        >{userData.lastText}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
                                     
            </ScrollView>
        </SafeAreaView>
  
    )
}

    const styles = StyleSheet.create({
        icon: {
            // paddingTop: 100,
            // paddingLeft: 10,
            // paddingRight: 19,
            // paddingBottom: 5,
            marginTop: 10,
            marginBottom: 10,
            marginLeft: 15,
            marginRight: 15
        },
        name: {
            marginTop: 5
        },
        lastText: {
            marginTop: 5
        },
    })