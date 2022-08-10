import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

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

const imagePicker = async () => {

    const result = await launchImageLibrary(OPTIONS);
    return getAsset(result);
}

const takePhoto = async () => {

    const result = await launchCamera(OPTIONS);
    return getAsset(result);
}

export { imagePicker, takePhoto };
