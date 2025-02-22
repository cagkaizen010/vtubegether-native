import React, {useEffect, useRef} from 'react';
import {SafeAreaView, Image, Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Swiper from "react-native-deck-swiper"
import {Entypo, Ionicons} from "@expo/vector-icons"
import { supabase } from '../lib/helper/supabaseClient'




export default function SwipeScreen() {
  let cards = []
  let currentUser_uid = ""
  const navigation=useNavigation();
  const swipeRef = useRef()

  useEffect(() => {
    getCurrentUser()
      .then(() =>loadCardData())
      .catch((error) => {console.log(error)})
  }, [getCurrentUser, loadCardData])

  const getCurrentUser = async () => {
    const {data: user, error} = await supabase.auth.getSession();
    if (error) {
      console.log(error)
      throw error
    }
    
    // console.log("user: " + JSON.stringify(user.session.user.id))

    currentUser_uid = user.session.user.id
    // console.log("currentUser_uid: " + currentUser_uid)
  }

  const loadCardData = async () => {
    const {data: user, error} = await supabase
    .schema('public')
    .from('users')
    .select('*')
    if (error) console.log("Error in loadCardData()! + " + error)


    user.map((person, i) => {

      currentUser_uid == person.user_uid ?
      <></> :
      cards.push({
        name: person.alias,
        user_uid: person.user_uid,
        age: 24,
        desc: "Placeholder for now",
        pic: person.image,
        id: i,
      })
    })
  }


  // Store reject data to prevent rejected users from showing in Swipe feed.
  const handleSwipeLeft = async (cardIndex) => {

    const { error} = await supabase
      .schema('matches')
      .from('reject_uid')
      .insert({
        user_uid: currentUser_uid,
        reject: cards[cardIndex].user_uid
      })
    if (error) console.log("ERROR! " + JSON.stringify(error))
  }


  const handleSwipeRight = async (cardIndex) => {

    // console.log("User swiped right")
    // console.log(cards[cardIndex].user_uid)

    const {data: userCheck , error} = await supabase
      .schema('matches')
      .from('accept_uid')
      .select('*')
      .eq('user_uid', cards[cardIndex].user_uid)
      .eq('accept', currentUser_uid)
    if (error) console.log("ERROR! " + JSON.stringify(error))


    console.log("userCheck: " + JSON.stringify(userCheck))

    if (userCheck){
      createChat(cards[cardIndex].user_uid)
    }
    else {
      console.log("adding into accept_uid")
      const {err} = await supabase
        .schema('matches')
        .from('accept_uid')
        .insert({
          user_uid: currentUser_uid,
          accept: cards[cardIndex].user_uid
        })
      if (err) console.log(error)
    }
  }

  const createChat = async (card_uid) => {

    const {data: currentUser_id} = await supabase
      .schema('public')
      .from('users')
      .select('id')
      .eq('user_uid', currentUser_uid)

    const {data: cardUser_id} = await supabase
      .schema('public')
      .from('users')
      .select('id')
      .eq('user_uid', card_uid)

    console.log("currentUser_id: " + JSON.stringify(currentUser_id[0].id))
    console.log("cardUser_id: " + JSON.stringify(cardUser_id[0]))

    const {data, error} = await supabase
      .schema('public')
      .from('inbox')
      .insert([{
        last_sent_user_id: currentUser_id[0].id,
        last_message: "Say hello!"
      }])
      .select()
    if (error) console.log("ERROR! " + JSON.stringify(error))


    // console.log("ITS A MATCH")
  }

  const handleSignOutClick = () => {
    console.log("handleSignOutClick Triggered")
    performSignOut()
      .then(() =>navigation.push('Login'))
  }



  const performSignOut = async () => {
    console.log("performSignOut Triggered")
    const {error} = await supabase.auth.signOut();
    if(error) throw error
    console.log("Sign Out Successful")
  }

  const handleInboxClick= () => {
    console.log("handleInboxClick Triggered");
    navigation.push('Inbox');
  }


  const retrieveCardData = () => {
    return cards 
  }
  

  return (
  
    <SafeAreaView className="flex-1 mt-6">
      <View className="flex-row items-center justify-between px-5"> 
        <TouchableOpacity onPress = {handleSignOutClick}>
          <Image
            className="h-10 w-10 rounded-full"
            source={{
              uri: "https://img.freepik.com/free-icon/user_318-159711.jpg"
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            className="h-8 w-64"
            
            source={require("../components/img/logo.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleInboxClick}>
          <Image
            className="h-10 w-10"
            source={require("../components/img/message.png")}
          />
        </TouchableOpacity>
      </View>
      <View className="flex-1 -mt-6">
            <Swiper
              ref={swipeRef}
              containerStyle={{
                backgroundColor:"transparent",
              }}
              cards={ retrieveCardData()}
              stackSize={5}
              cardIndex={0}
              animateCardOpacity
              verticalSwipe={false}
              onSwipedLeft={(cardIndex)=>handleSwipeLeft(cardIndex)
              }
              onSwipedRight={(cardIndex)=>handleSwipeRight(cardIndex)
              }
              overlayLabels={{
                left:{
                  title:"NOPE",
                  style:{
                    label:{
                      textAlign:"right",
                      color:"red"
                    }
                  }
                }, 
                right:{
                  title:"MATCH",
                  style: {
                    label:{
                      color: "#4DED30"
                    }
                  }
                }
              }}
              renderCard={(card) =>{
                return card ? (
                  <View key={card.id} className="bg-white h-3/4 rounded-xl relative">
                    <Image 
                      className="absolute top-0 h-full w-full rounded-xl"
                      source = {{uri: card.pic}}
                    />
                    <View className="absolute bottom-0 bg-white w-full h-20 justify-between items-center flex-row px-6 py-2 rounded-b-xl shadow-xl">
                      <View>
                        <Text className="text-xl font-bold">{card.name}</Text>
                        <Text >{card.desc}</Text>
                      </View>

                      <Text className="text-2xl font-bold">{card.age}</Text>
                    </View>
                  </View>
                ) : (
                  <View 
                    className="relative bg-white h-3/4 rounded-xl justify-center items-center shadow-xl"
                  >
                    <Text className="font-bold pb-5">No more profiles</Text>
                    <Image 
                      className="h-20 w-20"
                      source={{
                        uri: "https://images.vexels.com/media/users/3/134491/isolated/preview/c4aed5e8b55387c429d1f9b36a9859b2-cry-emoji-emoticon.png"
                      }}
                    />
                  </View>
                )
              }}
            />
      </View>
      <View className="flex flex-row justify-evenly">
          <TouchableOpacity
            onPress={() => swipeRef.current.swipeLeft()}
            className="items-center justify-center rounded-full w-16 h-16 bg-red-200"
          >
            <Entypo name="cross" size={24} color="red"/>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => swipeRef.current.swipeRight()}
            className="items-center justify-center rounded-full w-16 h-16 bg-green-200"
          >
            <Entypo name="heart" size={24} color="green"/>
          </TouchableOpacity>

      </View>
    </SafeAreaView>
  )
}