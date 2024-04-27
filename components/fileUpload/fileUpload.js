import React, {useState} from "react";
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import { TouchableOpacity } from "react-native-web";
import { Icon } from 'react-native-elements';


const fileUploadModal = ({
    modalVisible,
    onBackPress,
    onCameraPress,
    onGalleryPress,
    onRemovePress,
    isLoading = true,
}) => {



    return (
        <Modal animationType="slide" visible={modalVisible} transparent={true}>
            <Pressable style={styles.container} onPress={onBackPress} >
                {isLoading && <ActivityIndicator size={70} color={colors.tertiary} />}
                {isLoading && (
                    <View style={[styles.modalView, {
                        backgroundColor: colors.primary
                    }]}>
                        <Text>Profile Photo</Text>

                        <View style={styles.decisionRow}>
                            <TouchableOpacity
                                style={styles.optionBtn}
                                onPress={onCameraPress}
                            >
                                <Text>Take Picture</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.optionBtn}
                                onPress={onGalleryPress}
                            >
                                
                              <Icon
                                iconStyle={tw`px-2 py-2`}
                                name='chevron-back-outline'
                                type="ionicon"
                                solid={true}>
                              </Icon>

                            </TouchableOpacity>
                            
                            <TouchableOpacity
                                style={styles.optionBtn}
                                onPress={onREmovePress}
                            >
                                <Icon>

                                </Icon>
                            </TouchableOpacity>


                        </View>

                    </View>
                )}
            </Pressable>
        </Modal>

        
    )


};

// const styles = StyleSheet.create({
//     centeredView: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       marginTop: 22,
//     },
//     modalView: {
//       margin: 20,
//       backgroundColor: 'white',
//       borderRadius: 20,
//       padding: 35,
//       alignItems: 'center',
//       shadowColor: '#000',
//       shadowOffset: {
//         width: 0,
//         height: 2,
//       },
//       shadowOpacity: 0.25,
//       shadowRadius: 4,
//       elevation: 5,
//     },
//     button: {
//       borderRadius: 20,
//       padding: 10,
//       elevation: 2,
//     },
//     buttonOpen: {
//       backgroundColor: '#F194FF',
//     },
//     buttonClose: {
//       backgroundColor: '#2196F3',
//     },
//     textStyle: {
//       color: 'white',
//       fontWeight: 'bold',
//       textAlign: 'center',
//     },
//     modalText: {
//       marginBottom: 15,
//       textAlign: 'center',
//     },
//   });



export default fileUploadModal
