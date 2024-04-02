import React from 'react'
import  {Icon, TouchableOpacity, View, Image } from 'react-native'
import tw from 'twrnc'

export default function SignUpImageAddScreen() {
    return (
        <View>
            <TouchableOpacity >
                    <Icon 
                        iconStyle={tw`px-2 py-2`}
                        name='chevron-back-outline'
                        type="ionicon"
                        solid={true}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image 
                        className='h-8 w-64'

                        source={require('../components/img/logo.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image 
                        className="h-10 w-10"
                    />
            </TouchableOpacity>
        </View>

    )
}