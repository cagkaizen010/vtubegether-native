import React, {Component} from 'react'
import {TouchableOpacity, StyleSheet, TextInput, View, Keyboard, Text, Animated} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import tw from 'twrnc'
import {Icon} from 'react-native-elements'



class Actions extends Component {
    constructor(props) {
        super(props);

        this.keyboardHeight = new Animated.Value(0);
    }

    componentDidMount () {
        this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
        this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
    }

    componentUnmount () {
        this.keyboardWillShowSub.remove();
        this.keyboardWillHideSub.remove();
    }

    keyboardWillShow = (event) => {
        Animated.timing(this.keyboardHeight, {
            duration: event.duration,
            toValue: event.endCoordinates.height -30,
            useNativeDriver: false 
        }).start();
    }


    keyboardWillHide = (event) => {
        Animated.timing(this.keyboardHeight, {
                duration: event.duration,
                toValue: 0,
                useNativeDriver: false 
            }).start();
    }

    render() {
        return(
            <Animated.View 
            style={[tw`flex flex-row justify-between items-center p-1 w-full bottom-1`,{
               paddingBottom: this.keyboardHeight 
             }]}>

               <View style={[tw`flex-1 flex-row bg-white rounded-full ml-2 justify-between`]}>
               {/* <Icon 
                   style={tw`m-2 rounded-full p-2`}
                   name='smile'
                   type="feather"
               /> */}

                 <TextInput
                     style={styles.input}
                     placeholder="Type a message"
                     underlineColorAndroid="transparent"
                 />
                 {/* <Icon 
                   iconStyle={[tw` rounded-full  py-4`,{
                    transform: [
                      { rotate: '-40deg' },
                      { scale: 1.2 }
                    ] 
                   }]}
                   name='attach'
                   type="ionicon"
               /> */}
               <TouchableOpacity>

               <Icon 
                   iconStyle={tw`-ml-2 rounded-full py-4 px-4 `}
                   name='send-outline'
                   type="ionicon"
                   solid={true}
               />
               </TouchableOpacity>
             </View>
               
               
               {/* <Icon 
                   style={tw`mx-2 rounded-full  bg-green-700 p-4`}
                   name='mic'
                   color="white"
                   type="FontAwesome5"
               /> */}
             </Animated.View>
        )
    }
}

export default Actions

const styles = StyleSheet.create({
    input: {
        width: 300,
        paddingTop: 5,
        paddingRight: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        // backgroundColor: '#fff',
        color:'#424242',
    },
});

