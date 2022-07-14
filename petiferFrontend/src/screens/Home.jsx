import React, {useEffect} from 'react';
import {fetchAllPets} from '../api';

const Home = () => {
  useEffect(() => {
    // test API
    const allPets = fetchAllPets();
    console.log(allPets);
  }, []);
  return <div>Home page</div>;
};

export default Home;
