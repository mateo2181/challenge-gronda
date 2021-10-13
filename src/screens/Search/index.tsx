import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {ExploreStackParamList} from '../Explore';
import {generateRandomColor} from '../../utils';
import useCounterPersistent from '../../hooks/useCounterPersistent';

type Props = StackScreenProps<ExploreStackParamList, 'Search'>;

export default function Search({route}: Props) {
  const {counter} = useCounterPersistent(route.name);

  return (
    <View style={{...styles.container, backgroundColor: generateRandomColor()}}>
      <Text style={styles.counter}>{counter}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counter: {
    fontSize: 40,
  },
});
