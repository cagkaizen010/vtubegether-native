import React, {useState} from 'react'
import Animated, {FadeIn, FadeInUp, FadeInDown, FadeOut} from 'react-native-reanimated'
import { Image, Modal, SafeAreaView, Text, StatusBar, View, StyleSheet, TouchableOpacity } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native';
import {Icon} from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker'
import tw from 'twrnc'
import FileUploadModal from '../components/fileUpload/fileUpload'
import Avatar from '../components/Avatar';

import {email, password } from './SignupScreen';
import {alias} from "./SignUpAliasAddScreen";
// import {}

export default function SignUpImageAddScreen({route}) {
    
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false)
    const {email, alias} = route.params;

        // Toggle modal visibility
    // const handleButtonPress = () => {
    //     console.log("modalVisible: " + modalVisible)
    //     setModalVisible(() => !modalVisible)
    // }

        // Toggle Camera Access
    // const onCameraButtonPress= async () => {
    //     try {

    //         await ImagePicker.
    //         requestCameraPermissionsAsync();
    //         console.log("Camera Access Granted?")
    //         let result = await ImagePicker.launchCameraAsync({
    //                 cameraType: ImagePicker.CameraType.front,
    //                 allowsEditing: true,
    //                 aspect: [1,1],
    //                 quality: 1,
    //             });
            
    //         if (!result.canceled) {
    //         }               

    //     } catch(err) {
    //         console.log(err)
    //     }
    // }


    // Sending image to be uploaded to database
    // Has to be here to upload to image array

    const sendToBackend = async () => {
        try {
            const formData = new FormData();
            
            formData.append("image", {
                uri: image,
                type: "image/png",
                name: "profile-image"
            })

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                transformRequest: () => {
                    return formData;
                },
            }

            await axios.post("https://you-api-endpoint", formData, config)

            alert("success");
        }
        catch (err) {
            console.log(err)
        }
    }

    // console.log("email inside SignUpImageAddScreen: " + email)
    console.log("email: " + JSON.stringify(email))
    console.log("alias: " + JSON.stringify(alias))
    const createProfile = () => {

        console.log(iterator[2], email, alias);
      
    } 

    const iterator = [
        [
            number= 1,
            image="",
            color='#bbf'
        ],
        [
            number= 2,
            image="",
            color='#afb'
        ],
        [
            number= 3,
            image="",
            color='#eac'
        ],
        [
            number= 4,
            image="",
            color='#ffb'
        ],
    ]
    
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
                        {React.Children.toArray(iterator.map((item )=> (
                            <Avatar 
                                id={item[0]} 
                                uri={item[1]} 
                                color={item[2]} 
                            />      
                        )))}
                    <View
                        style= {[styles.submitButton
                        ]}
                    >
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


