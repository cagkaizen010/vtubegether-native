import React, {useState} from 'react'
import Animated, {FadeIn, FadeInUp, FadeInDown, FadeOut} from 'react-native-reanimated'
import * as ImagePicker from 'expo-image-picker'
import { Image, Modal, SafeAreaView, Text, StatusBar, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import {Icon} from 'react-native-elements'
import tw from 'twrnc'
import fileUploadModal from '../components/fileUpload/fileUpload'

export default function SignUpImageAddScreen() {
    const navigation = useNavigation();
    const [modal, setModalVisible] = useState(false)

    const handleButtonPress= async () => {
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

    return(
        <View>
            <View className='bg-rose-700 h-full w-full'>
                <StatusBar style="light"/>
                <Image className='h-full w-full absolute' source={require('../assets/images/background.png')}/>
                <View className="h-full w-full flex justify-around pt-40 pb-10">
                    {/* Heading */}
                    <View className="flex items-center">
                        <Animated.Text entering={FadeInUp.duration(1000).springify()} className="text-orange-100 font-bold tracking-wider text-5xl">
                        Suck my fucking cock
                        </Animated.Text>
                    </View>

                    {/* Upload Buttons */}
                    <View className='flex items-center mx-4 space-y-4'>
                        <View className="bg-orange-100 p-5 rounded-2x1 w-full">
                            <TouchableOpacity
                                onPress = {handleButtonPress}
                            >
                                <Image
                                    source={require('../components/img/logo.png') }
                                />

                                {/* <Icon
                                iconStyle={tw`px-2 py-2`}
                                name='chevron-back-outline'
                                type="ionicon"
                                solid={true}>
                                </Icon> */}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}