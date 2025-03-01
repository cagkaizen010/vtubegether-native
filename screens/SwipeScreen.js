import React, {useState, useEffect, useRef} from 'react';
import {SafeAreaView, Image, Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Swiper from "react-native-deck-swiper"
import {Entypo, Ionicons} from "@expo/vector-icons"
import { supabase } from '../lib/helper/supabaseClient'
import { getUserID ,getUserUID} from '../components/testTools/testTools';
import { signOut } from '../components/user/authHandler';
import { data } from '../components/user/userData';
import { loadUserData } from '../components/user/userData';

export default function SwipeScreen() {
  let [cards, setCards] = useState([])
  let [currentUser_uid, setUID] = useState()
  let [currentUser_id, setID] = useState()
  const navigation=useNavigation();
  const swipeRef = useRef()


  const loadCardData = async () => {
    // Load user's UID
    // console.log(data)
    // setUID(data.user_uid)
    
    // setID(data.user_id)

    console.log("inside loadCardData()")

    const {data: user, error} = await supabase
    .schema('public')
    .from('users')
    .select('*')
    if (error) console.log("Error in loadCardData()! + " + error)

    
      console.log("loaded users")
      console.log("data.user_uid: " + data.user_uid)

    user.map((person, i) => {

      (data.user_uid == person.user_uid)
      ? <></> : setCards(x=> [...x,{
        name: person.alias,
        user_uid: person.user_uid,
        age: 24,
        desc: "Placeholder for now",
        pic: person.image,
        id: i,
      }])
    
    })
  }

  useEffect(() => {
    console.log("SwipeScreen.js useEffect()")

    loadCardData()


  }, [])


  // Store reject data to prevent rejected users from showing in Swipe feed.
  const handleSwipeLeft = async (cardIndex) => {


    let card_uid = cards[cardIndex].user_uid

    const { error} = await supabase
      .schema('matches')
      .from('reject_uid')
      .insert({
        user_uid: data.user_uid,
        reject: card_uid
      })
    if (error) console.log("ERROR! " + JSON.stringify(error))
  }


  const handleSwipeRight = async (cardIndex) => {

    // console.log(console.log("Data inside handleSwipeRight(): " + JSON.stringify(data)))
    let card_uid = cards[cardIndex].user_uid
    let inbox_uid = ""

    // console.log("currentUser_uid: " + currentUser_uid)
    const {data: userCheck , error} = await supabase
      .schema('matches')
      .from('accept_uid')
      .select('*')
      .eq('user_uid', card_uid)
      .eq('accept', data.user_uid)
    if (error) console.log("Error inside userCheck! " + JSON.stringify(error))
    
      // console.log("userCheck: " + JSON.stringify(userCheck))

    if (userCheck){
      // console.log("UserID: " + getUserID().then((pay) => {console.log(pay)}))
      createChat({
        "card_uid": card_uid, 
        "data": data
      })
    }
    
    // console.log("adding into accept_uid")
    const {err} = await supabase
      .schema('matches')
      .from('accept_uid')
      .insert({
        user_uid: currentUser_uid,
        accept: card_uid
      })
    if (err) console.log(error)
    
  }

  const createChat = async (x) => {
    // console.log("creating chat")

    // console.log("x: " + JSON.stringify(x.data))
    const {data: cardUser_id, e} = await supabase
      .schema('public')
      .from('users')
      .select('id')
      .eq('user_uid', x.card_uid)
    if (e) console.log("Error in cardUser_id retrieval: ", error)

    // console.log("cardUser_id: " + JSON.stringify(cardUser_id[0]))
    // console.log("currentUser_id: " + JSON.stringify(x.data.user_uid))

    const {data:inbox_uid_res, error} = await supabase
      .schema('public')
      .from('inbox')
      .insert([{
        last_sent_user_id: x.data.user_id,
        last_message: "Say hello!"
      }])
      .select()
    if (error) console.log("ERROR in message insertion! " + JSON.stringify(error))

      inbox_uid = inbox_uid_res[0].inboxuid
      // console.log("inbox_uid: " + inbox_uid)

    let promises = 
    [
      x.data.user_id,
      cardUser_id[0].id
    ].map(async (id) => {
      const {data: res, error: err} = await supabase
        .schema('public')
        .from('inbox_participants')
        .insert([{
          inbox_uid: inbox_uid, 
          user_id: id
        }])
      if (error) console.log("Error inside inbox_participants insertion: " + error)
        // console.log("data insertion: " + JSON.stringify(res))
    })
    await Promise.all(promises)




    console.log("ITS A MATCH")
  }

  const handleSignOutClick = () => {
    console.log("handleSignOutClick Triggered")
    signOut()
      .then(() =>navigation.push('Login'))
  }



  // const performSignOut = async () => {
  //   console.log("performSignOut Triggered")
  //   const {error} = await supabase.auth.signOut();
  //   if(error) throw error
  //   console.log("Sign Out Successful")
  // }

  // const retrieveCardData = () => {
  //   return cards 
  // }
  

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
        <TouchableOpacity onPress={() => {navigation.push('Inbox')}}>
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
              // cards={ retrieveCardData()}
              cards = {cards ? cards : <></>}
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