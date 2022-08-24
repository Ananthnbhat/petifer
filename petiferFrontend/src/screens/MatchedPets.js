import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import openMap from 'react-native-open-maps';

import matchedPets from '../assets/test/matched-pets.json'

const MatchedPets = () => {

  const openLocOnMap = (latitude, longitude) => {
    openMap({ latitude, longitude });
  }

  return (
    <>
      {matchedPets.map(pet => (
        <View style={styles.container} key={pet.id}>
          <Image
            style={styles.tinyLogo}
            source={{ uri: "data:image/png;base64," + pet.image }}
          />
          <View style={styles.txtWrapper}>
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
  tinyLogo: {
    width: 150,
    height: 150,
  },
  txtWrapper: {
  },
  petDetails: {
  }
});

export default MatchedPets;
