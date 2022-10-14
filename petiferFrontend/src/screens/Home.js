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
  FOUND, LOST, SUCCESS_MSG, FAILURE_MSG, EMPTY_MATCHED_PETS, NO_MATCHED_PETS
} from '../constants/homeConstants';

const WIDTH = Dimensions.get('window').width;

const Home = ({ navigation }) => {

  const [status, setStatus] = useState(LOST);
  const [imgDetails, setImgDetails] = useState(EMPTY_IMAGE_DETAILS);
  const [popupText, setPopupText] = useState('Image uploaded successfully !');
  const [popupBtnText, setPopupBtnText] = useState('Close');
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
        if (selectedIndex === 0 && result[0].length > 0 && result[1]) {
          setMatchedPets(result[0])
          setPopupText(SUCCESS_MSG)
          setPopupBtnText("View Matched Pets")

        } else if (selectedIndex === 1 && result[0].hasOwnProperty('image') && result[1]) {
          setPopupText(SUCCESS_MSG)

        } else if (result[0].length === 0) {
          setPopupText(NO_MATCHED_PETS)
        } else {
          setPopupText(result[0])

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
      setPopupBtnText("View Matched Pets")
      navigation.navigate('MatchedPets', { matchedPets })
    }
    setPopupText('')
    setPopupBtnText('Close')
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
          {popupText != '' ? <Popup text={popupText} btnText={popupBtnText} closePopup={handleClosePopup} /> :
            <>
              <HomeHeader />
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
  label: {
    fontSize: 18
  },
  bottomTabButtons: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 25,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    // for android
    elevation: 10,
    // for ios
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    // height: "100%",
    flex: 1
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
