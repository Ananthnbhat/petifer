import React from 'react';
import {
  Image,
  View,
  StyleSheet
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HeaderBackButton } from "@react-navigation/elements";

import Home from "./src/screens/Home";
import MatchedPets from "./src/screens/MatchedPets"
import { Header } from "./src/components";

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <>
      <Header />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
        >
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="MatchedPets" component={MatchedPets} options={({ navigation }) => ({
            title: '',
            headerShadowVisible: false,
            headerLeft: () => (
              <HeaderBackButton
                onPress={() => navigation.goBack()}
                backImage={() => (
                  <View style={styles.backIconWraper}>
                    <Image
                      style={{ width: 40, height: 40 }}
                      source={require('./src/assets/icons/back.png')}
                    /></View>)}
              />
            )
          })} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
const styles = StyleSheet.create({
  backIconWraper: {
    marginRight: 10,
  }
})

export default App;
