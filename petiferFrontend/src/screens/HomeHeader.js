import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, StatusBar } from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const PAW_DIM = { width: 67, height: 62 }

const HomeHeader = () => {


    return (
        <>
            <View style={styles.container}>
                <StatusBar
                    animated={true}
                    backgroundColor="#facd6d"
                    hidden={false} />
                <Image style={styles.bannerImg} source={require('../assets/icons/topbanner.png')} />
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>petifur</Text>
                </View>
                <Image style={styles.grayPaw} source={require('../assets/icons/gray-paw.png')} />
                <Image style={styles.pinkPaw} source={require('../assets/icons/pink-paw.png')} />
                <Image style={styles.orangePaw} source={require('../assets/icons/orange-paw.png')} />
                <Image />
                <Image />
                <View style={styles.ausMapWrapper}>
                    <Image style={styles.ausMap} source={require('../assets/icons/aus-map.png')} />
                </View>
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20
    },
    bannerImg: {
        width: WIDTH,
        height: HEIGHT * 0.25
    },
    titleWrapper: {
        width: '100%',
        position: 'absolute',
        top: 30,
        alignItems: 'center',
    },
    title: {
        width: 143,
        height: 38,
        fontFamily: 'Swis721 Blk BT',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 32,
        letterSpacing: -0.685714,
        color: '#664441',
        textTransform: 'uppercase'
    },
    ausMapWrapper: {
        width: '100%',
        alignItems: 'center',
    },
    grayPaw: {
        width: PAW_DIM.width,
        height: PAW_DIM.height,
        position: 'absolute',
        left: "10%",
        top: "35%",
        opacity: 0.8,
    },
    pinkPaw: {
        position: 'absolute',
        right: '-2%',
        top: '30%',
    },
    orangePaw: {
        position: 'absolute',
        top: '90%',
        left: '15%'
    }
})
export default HomeHeader;