import React, {useState} from "react"
import { KeyboardAvoidingView, SafeAreaView, StatusBar, View, Image, TextInput, Text } from "react-native"
import { useNavigation } from "@react-navigation/native"
import Avatar from "../components/Avatar"

export default function SignUpReworkScreen() {
    const navigation = useNavigation()
    const [email, onChangeEmail] = useState('')
    const [image, onImageChange] = useState()

    const onGalleryButtonPress= () => {
        return null
    }

    return (
        <KeyboardAvoidingView behavior='padding'>
            <View className='bg-rose-700 h-full w-full'>
                <StatusBar style='light'/>
                <Image className='h-full w-full absolute' source={require('../assets/images/background.png')}/>

                {/* Form */}
                <SafeAreaView className='flex items-center mx-4 space-y-4'>
                    {/* <View className='bg-orange-100 p-5 rounded-2x1 w-full'>
                        <Text>EMAIL: </Text>
                        <TextInput className='bg-orange-200' onChangeText={onChangeEmail} placeholder='Email' placeholderTextColor={'gray'}/>  
                    </View> */}

                    <Avatar 
                        image= {image}
                        onPress = {() => onGalleryButtonPress()}
                    />
                    
                </SafeAreaView>

            </View>
        </KeyboardAvoidingView>
    )
       
}
