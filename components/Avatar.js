import React, {useState} from 'react'
import {Text, View, TouchableOpacity, StyleSheet, ImageBackground} from 'react-native'
import tw from 'twrnc'
import {Icon} from 'react-native-elements'
// import FileUploadModal from '../components/fileUpload/fileUpload'
import * as ImagePicker from "expo-image-picker"

const Avatar = ({
  id,
  uri,
  style ,
  imgStyle,
  onPress,
  image,
  aviOnly=false,
  ...props
}) => {

  const [modalVisible, setModalVisible] = useState(false);
  

  return(
  <View>
    {!aviOnly && (
      <TouchableOpacity 
        style={[!image && styles.editButton, 
          "flex-1 items-center"]} 
        onPress={onPress()}

      >

        {image && <ImageBackground
          source={{
            uri: image
            }}
          style={[styles.editButton,
            "flex-1 items-center"]}
          >
        </ImageBackground>}
      </TouchableOpacity>
        
       
    )}

  </View>
  // ,
  // image
  )
}

export default Avatar;
// export image;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    position: "relative"
  },
  image: {
    borderColor: "#f82",
    borderRadius: 500,
    width: 150,
    height: 150,
    borderWidth: 5,
  },
  editButton: {
    
    backgroundColor: "#aef",
    padding: 5,
    margin: 10,
    height: 150,
    width: 150, 
     
  },
});

    