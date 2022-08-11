import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Header = () => {
  return (
    <View style={styles.headerView}>
      <Image
        style={styles.tinyLogo}
        source={require('../assets/icons/paw.png')}
      />
      <Text style={styles.headerText}>Petify</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    height: 80,
    backgroundColor: '#1e4066',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 25,
    alignSelf: 'center',
  },
  tinyLogo: {
    width: 50,
    height: 50,
    marginLeft: 10,
    marginRight: 20
  },
})

export default Header;
