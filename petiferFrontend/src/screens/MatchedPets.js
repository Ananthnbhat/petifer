import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, StatusBar, ScrollView } from 'react-native';
import openMap from 'react-native-open-maps';
import Geocoder from 'react-native-geocoder-reborn';
import getDistance from 'geolib/es/getDistance';
import getCurrentLocation from '../utils/getCurrentLocation';
import { LightboxView } from '../components';

const MatchedPets = ({ route }) => {

  const { matchedPets } = route.params;
  const [pets, setPets] = useState(matchedPets);

  useEffect(() => {
    let tempArr = pets.slice()

    const fetchData = async () => {
      const currentLoc = await getCurrentLocation();
      for (let i = 0; i < matchedPets.length; i++) {
        const lat = parseFloat(matchedPets[i].latitude)
        const lng = parseFloat(matchedPets[i].longitude)
        const address = await Geocoder.geocodePosition({ lat, lng })
        tempArr[i].streetName = address[0].streetName;
        tempArr[i].city = address[0].locality;
        const distance = await getDistance(
          { latitude: currentLoc.latitude, longitude: currentLoc.longitude },
          { latitude: lat, longitude: lng }
        );
        tempArr[i].distance = distance / 1000;
      }
      setPets(tempArr)
    }

    fetchData().catch(console.error);
  }, []);


  const openLocOnMap = (latitude, longitude) => {
    openMap({ query: `${latitude},${longitude}` });
  }

  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor="white"
        barStyle={'dark-content'}
        hidden={false} />
      <ScrollView style={styles.wrapper}>
        <Text style={styles.headingText}>Matched Pets</Text>
        {pets.map(pet => (
          <View style={styles.container} key={pet.id}>
            <View style={styles.imgWrapper}>
              <LightboxView imageData={pet.image} />
            </View>
            <View style={styles.petDetailsWrapper}>
              <View style={styles.petDetails}>
                <Text style={styles.streetName}>{pet.streetName},&nbsp;{'\n'}{pet.city}</Text>
                <View style={styles.accLocWrapper}>
                  <View style={styles.acc}>
                    <Text style={{ fontWeight: 'bold' }}>Accuracy</Text>
                    <Text style={{ alignSelf: 'center' }}>{pet.accuracy}%</Text>
                  </View>
                  <View style={styles.dist}>
                    <Text style={{ fontWeight: 'bold' }}>Distance</Text>
                    <Text style={{ alignSelf: 'flex-start' }}>{pet.distance}km</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity onPress={() => openLocOnMap(pet.latitude, pet.longitude)}>
                <Image
                  source={require("../assets/icons/pin.png")}
                  style={styles.mapLogo}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </>
  )
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    height: "100%"
  },
  headingText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
    position: "relative",
    left: "7%",
    marginTop: 5,
    marginBottom: 20,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 5,
    marginVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  txtWrapper: {
  },
  imgWrapper: {
    flex: 1,
    marginRight: 5
  },
  petDetailsWrapper: {
    flexDirection: 'row',
    flex: 2,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  petDetails: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  streetName: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    marginVertical: 10
  },
  accLocWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  acc: {
    flex: 1,
  },
  dist: {
    flex: 1,
  },
  mapLogo: {
    width: 45,
    height: 45
  },
  horizontalLine: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'gray',
  }
});

export default MatchedPets;
