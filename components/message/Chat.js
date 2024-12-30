import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import React, {useLayoutEffect, useEffect, useState} from 'react';
import tw from 'twrnc';
import chatMessage from './data/chatData';
import { supabase } from '../../lib/helper/supabaseClient';

const Chat = (props) => {
    const [chatData, onChangeChatData] = useState()
    var DMinstance = props.chatroomID;

    useEffect(() => {
        getChats()
            .then((result) => uploadChats(result) )
            // .then(() => displayChats())
            .catch((error) => {console.log(error)})
    }, [ getChats, uploadChats, displayChats, ])
    
    supabase
        .channel(DMinstance)
        .on('postgres_changes', {event:'INSERT', schema: 'public', table: "inboxes"}, 
            handleInserts
        ).subscribe()


    // Upload chats
    const handleInserts = (payload) => {
        // console.log('Change received!', payload)
        getChats()
            .then((result) => uploadChats(result) )
            // .then(() => displayChats())
            .catch((error) => {console.log(error)})
    }

    const uploadChats = async (result) => {
        onChangeChatData(result)
    }

    const getChats = async () => {
        let dataArray = []

        // console.log("Getting Chats")
        let {data , error} = await supabase
            .from("inboxes")
            .select('*')
        if (error) {console.log("error: " + JSON.stringify(error))}

            
        const {data: {user}} = await supabase.auth.getUser()

        data.map(
            (chat, i) => {

            dataArray.push( 
            {
                id: i,
                time: chat.created_at,
                text: chat.content,
                // owner: chat.isSender,
                owner: user.id == chat.recipient, 
                image: null,
            })

        })
        // console.log(JSON.stringify(dataArray))
        return dataArray
    }


    const displayChats = async () => {
        // console.log("chatData: " + JSON.stringify(chatData))
    }

    return (
        <ScrollView
        style = {[{
            flex:1,
            // marginBottom: 75,
        }]}
        scrollEnabled={true}>

        <View>
            { chatData ? chatData.map((chat, i) => (
                <View
                    key = {i}
                    style= {[{
                        backgroundColor: "#dbf8c7",
                        overflow: "hidden"
                    }, chat.owner ? styles.ownerView : styles.nonOwnerView]}>

                    {chat.image ? <Image 
                        style= {{
                            marginLeft: 10,
                            width: 150,
                            height: 160,
                            resizeMode: 'contain'
                        }}
                        source={require('../img/store.jpeg')}
                    /> : <></>}
                    <Text style={chat.owner ? styles.ownerText : styles.nonOwnerText}>{chat.text}</Text>
                    <View style={tw`flex flex-row mt-2 w-full justify-end`}>
                        <Text style={chat.owner ? styles.ownerTextTime: styles.nonOwnerTextTime}>{chat.time}</Text>
                        <Image 
                            style = {{width: 15, height: 15, marginLeft:4, resizeMode: 'contain'}}
                            source={require('../img/tick.png')}
                        />
                    </View>
                </View>
                )
             ) : <></>}
        </View>
        </ScrollView>
    )
}

export default Chat

const styles = StyleSheet.create({
    ownerText: {
        color:"#000",
        fontSize: 15,
    },
    ownerTextTime: {
        color:"#00000073",
        fontSize: 11,
    },
    ownerView: tw`flex flex-row flex-wrap p-2 w-1/2 rounded-xl ml-44 my-1`,
    nonOwnerText: {
        color:"#001",
        fontSize: 15,
    },
    nonOwnerTextTime: {
        color:"#00000073",
        fontSize: 11,
    },
    nonOwnerView: tw`flex flex-row flex-wrap p-2 w-1/2 rounded-xl m-2 my-1`
})