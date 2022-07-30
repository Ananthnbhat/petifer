import React, { useEffect } from 'react';
import { fetchAllPets } from '../api';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { RadioButton, Text, Button } from 'react-native-paper';

const BUTTON_COLOR = '#bcd2e9';

const Home = () => {
  useEffect(() => {
    // test API
    const allPets = fetchAllPets();
    console.log(allPets);
  }, []);

  const [checked, setChecked] = React.useState('lost');

  return (
    <>
      <View style={styles.selectOption}>
        <TouchableOpacity
          onPress={() => setChecked('lost')}
          style={[styles.radioWrapper, checked === 'lost' ? styles.bgColor : null]}>
          <View>
            <RadioButton
              value='lost'
              status={checked === 'lost' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('lost')}
              color='black'
            />
          </View>
          <View style={styles.labelWrapper}>
            <Text style={styles.label}>Lost pet</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setChecked('found')}
          style={[styles.radioWrapper, checked === 'found' ? styles.bgColor : null]}>
          <View>
            <RadioButton
              value='found'
              status={checked === 'found' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('found')}
              color='black'
            />
          </View>
          <View style={styles.labelWrapper}>
            <Text style={styles.label}>Found pet</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        {checked === 'lost' ?
          <Button
            icon="upload"
            mode="contained"
            onPress={() => console.log('Pressed')}
            color={BUTTON_COLOR}
            style={styles.uploadBtn}
            labelStyle={{ fontSize: 30 }}
          >
            Upload
          </Button>
          :
          <Button
            icon="camera"
            mode="contained"
            onPress={() => console.log('Pressed')}
            color={BUTTON_COLOR}
            style={styles.uploadBtn}
            labelStyle={{ fontSize: 30 }}
          >
            Take a photo
          </Button>
        }

      </View>
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
  uploadBtn: {
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderRadius: 40,
  },
})

export default Home;
