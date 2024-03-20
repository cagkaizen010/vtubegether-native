import React from 'react'
import {Text, View, Image} from 'react-native'
import {Icon} from 'react-native-elements'
import tw from 'twrnc';

const Header = () => {
    return(
        <View style={[tw`flex flex-row items-center h-16 bg-green-900`, {
            position: 'fixed'
        }]}>

            <View style={[tw`flex flex-row justify-between items-center h-16 p-2 w-full bg-green-900`, {
                position: "absolute"
            }]}>
                <Icon 
                    style={tw`h-8 w-8`}
                    name='arrowleft'
                    color="white"
                    type="antdesign"
                />
                    <Image
                    style = {[tw`rounded-full -ml2`, {
                        width: 40,
                        height: 40,
                        resizeMode: 'contain'
                    }]}
                    source={require('../assets/avatar.png')}/>
            
                <Text numberOfLines={1} style={[tw`px-5 text-lg font-extrabold text-white w-2/5`, {
                }]}> Dear xd
                </Text>
                <Icon 
                    style={tw`mx-2`}
                    rotate="100"
                    name='videocam'
                    color="white"
                    solid={true}
                    type="ionicon"
                    />
                    <Icon 
                        style={tw`mx-2`}
                        name='phone'
                        color="white"
                        type="FontAwesome5"
                    />
                    <Icon
                        name='more-vertical'
                        color="white"
                        type="feather"
                    />
            </View>
        </View>
    )
}

export default Header