import React, {useState, useRef} from 'react';
import {SafeAreaView, Image, Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { StatusBar, } from 'react-native-web';
import LoginScreen from './SignupScreen';
import { useNavigation } from '@react-navigation/native';
import Swiper from "react-native-deck-swiper"
import {Entypo, Ionicons} from "@expo/vector-icons"
import { supabase } from '../lib/helper/supabaseClient'
import { authSuccess } from './LoginScreen';

const person = [
  {
    name: "Yanapii",
    // cellName: 'Yanapii',
    age: 30,
    desc: "Green cozy cat looking to make friends.",
    pic: [
      "https://pbs.twimg.com/media/FYb32DnaAAA3mq5?format=jpg&name=900x900",
      "https://i.ytimg.com/vi/aZCkIDgG8Ek/oar2.jpg?sqp=-oaymwEYCJUDENAFSFqQAgHyq4qpAwcIARUAAIhC&rs=AOn4CLCoe4GwJzzpn3pbQgY1gZsZkRVmmw",
      "https://i.ytimg.com/vi/H1Hphla0MMA/oar2.jpg?sqp=-oaymwEYCJUDENAFSFqQAgHyq4qpAwcIARUAAIhC&rs=AOn4CLAGbp7vrNBvyLvWOBHRmCABVOC4ig"
    ],
    id :1,
  },
  {
    name: "Yuandere",
    age:28,
    desc: "Go fuck yourself",
    pic: ["https://cdna.artstation.com/p/assets/images/images/043/718/548/smaller_square/yuandere-werewolf-jpg.jpg?1638094099"],
    id: 2,
  },
  {
    name: "Harry",
    age: 24,
    desc: "God why",
    pic: ["https://media.discordapp.net/attachments/946532387947429909/1178768514601984092/image.png"],
    id: 3,
  },
  {
    name: "Joe Gao",
    age: 24,
    desc: "Fuck you Kaizen",
    pic :["https://cdn.discordapp.com/attachments/946532387947429909/1178786232424206477/Layer_3.png"],
    id: 4,
  }
];


const performSignOut = async () => {
  console.log("performSignOut Triggered")
  const {error} = await supabase.auth.signOut();
  if(error) throw error
  console.log("Sign Out Successful")
}

export default function SwipeScreen() {
  const navigation=useNavigation();
  const swipeRef = useRef()

  const handleSignOutClick = () => {
    console.log("handleSignOutClick Triggered")
    performSignOut().then(() =>navigation.push('Login'))
  }

  const handleInboxClick= () => {
    console.log("handleInboxClick Triggered");
    navigation.push('Inbox');
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
              cards={person}
              stackSize={5}
              cardIndex={0}
              animateCardOpacity
              verticalSwipe={false}
              onSwipedLeft={(cardIndex)=>{
                console.log("Swipe Pass");
              }}
              onSwipedRight={(CardIndex)=>{
                console.log("Swipe Match");
              }}
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
                      source = {{uri: card.pic[0]}}
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