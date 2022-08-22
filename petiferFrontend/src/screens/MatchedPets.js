import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

import matchedPets from '../assets/test/matched-pets.json'

const MatchedPets = () => {

  return (
    <>
      {matchedPets.map(pet => (
        <View style={styles.container} key={pet.id}>
          <Image
            style={styles.tinyLogo}
            source={{ uri: "data:image/png;base64," + pet.image }}
          />
          <View style={styles.txtWrapper}>
            <Text style={styles.petDetails}>Location detals here</Text>
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
