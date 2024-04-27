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
    const [modalVisible, setModalVisible] = React.useState(false)

    // const handleButtonPress= async () => {
    //     console.log("inside handleButtonPress")
    //     fileUploadModal()
    // }

    const handleButtonPress = () => {
        console.log(modalVisible)
        setModalVisible(() => !modalVisible)
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
                    <View className="flex items-center">
                        <Avatar onButtonPress={() =>setModalVisible(true)}/>
                    </View>
                    {/* Upload Buttons */}
                    {/* <View className='flex items-center mx-4 space-y-4'> */}
                        {/* <View className="bg-orange-100 p-5 rounded-2x1 w-full"> */}
                            {/* Opens modal panel */}
                            {/* <TouchableOpacity
                                onPress= {handleButtonPress}
                            >
                                <Icon
                                    iconStyle={tw`px-2 py-2`}
                                    name='camera-outline'
                                    type='ionicon'
                                    solid={true}
                                >

                                </Icon> 
                            </TouchableOpacity> */}
                            {/* <FileUploadModal onButtonPress={() => setModalVisible(true)} /> */}
                            
                        {/* </View> */}
                    {/* </View> */}
                </View>
                {/* <Modal isVisible={modalVisible}>
                    <SafeAreaView>
                        <Text>  Inside the Modal</Text>
                        <TouchableOpacity
                            onPress= {handleButtonPress}
                        >
                            <Icon
                                iconStyle={tw`px-2 py-2`}
                                name='camera-outline'
                                type='ionicon'
                                solid={true}
                            >
                                      </Icon> 
                        </TouchableOpacity>
                    </SafeAreaView>
                </Modal> */}
            </View>
            <FileUploadModal
                modalVisible={modalVisible}
                onBackPress={() => {
                    setModalVisible(false);
                }}
                onCameraPress={() => uploadImage()}

            
            />
        </View>
    )
}