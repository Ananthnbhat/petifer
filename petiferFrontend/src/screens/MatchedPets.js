import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import openMap from 'react-native-open-maps';
import { LightboxView } from '../components';

const MatchedPets = ({ route }) => {

  const { matchedPets } = route.params;

  const openLocOnMap = (latitude, longitude) => {
    openMap({ query: `${latitude},${longitude}` });
  }

  return (
    <>
      {matchedPets.map(pet => (
        <View style={styles.container} key={pet.id}>
          <LightboxView imageData={pet.image} />
          <View style={styles.petDetails}>
            <Text>Accuracy:&nbsp;{pet.accuracy}%</Text>
            <TouchableOpacity onPress={() => openLocOnMap(pet.latitude, pet.longitude)}>
              <Image
                source={require("../assets/icons/maps.png")}
                style={styles.mapLogo}
              />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </>
  )
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    margin: 5,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  petImage: {
    width: 150,
    height: 150,
  },
  txtWrapper: {
  },
  petDetails: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start'
  }
});

export default MatchedPets;
