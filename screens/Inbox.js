import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View, SafeAreaView, Image, ScrollView, Text} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import tw from 'twrnc'
import {Icon} from 'react-native-elements'
import { supabase } from '../lib/helper/supabaseClient';
// import userData from '../components/message/data/userData'

export default function InboxScreen(){

    // const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation()
    const [inboxData, onChangeInboxData] = useState();

    useEffect(() => {
        const getAllInformation = async () => {
            // setIsLoading(true)
            getCurrentSession()
            .then((result) => getInbox(result))
            .then((data) => uploadInboxData(data))
            .catch((error) => {console.log(error)})
            // setIsLoading(false)
        }
        getAllInformation()
        
    }, [])


    const getCurrentSession= async () => {
        console.log("Getting Inbox")
        let tempID = "ee994e0e-9d51-4f93-9922-ffec5f0f8710"
        const {data: user, error} = await supabase.auth.getSession();
        if (error) {
            console.log(error)
            throw error
        }
        // console.log(JSON.stringify(user.session.user.id, null, 1))

        return user;
        
    }
    const getInbox = async (result) => {
        let matches = [] 

        let { data: messages, err} = await supabase
        .from('inboxes')
        .select('*')
        .eq('recipient', result.session.user.id)
        if (err) {
            console.log(err)
            throw err
        }

        messages.map((message, i) => {
            matches.push(
            {
                name: message.recipient,
                sender: message.sender,
                lastText: message.content,
                icon: "https://static-cdn.jtvnw.net/jtv_user_pictures/529bc177-642f-4315-96e8-390080ff664d-profile_image-300x300.jpeg",
            })
        })

        console.log("inboxes: " + JSON.stringify(matches[0]))
        return matches
    }

    const uploadInboxData = async (data) => {
        onChangeInboxData(data)
    }

    const handleHomeButtonClick = () => {
        console.log("handleHomeButtonClick Triggered")
        navigation.push('Swipe')
    }

    const handleMessagesClick = (userData) => {
        console.log("handleMessagesClick Triggered")
        // navigation.push('Messages')
        console.log(userData.name + userData.sender)
        navigation.navigate("Messages", {
            chatroom: userData.name+ userData.sender,
        })
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
                {inboxData ? inboxData.map((userData, i) => (
                    <TouchableOpacity
                        key={i}
                        onPress={() => handleMessagesClick(userData)}
                         

                        style={[tw`flex-row `, 
                            styles.icon
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
                )): 
                <SafeAreaView>
                    <Text>No messages found.</Text>
                </SafeAreaView>}
                                     
            </ScrollView>
        </SafeAreaView>
        )
    
    // </div>
    // )
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