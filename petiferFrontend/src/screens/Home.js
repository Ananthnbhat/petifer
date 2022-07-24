import React, { useEffect } from 'react';
import { fetchAllPets } from '../api';
import { Text } from 'react-native';

const Home = () => {
  useEffect(() => {
    // test API
    const allPets = fetchAllPets();
    console.log(allPets);
  }, []);
  return (
    <Text>Home page</Text>
  );
};

export default Home;
