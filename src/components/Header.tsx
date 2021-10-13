import React from 'react';
import {Dimensions, Image, StyleSheet} from 'react-native';

const widthScreen = Dimensions.get('window').width;

export default function Header() {
  return (
    <Image
      style={styles.logo}
      source={require('../../src/assets/images/gronda_logo.png')}
    />
  );
}

const styles = StyleSheet.create({
  logo: {
    flex: 4,
    height: 40,
    width: widthScreen * 0.6,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});
