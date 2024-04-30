import React, {useState} from 'react'
import {View, TouchableOpacity, StyleSheet} from 'react-native'
import tw from 'twrnc'
import {Icon} from 'react-native-elements'

import FileUploadModal from '../components/fileUpload/fileUpload'

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
  
  return(
  <View className="flex items-center">
    {/* {console.log("key: " + key)} */}
    {!aviOnly && (
      <TouchableOpacity 
        style={styles.editButton} 
        onPress={() => {
          setModalVisible(true)
        }}
      />
        
       
    
    )}
    <FileUploadModal
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
    />   
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
    padding: 20,
    height: 90,
    position: "absolute",
    right: 5,
    bottom: 5
  },
});

// const colors = StyleSheet.create({
//     secondary: "#f82",
// });
