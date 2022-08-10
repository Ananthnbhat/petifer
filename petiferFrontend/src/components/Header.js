import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const Header = () => {
  return (
    <View style={styles.headerView}>
      <Button
      // icon={require('../assets/icons/petify.jpg')}
      >
        Image
      </Button>
      <Text style={styles.headerText}>Petify</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    height: 80,
    backgroundColor: '#1e4066',
    flexDirection: 'row',
    alignContent: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 25,
    alignSelf: 'center',
  }
})

export default Header;
