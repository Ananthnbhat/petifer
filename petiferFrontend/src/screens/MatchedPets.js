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
      <View style={styles.wrapper}>
        <Text style={styles.headingText}>Matched Pets</Text>
        {matchedPets.map(pet => (
          <View style={styles.container} key={pet.id}>
            <View style={styles.imgWrapper}>
              <LightboxView imageData={pet.image} />
            </View>
            <View style={styles.petDetails}>
              <Text>Accuracy:&nbsp;{pet.accuracy}%</Text>
              <TouchableOpacity onPress={() => openLocOnMap(pet.latitude, pet.longitude)}>
                <Image
                  source={require("../assets/icons/next.png")}
                  style={styles.mapLogo}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
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
    flex: 1
  },
  petDetails: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2
  },
  horizontalLine: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'gray',
  }
});

export default MatchedPets;
