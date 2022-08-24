
import GetLocation from 'react-native-get-location';

const getCurrentLocation = async () => {
    const currentLoc = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
    })
    return currentLoc;
};
export default getCurrentLocation;
