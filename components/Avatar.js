import React, {useState} from 'react'
import {View, TouchableOpacity, StyleSheet} from 'react-native'
import tw from 'twrnc'
import {Icon} from 'react-native-elements'
import FileUploadModal from '../components/fileUpload/fileUpload'
import * as ImagePicker from "expo-image-picker"

const Avatar = ({
  id,
  uri,
  style,
  imgStyle,
  onPress,
  aviOnly=false,
  ...props
}) => {

  const [modalVisible, setModalVisible] = useState(false);
  
  const onGalleryButtonPress = async () => {
      try  {
          console.log("onGalleryButtonPress pressed")
      }
      catch (err) {
          console.log(err)
      }
  }

  return(
  // <View className="flex items-center">
  <View>
    {/* {console.log("key: " + key)} */}
    {!aviOnly && (
      <TouchableOpacity 
        style={[styles.editButton, 
          "flex-1 items-center"]} 
        // onPress={() => {
        //   setModalVisible(true)
        // }}
        onPress={() => console.log(props.text)}
      />
        
       
    
    )}

  </View>
  )
}

export default Avatar

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
    backgroundColor: "#fff",
    // borderRadius: 24,
    padding: 5,
    margin: 10,
    height: 150,
    width: 85, 
    // position: "absolute",
    // right: 5,
    // bottom: 100 
  },
});

    {/* <FileUploadModal
      id={id}
      modalVisible={modalVisible}
      onBackPress={() => {
          setModalVisible(false);
      }}
      onRemovePress={() => {
          setModalVisible(false);
      }}
      onGalleryPress={() => {
          () => onGalleryButtonPress()
      }}
      onCameraPress={() => onCameraButtonPress()}
      tecks={props.text}
      color={props.color}
    />    */}