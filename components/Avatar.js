import React, {useState} from 'react'
import {View, TouchableOpacity, StyleSheet} from 'react-native'
import tw from 'twrnc'
import {Icon} from 'react-native-elements'


export default function Avatar() {
    const onButtonPress = () => {
        console.log("onButtonPress in Avatar pressed")
    }
    return(
    <View>
        <TouchableOpacity style={styles.editButton} onPress={onButtonPress}>
            <Icon
                iconStyle={tw`px-2 py-2`}
                name='camera-outline'
                type='ionicon'
                solid={true}
            >
            </Icon>
           
        </TouchableOpacity>
    </View>
    )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    position: "relative"
  },
  image: {
    borderRadius: 75,
    width: 150,
    height: 150,
    // borderColor: colors.secondary,
    borderColor: "#f82",
    borderWidth: 5,
  },
  editButton: {
    // backgroundColor: colors.secondary,
    backgroundColor: "#f82",
    borderRadius: 24,
    padding: 8,
    position: "absolute",
    right: 5,
    bottom: 5
  },
});

// const colors = StyleSheet.create({
//     secondary: "#f82",
// });
