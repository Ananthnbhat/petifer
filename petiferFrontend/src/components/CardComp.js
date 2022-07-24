import React from 'react';
import { View, StyleSheet, Text } from 'react-native'
import { Card, Title, Paragraph } from 'react-native-paper';

const CardComp = () => (
  <Card style={styles.card}>
    <Card.Content>
      <View style={styles.wrapper}>
        <Card.Cover style={styles.image} source={{ uri: 'https://picsum.photos/700' }} />
        <View style={styles.petDetails}>
          <Title>title</Title>
          <Paragraph>sub-content</Paragraph>
          <Text>Some other text</Text>
        </View>
      </View>
    </Card.Content>
    <View
      style={styles.line}
    />
  </Card>
);

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 2,
    // borderWidth: 1
  },
  image: {
    flex: .5,
    height: 70,
    // borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 2
  },
  petDetails: {
    flex: 1.5,
    marginHorizontal: 2,
    // borderWidth: 1,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  line: {
    display: 'flex',
    alignSelf: 'center',
    backgroundColor: '#A2A2A2',
    height: 2,
    borderRadius: 10,
    width: "90%"
  }
});

export default CardComp;
