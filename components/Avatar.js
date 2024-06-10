import React, {useState} from 'react'
import {Text, View, TouchableOpacity, StyleSheet, ImageBackground} from 'react-native'
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
  const [image, setImage] = useState();
  
  const onGalleryButtonPress = async () => {
      try  {
        await ImagePicker.
        requestMediaLibraryPermissionsAsync();
          console.log("onGalleryButtonPress pressed")
        console.log("Gallery Access Granted")

        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.
          Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1, 
        });

        if (!result.canceled) {
          await saveImage(result.assets[0].uri)
        }
      }
      catch (err) {
        alert ("Error uploading image: " + err.message);
      }
  }

  const saveImage = async (image) => {
    try {
      console.log("Image data: " + image);
      setImage(image);
    }
    catch (error) {
      throw error;
    }
  }

  return(
  <View>
    {!aviOnly && (
      <TouchableOpacity 
        style={[!image && styles.editButton, 
          "flex-1 items-center"]} 
        onPress={() => onGalleryButtonPress()}

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
    borderRadius: 75,
    width: 150,
    height: 150,
    borderColor: "#f82",
    borderWidth: 5,
  },
  editButton: {
    backgroundColor: "#aef",
    padding: 5,
    margin: 10,
    height: 150,
    width: 85, 
     
  },
});

    