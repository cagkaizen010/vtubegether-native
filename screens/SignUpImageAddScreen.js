import React, {useState} from 'react'
import Animated, {FadeIn, FadeInUp, FadeInDown, FadeOut} from 'react-native-reanimated'
import { Image, Modal, SafeAreaView, Text, StatusBar, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import {Icon} from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker'
import tw from 'twrnc'
import FileUploadModal from '../components/fileUpload/fileUpload'
import Avatar from '../components/Avatar';

export default function SignUpImageAddScreen() {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false)

    // const handleButtonPress= async () => {
    //     console.log("inside handleButtonPress")
    //     fileUploadModal()
    // }

    const handleButtonPress = () => {
        console.log("modalVisible: " + modalVisible)
        setModalVisible(() => !modalVisible)
    }

    const onGalleryButtonPress = async () => {
        try  {
            console.log("onGalleryButtonPress pressed")
        }
        catch (err) {
            console.log(err)
        }
    }

    const onCameraButtonPress= async () => {
        try {

            await ImagePicker.
            requestCameraPermissionsAsync();
            console.log("Camera Access Granted?")
            let result = await ImagePicker.launchCameraAsync({
                    cameraType: ImagePicker.CameraType.front,
                    allowsEditing: true,
                    aspect: [1,1],
                    quality: 1,
                });
            
            if (!result.canceled) {
                // save image
                // paused @ 3:10
            }               

        } catch(err) {
            console.log(err)
        }
    }

    const saveImage = async (image) => {
        try {
            setImage(image);
            setModalVisible(false);
        }
        catch (error) {
            throw(error)
        }
    }

    const iterator = [
        [
            number= 1,
            text="penis",
            color='#bbf'
        ],
        [
            number= 2,
            text="ballsacks",
            color='#afb'
        ],
        [
            number= 3,
            text="meow",
            color='#eac'
        ],
        [
            number= 4,
            text="uhn",
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
                        {React.Children.toArray(
                        iterator.map((item )=> (
                                <Avatar id={item[0]} text={item[1]} color={item[2]} />      
                                
                            )))}
                    </View>
                </View>
                
            
            </View>
            

        </View>
    )
}


