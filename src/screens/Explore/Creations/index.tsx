import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {ExploreStackParamList} from '..';
import api from '../../../api';
import CreationCard from '../../../components/CreationCard';
import {colors} from '../../../constants';
import {Creation} from '../../../types';

type Props = StackScreenProps<ExploreStackParamList, 'Creations'>;

export default function Creations({navigation}: Props) {
  const [creationsData, setCreations] = useState<Array<Creation>>([]);

  useEffect(() => {
    api.creations.getAll().then(creations => {
      setCreations(creations);
    });
  }, []);

  if (creationsData.length === 0) {
    return <Text>Creations not found</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.banner}
        resizeMode="contain"
        source={require('../../../assets/images/banner.jpg')}
      />
      <View style={styles.grayLine} />

      <View testID="creationsList" style={styles.contentContainerStyle}>
        {creationsData.map(item => (
          <CreationCard
            onPress={() =>
              navigation.navigate('CreationDetail', {creationId: item.id})
            }
            id={item.id}
            key={item.id}
            title={item.title}
            image={item.img_url}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // display: 'flex',
    paddingHorizontal: 8,
  },
  grayLine: {
    marginTop: 16,
    paddingHorizontal: -8,
    height: 2,
    width: '100%',
    backgroundColor: colors.gray,
  },
  contentContainerStyle: {
    // width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 16,
    // paddingHorizontal: -16,
    // paddingBottom: 160
  },
  banner: {
    height: 190,
    width: '100%',
    borderRadius: 4,
  },
});
