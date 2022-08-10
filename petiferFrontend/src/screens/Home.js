import React, { useState, useEffect } from 'react';
import { postNewPet } from '../api';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { RadioButton, Text, Button } from 'react-native-paper';
import { imagePicker, takePhoto } from '../utils/uploadPhoto';

const BUTTON_COLOR = '#bcd2e9';
const EMPTY_IMAGE_DETAILS = {
  fileType: '',
  fileUri: '',
  fileData: '',
  fileName: '',
}

const Home = () => {

  const [status, setStatus] = useState('lost');
  const [imgDetails, setImgDetails] = useState(EMPTY_IMAGE_DETAILS);

  useEffect(() => {
    if (imgDetails.fileData) {
      console.log("image selected")
      // const petData = {
      //   'status': status,
      //   'image': imgDetails.fileData
      // }
      // const result = postNewPet(petData);
      // if (result) {
      //   // show success popup & matched pets if any
      // } else {
      //   // show failure popup
      // }
    }
    return () => {
      // cleanup
      // setImgDetails(EMPTY_IMAGE_DETAILS);
    };
  }, [imgDetails.fileData]);

  const uploadImageFromGallery = async () => {
    const asset = await imagePicker()
    if (asset && asset.base64) {
      setImgDetails({
        fileType: asset.type,
        fileUri: asset.uri,
        fileData: asset.base64,
        fileName: asset.fileName
      });
    }
  }

  const capturePhoto = async () => {
    const asset = await takePhoto();
    if (asset && asset.base64) {
      setImgDetails({
        fileType: asset.type,
        fileUri: asset.uri,
        fileData: asset.base64,
        fileName: asset.fileName
      });
    }
  }

  return (
    <>
      <View style={styles.selectOption}>
        <TouchableOpacity
          onPress={() => setStatus('lost')}
          style={[styles.radioWrapper, status === 'lost' ? styles.bgColor : null]}>
          <View>
            <RadioButton
              value='lost'
              status={status === 'lost' ? 'checked' : 'unchecked'}
              onPress={() => setStatus('lost')}
              color='black'
            />
          </View>
          <View style={styles.labelWrapper}>
            <Text style={styles.label}>Lost pet</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setStatus('found')}
          style={[styles.radioWrapper, status === 'found' ? styles.bgColor : null]}>
          <View>
            <RadioButton
              value='found'
              status={status === 'found' ? 'checked' : 'unchecked'}
              onPress={() => setStatus('found')}
              color='black'
            />
          </View>
          <View style={styles.labelWrapper}>
            <Text style={styles.label}>Found pet</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        {status === 'lost' ?
          <Button
            icon="upload"
            mode="contained"
            onPress={() => uploadImageFromGallery()}
            color={BUTTON_COLOR}
            style={styles.uploadBtn}
            labelStyle={{ fontSize: 30 }}
          >
            Upload
          </Button>
          :
          <Button
            icon="camera"
            mode="contained"
            onPress={() => capturePhoto()}
            color={BUTTON_COLOR}
            style={styles.uploadBtn}
            labelStyle={{ fontSize: 30 }}
          >
            Take a photo
          </Button>
        }
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text>{'\n'}</Text>
          <Text>Image saved to app 👇🏼</Text>
          <Text>{'\n'}</Text>
          <Image source={{ uri: 'data:image/jpeg;base64,' + imgDetails.fileData }} style={{ width: 200, height: 200, borderRadius: 10 }} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  selectOption: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 40,
  },
  radioWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    width: '35%',
    paddingVertical: 8,
    borderRadius: 7,

  },
  labelWrapper: {
    alignSelf: 'center',
  },
  label: {
    fontSize: 18
  },
  bgColor: {
    backgroundColor: BUTTON_COLOR,
    borderColor: BUTTON_COLOR,
    borderWidth: 1,
    // for android
    elevation: 5,
    // for ios
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  uploadBtn: {
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderRadius: 40,
    elevation: 5,
  },
})

export default Home;
