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
        style={!image && styles.editButton
          } 
        onPress={onPress()}
      >

        {image && <ImageBackground
          source={{
            uri: image
            }}
          style={styles.editButton}
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
  // image: {
  //   borderColor: "#f82",
  //   borderRadius: 0,
  //   borderWidth: 5,
  // },
  editButton: {
    backgroundColor: "#aef",
    padding: '35%',
    maxWidth: '50%',

    // height: '20%',
    borderRadius: '100%',
    // margin: 10,
     
  },
});

    