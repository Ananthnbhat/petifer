import React from 'react';
import Lightbox from 'react-native-lightbox-v2';
import { StyleSheet, Image } from 'react-native';

const LightboxView = ({ navigator, imageData }) => (
    <Lightbox navigator={navigator}>
        <Image
            style={styles.petImage}
            source={{ uri: "data:image/png;base64," + imageData }}
        />
    </Lightbox>
);

const styles = StyleSheet.create({
    petImage: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
        // margin: 5
    },
});

export default LightboxView;
