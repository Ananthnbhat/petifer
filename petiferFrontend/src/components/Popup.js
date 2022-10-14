import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, Image } from 'react-native';

const Popup = ({ text, btnText, closePopup }) => {

    const [modalVisible, setModalVisible] = useState(true);

    useEffect(() => {
        if (!modalVisible) {
            closePopup()
        }
    }, [modalVisible]);

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {text.includes("unsuccessful") || text.includes("Sorry")
                            ? null
                            : <Image source={require('../assets/icons/done.png')} />}
                        <Text style={styles.modalText}>{text}</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>{btnText}</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        // backgroundColor: 'grey',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
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
        borderRadius: 15,
        // width: 100,
        paddingVertical: 10,
        paddingHorizontal: 20,
        elevation: 2,
    },
    buttonOpen: {
        // backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#F8633B',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        marginTop: 20,
        textAlign: 'center',
        color: 'black'
    },
});

export default Popup;
