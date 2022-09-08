import React, { useState, useEffect } from 'react';
import { postNewPet } from '../api';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { RadioButton, Text, Button } from 'react-native-paper';
import SegmentedControlTab from "react-native-segmented-control-tab";
import { imagePicker, takePhoto } from '../utils/uploadPhoto';
import { Popup, LoadingIndicator } from '../components';
import getCurrentLocation from '../utils/getCurrentLocation';
import HomeHeader from './HomeHeader';
import {
  BUTTON_COLOR, EMPTY_IMAGE_DETAILS,
  FOUND, LOST, SUCCESS_MSG, FAILURE_MSG, EMPTY_MATCHED_PETS
} from '../constants/homeConstants';

const WIDTH = Dimensions.get('window').width;

const Home = ({ navigation }) => {

  const [status, setStatus] = useState(LOST);
  const [imgDetails, setImgDetails] = useState(EMPTY_IMAGE_DETAILS);
  const [popupText, setPopupText] = useState('');
  const [loading, setLoading] = useState(false);
  const [matchedPets, setMatchedPets] = useState(EMPTY_MATCHED_PETS)
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (imgDetails.fileData) {

      setLoading(true)

      const petData = {
        'image': imgDetails.fileData,
        'status': selectedIndex === 0 ? LOST : FOUND,
        'latitude': imgDetails.latitude,
        'longitude': imgDetails.longitude,
      }

      postNewPet(petData).then(result => {
        setLoading(false)
        if (selectedIndex === 0 && result.length > 0) {
          setMatchedPets(result)
          setPopupText(SUCCESS_MSG)

        } else if (selectedIndex === 1 && result.hasOwnProperty('image')) {
          setPopupText(SUCCESS_MSG)

        } else {
          setPopupText(FAILURE_MSG)

        }
      });
    }
    return () => {
      // cleanup
      setImgDetails(EMPTY_IMAGE_DETAILS);
    };
  }, [imgDetails.fileData]);

  const handleClosePopup = () => {

    if (popupText === SUCCESS_MSG && selectedIndex == 0) {
      navigation.navigate('MatchedPets', { matchedPets })
    }
    setPopupText('')
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

  const handleIndexChange = index => {
    setSelectedIndex(index)
  }

  return (
    <>
      {loading ? <LoadingIndicator /> :
        <>
          {popupText != '' ? <Popup text={popupText} closePopup={handleClosePopup} /> :
            <>
              <HomeHeader />
              {/* <View style={styles.selectOption}>
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
              </View> */}
              <View style={styles.bottomTabButtons}>
                <SegmentedControlTab
                  values={["Lost", "Found"]}
                  selectedIndex={selectedIndex}
                  onTabPress={handleIndexChange}
                  tabsContainerStyle={styles.tabsContainerStyle}
                  tabStyle={styles.tabStyle}
                  tabTextStyle={styles.tabTextStyle}
                  activeTabStyle={styles.activeTabStyle}
                  activeTabTextStyle={styles.activeTabTextStyle}
                />
                <View style={styles.bottomButtons}>
                  {selectedIndex === 0 ?
                    <Button
                      icon="upload"
                      mode="contained"
                      onPress={() => uploadImageFromGallery()}
                      color={BUTTON_COLOR}
                      style={styles.uploadBtn}
                      labelStyle={{ fontSize: 24 }}
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
                      labelStyle={{ fontSize: 24 }}
                    >
                      Take a photo
                    </Button>
                  }
                </View>
              </View>
            </>
          }
        </>
      }
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
  bottomTabButtons: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 25,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    // for android
    elevation: 10,
    // for ios
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  uploadBtn: {
    alignSelf: 'center',
    // paddingHorizontal: 10,
    paddingVertical: 15,
    width: WIDTH / 1.5,
    borderRadius: 40,
    elevation: 5,
  },
  tabsContainerStyle: {
    marginBottom: 10,
  },
  tabStyle: {
    borderColor: 'white',
    height: 50,
    elevation: 5
  },
  tabTextStyle: {
    fontSize: 20,
    color: 'black',
    textTransform: 'uppercase'
  },
  activeTabStyle: {
    backgroundColor: '#664441',
  },
  activeTabTextStyle: {
    color: 'white',
  },
  bottomButtons: {
    // borderWidth: 2,
    marginTop: 20,
    position: 'relative',
  },
})

export default Home;
