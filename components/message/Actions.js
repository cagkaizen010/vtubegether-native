import React, {Component, useState} from 'react'
import {TouchableOpacity, StyleSheet, TextInput, View, Keyboard, Text, Animated} from 'react-native'
import tw from 'twrnc'
import {Icon} from 'react-native-elements'
import { supabase } from '../../lib/helper/supabaseClient'
import {Chat} from "./Chat"

class Actions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inboxUID: props.inboxUID,
            loading: false,
            message: "",
            error: undefined
        }
        this.keyboardHeight = new Animated.Value(0);
    }

    componentDidMount () {
        this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
        this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
    }

    componentUnmount () {
        this.keyboardWillShowSub.remove();
        this.keyboardWillHideSub.remove();
    }

    keyboardWillShow = (event) => {
        Animated.timing(this.keyboardHeight, {
            duration: event.duration,
            toValue: event.endCoordinates.height -30,
            useNativeDriver: false 
        }).start();
    }


    keyboardWillHide = (event) => {
        Animated.timing(this.keyboardHeight, {
                duration: event.duration,
                toValue: 0,
                useNativeDriver: false 
            }).start();
    }

    
    render() {


 

    // Insert message into database
    sendMessage = async (chatroomID) => {
        try {
            // console.log("message? : " + this.state.message)
            this.state.loading = true
            let userID = "" 
            
    
            const {data: {user}} = await supabase.auth.getUser()
            // console.log("chatroomID inside Actions.js " + chatroomID) 

            // console.log("user.id: " + user.id)

            const {data: currentUser, e}  = await supabase
            .from('users')
            .select('id')
            .eq('user_uid', user.id )
            
            userID = currentUser[0].id

            // console.log("currentUser: " + userID)

            const {error} = await supabase
                .schema('public')
                .from('messages')
                .insert(
                    { user_id: userID, inbox_uid: chatroomID,  message: this.state.message },
                )
            if (error) console.log("ERROR! " + JSON.stringify(error))
            


        }
        catch (e) {
            console.log("ERROR! " + e)
        } finally {
            console.log("Message Sent")
            state.loading = false
        }
    }


        return(
            <Animated.View 
            style={[tw`flex flex-row justify-between items-center p-1 w-full bottom-1`,{
               paddingBottom: this.keyboardHeight 
             }]}>

            <View style={[tw`flex-1 flex-row bg-white rounded-full ml-2 justify-between`]}>

                <TextInput
                    style={styles.input}
                    value={this.state.message}
                    onChangeText={(message) => this.setState({message})}
                    ref={input => {this.textInput = input}}
                    placeholder="Type a message"
                    underlineColorAndroid="transparent"
                />
                
                <TouchableOpacity
                    onPress={() => sendMessage(this.props.inboxUID)}
                >

                    <Icon 
                        iconStyle={tw`-ml-2 rounded-full py-4 px-4 `}
                        name='send-outline'
                        type="ionicon"
                        solid={true}
                    />
               </TouchableOpacity>
            </View>
               
               
               
             </Animated.View>
        )
    }
}

export default Actions

const styles = StyleSheet.create({
    input: {
        width: 300,
        paddingTop: 5,
        paddingRight: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        // backgroundColor: '#fff',
        color:'#424242',
    },
});

