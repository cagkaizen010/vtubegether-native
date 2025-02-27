import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View, SafeAreaView, Image, ScrollView, Text} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
import tw from 'twrnc'
import {Icon} from 'react-native-elements'
import { supabase } from '../lib/helper/supabaseClient'
import {getUserUID} from '../components/testTools/testTools'
// import userData from '../components/message/data/userData'

export default function InboxScreen(){

    // const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation()
    const [inboxData, onChangeInboxData] = useState();

    useEffect(() => {
        const getAllInformation = async () => {
            onChangeInboxData(null)

            getUserUID()
            .then((result) => getInbox(result))
            .then((data) => uploadInboxData(data))
            .catch((error) => {console.log(error)})
            // setIsLoading(false)
        }
        getAllInformation()
        
    }, [])


    // const getCurrentSession= async () => {
    //     console.log("Getting Inbox")
    //     const {data: user, error} = await supabase.auth.getSession();
    //     if (error) {
    //         console.log(error)
    //         throw error
    //     }
    //     // console.log(JSON.stringify(user.session.user.id, null, 1))

    //     return user;
        
    // }
    const getInbox = async (user_id) => {
        let chatChannels = [] 
        let usersID = null;
        let inbox_uuid = []


        let { data: inbox_uuid_array, err} = await supabase
        .from('inbox_participants')
        .select(`
            inbox_uid
            `)
        .eq("user_id", user_id)
        if (err) {
            console.log("INSIDE currentUser_inbox_uid retrieval: " + err)
            throw err
        }
        // console.log("inbox_uuid_array: " + inbox_uuid_array)

        inbox_uuid_array.map((inboxes, i) => {
            inbox_uuid.push(inboxes.inbox_uid) 
        })

        let {data: filtered_inbox_uid, erro} = await supabase
        .from('inbox_participants')
        .select(`
            inbox_uid,
            inbox (
                last_message
            ),
            users (
                alias,
                image 
            )
            `)
        .in('inbox_uid', inbox_uuid)
        .neq('user_id', user_id)
        if (erro) {
            console.log("INSIDE currentUser_inbox_uid retrieval: " + erro)
            throw erro
        }

        // console.log("currentUser: " + JSON.stringify(currentUser))
        // console.log("inbox_uuid_array: " + JSON.stringify(inbox_uuid_array))
        // console.log("---")
        // console.log(JSON.stringify(filtered_inbox_uid))

        filtered_inbox_uid.map((inbox_uid, i) => {
            chatChannels.push(
            {
                name: inbox_uid.users.alias,
                lastText: inbox_uid.inbox.last_message,
                icon: inbox_uid.users.image,
                inboxUID: inbox_uid.inbox_uid
            })

        })

        return chatChannels
    }

    const uploadInboxData = async (data) => {
        onChangeInboxData(data)
    }

    const handleHomeButtonClick = () => {
        console.log("handleHomeButtonClick Triggered")
        navigation.goBack()
        // navigation.push('Swipe')
    }

    const handleMessagesClick = (userData) => {
        console.log("handleMessagesClick Triggered")
        navigation.navigate('Messages', {
            inboxUID: userData.inboxUID
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