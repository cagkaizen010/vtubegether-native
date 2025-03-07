import React, {useState} from 'react'
import Animated, {FadeIn, FadeInUp, FadeInDown, FadeOut} from 'react-native-reanimated'
import { Image, Modal, SafeAreaView, Text, StatusBar, View, StyleSheet, TouchableOpacity } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native';
import {Icon} from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker'
import tw from 'twrnc'
// import FileUploadModal from '../components/fileUpload/fileUpload'
import Avatar from '../components/Avatar';

import {email, password } from './SignupScreen';
import {alias} from "./SignUpAliasAddScreen";
import { supabase } from '../lib/helper/supabaseClient';
// import {}

export default function SignUpImageAddScreen({route}) {
    
    const navigation = useNavigation();
    // const [modalVisible, setModalVisible] = useState(false)
    const [image, setImage] = useState()

    const onGalleryButtonPress = async () => {
      try  {
        console.log("in onGalleryButtonPress")
        await ImagePicker.
        requestMediaLibraryPermissionsAsync();
          console.log("onGalleryButtonPress pressed")
        console.log("Gallery Access Granted")

        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.
          Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1, 
        });

        uri = result

        if (!result.canceled) {
          await saveImage(result.assets[0].uri)
        }
      }
      catch (err) {
        console.log("Error uploading image: " + err.message);
      }
    }
  
    const saveImage = async (image) => {
      try {
        console.log("Image data: " + image);
        setImage(image);
      }
      catch (error) {
        throw error;
      }
    }


    // console.log("email inside SignUpImageAddScreen: " + email)
    const createProfile = async () => {
        

              const {data, error} = await supabase.auth.updateUser({
            data: {image: image}
        })
        if (error) {
            console.log(error)
            throw error;
        }


      

        // console.log(JSON.stringify(data,null,1))
        // outputData(
        //     JSON.stringify(data.session.user.user_metadata.email),
        //     JSON.stringify(data.session.user.user_metadata.alias),
        //     JSON.stringify(data.session.user.user_metadata.image),
        // )
        navigation.push("SignUpConfirm")
    } 

    const outputData = async (email, alias, url) => {
        console.log("-----------------------")
        console.log( email)
        console.log( alias)
        console.log(url)
    }

    
    return(
        <View>
            <View className='bg-rose-700 h-full w-full'>
                <StatusBar style="light"/>
                <Image className='h-full w-full absolute' source={require('../assets/images/background.png')}/>
                <View className="h-full w-full flex justify-around pt-40 pb-10">
                    {/* Heading */}
                    <View className="flex items-center">
                        <Animated.Text entering={FadeInUp.duration(1000).springify()} className="text-orange-100 font-bold tracking-wider text-5xl">
                        Upload some pictures! 
                        </Animated.Text>
                    </View>

                    <View className="flex flex-wrap flex-row grid-cols-2">
                        <Avatar 
                        image={image}
                        onPress={() => onGalleryButtonPress} 
                        />


                        <View style= {styles.submitButton}>
                            <TouchableOpacity
                                // onPress={() => {console.log("Images Submitted")}}
                                onPress={createProfile}
                            >
                                <Text style={styles.submitText}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                       
                </View>
                
            
            </View>
            

        </View>
    )
}

const styles = StyleSheet.create({
    submitButton: {
        backgroundColor: "#fff",
        padding: 10,
        margin:100,
        marginLeft:125,
        marginRight:125,
    },
    submitText: {
        textAlign:'center',
        fontWeight: "bold",

    }
});


