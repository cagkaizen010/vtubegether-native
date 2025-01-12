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
      console.log("currentUser detected, skipping card publish") :
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

  const handleSwipeLeft = async (cardIndex) => {

    let {data: userCheck, error} = await supabase
    .schema('matches')
    .from('users')
    .select("*")
    .eq(`user_uid`, currentUser_uid)
    if (error) {
      console.log(error)
      throw error
    }

    if (userCheck) {
      const {data, err} = await supabase
      .schema('matches')
      .from('users')
      .update({user_uid, currentUser_uid})
      .eq('accept_uids', '')
      .select() 
    
    } 
    else console.log('user_uid not found' )
    
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
    // console.log("inside retrieveCardData")
  
    return cards 
  }
  

  const handleSwipeRight = (cardIndex) => {
    console.log("Swipe Match")
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