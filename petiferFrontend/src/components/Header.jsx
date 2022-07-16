import React from 'react';
import {StyleSheet, View} from 'react-native';

const Header = () => {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <Text>header for all screens</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Header;
