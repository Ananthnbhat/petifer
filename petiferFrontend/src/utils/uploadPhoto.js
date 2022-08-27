import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { PermissionsAndroid, Platform } from 'react-native'

const OPTIONS = {
    mediaType: 'photo',
    includeBase64: true
};

const getAsset = result => {
    if (result.didCancel) {
        console.log("User cancelled image picker");
    } else if (result.error) {
        console.log("ImagePicker Error: ", result.error);
    } else if (result.customButton) {
        console.log("User tapped custom button: ", result.customButton);
        alert(result.customButton);
    } else {
        const asset = JSON.parse(JSON.stringify(result)).assets[0];
        const source = { uri: asset.uri };

        return asset;
    }
}

const requestLocationPermission = async () => {
    try {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Camera & location access allowed");
                return true;
            } else {
                console.log("Camera & location permission denied");
                return false;
            }
        }
    } catch (err) {
        console.warn(err);
        return false;
    }
};

const imagePicker = async () => {

    const result = await launchImageLibrary(OPTIONS);
    return getAsset(result);
}

const takePhoto = async () => {

    if (await requestLocationPermission()) {
        const result = await launchCamera(OPTIONS);
        return getAsset(result);
    }
}

export { imagePicker, takePhoto };
