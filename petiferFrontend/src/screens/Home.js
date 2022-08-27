import React, { useState, useEffect } from 'react';
import { postNewPet } from '../api';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { RadioButton, Text, Button } from 'react-native-paper';
import { imagePicker, takePhoto } from '../utils/uploadPhoto';
import { Popup, LoadingIndicator } from '../components';
import getCurrentLocation from '../utils/getCurrentLocation';
import {
  BUTTON_COLOR, EMPTY_IMAGE_DETAILS,
  FOUND, LOST, SUCCESS_MSG, FAILURE_MSG
} from '../constants/homeConstants';

const Home = ({ navigation }) => {

  const [status, setStatus] = useState(LOST);
  const [imgDetails, setImgDetails] = useState(EMPTY_IMAGE_DETAILS);
  const [popupText, setPopupText] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (imgDetails.fileData) {

      setLoading(true)

      const petData = {
        'status': status,
        'image': imgDetails.fileData,
        'latitude': imgDetails.latitude,
        'longitude': imgDetails.longitude,
      }
      const result = postNewPet(petData);
      setLoading(false)
      if (result) {
        // show success popup & matched pets if any
        setPopupText(SUCCESS_MSG)
      } else {
        // show failure popup
        setPopupText(FAILURE_MSG)
      }
    }
    return () => {
      // cleanup
      setImgDetails(EMPTY_IMAGE_DETAILS);
    };
  }, [imgDetails.fileData]);

  const handleClosePopup = () => {

    if (popupText === SUCCESS_MSG && status == LOST) {
      setPopupText('')
      navigation.navigate('MatchedPets')
    } else {
      setPopupText('')
    }
  }

  const uploadImageFromGallery = async () => {
    const asset = await imagePicker()
    if (asset && asset.base64) {
      setImgDetails(prevState => ({
        ...prevState,
        fileData: asset.base64,
      }));
    }
  }

  const capturePhoto = async () => {
    const asset = await takePhoto();
    const location = await getCurrentLocation();
    if (asset && asset.base64) {
      setImgDetails({
        fileData: asset.base64,
        latitude: location.latitude,
        longitude: location.longitude
      });
    }
  }

  return (
    <>
      {loading && <LoadingIndicator />}
      {popupText != '' && <Popup text={popupText} closePopup={handleClosePopup} />}
      <View style={styles.selectOption}>
        <TouchableOpacity
          onPress={() => setStatus(LOST)}
          style={[styles.radioWrapper, status === LOST ? styles.bgColor : null]}>
          <View>
            <RadioButton
              value={LOST}
              status={status === LOST ? 'checked' : 'unchecked'}
              onPress={() => setStatus(LOST)}
              color='black'
            />
          </View>
          <View style={styles.labelWrapper}>
            <Text style={styles.label}>Lost pet</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setStatus(FOUND)}
          style={[styles.radioWrapper, status === FOUND ? styles.bgColor : null]}>
          <View>
            <RadioButton
              value={FOUND}
              status={status === FOUND ? 'checked' : 'unchecked'}
              onPress={() => setStatus(FOUND)}
              color='black'
            />
          </View>
          <View style={styles.labelWrapper}>
            <Text style={styles.label}>Found pet</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        {status === LOST ?
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
