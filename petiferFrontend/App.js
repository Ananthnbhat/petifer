import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
          <Stack.Screen name="MatchedPets" component={MatchedPets} options={{ title: 'Matched Pets' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
