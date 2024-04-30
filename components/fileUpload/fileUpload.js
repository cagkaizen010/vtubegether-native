import React, {useState} from "react";
import {TouchableOpacity, ActivityIndicator, Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import { Icon } from 'react-native-elements';
import tw from 'twrnc'

const FileUploadModal = ({
    modalVisible,
    onBackPress,
    onCameraPress,
    onGalleryPress,
    onRemovePress,
    isLoading = true,
    ...props
}) => {
    console.log(props.color)
    return (
        <Modal animationType="slide" visible={modalVisible} transparent={true}>
            <Pressable style={styles.container} >
                {/* {isLoading && <ActivityIndicator size={70} color={colors.tertiary} />} */}
                {/* {isLoading && ( */}
                    {console.log(props.color)}
                    <View style={[styles.modalView, {
                        
                        backgroundColor: props.color
                    }]}>
                        <Text>{props.tecks}</Text>

                        <View style={styles.decisionRow}>
                            <TouchableOpacity
                                style={styles.optionBtn}
                                onPress={onCameraPress}
                            >
                              <Icon
                                iconStyle={tw`px-2 py-2 `}
                                name='camera-outline'
                                type="ionicon"
                                solid={true}> 
                              </Icon>
                                <Text>Take Picture</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.optionBtn}
                                onPress={onGalleryPress}
                            >
                              <Icon
                                iconStyle={tw`px-2 py-2 `}
                                name='images-outline'
                                type="ionicon"
                                solid={true}>
                              </Icon>
                              <Text>Gallery</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity
                                style={styles.optionBtn}
                                onPress={onRemovePress}
                            >
                              <Icon
                                iconStyle={tw`px-2 py-2 `}
                                name='chevron-back-outline'
                                type="ionicon"
                                solid={true}>
                              </Icon>
                              <Text>Remove</Text>
                            </TouchableOpacity>


                        </View>
                    

                    </View>
                {/* )} */}
            </Pressable>
        </Modal>

        
    )


};

export default FileUploadModal

const colors = StyleSheet.create({
    primary: '#fff',
    tertiary: '#fff'
})

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: '#fff',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    decisionRow:{

    }
  });

