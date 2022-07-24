import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Home from "./src/screens/Home";
import { Header } from "./src/components";

const App = () => {

  return (
    <SafeAreaView>
      <Header />
      {/* code for naviagtion here  */}
      <Home />
    </SafeAreaView>
  );
};

export default App;
