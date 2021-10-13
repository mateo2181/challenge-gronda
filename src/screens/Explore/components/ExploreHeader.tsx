import {useRoute} from '@react-navigation/core';
import {ParamListBase} from '@react-navigation/routers';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';

const exploreSections = [
  {
    name: 'Creations',
    link: 'Creations',
  },
  {
    name: 'Masterclass',
    link: 'Masterclasses',
  },
  {
    name: 'Jobs',
    link: 'Jobs',
  },
];

type Props = {
  navigation: StackNavigationProp<ParamListBase>;
};

function ExploreHeader({navigation}: Props) {
  const route = useRoute();

  return (
    <ScrollView
      horizontal={true}
      decelerationRate="normal"
      contentContainerStyle={styles.container}>
      {exploreSections.map(section => (
        <TouchableOpacity
          style={[
            styles.item,
            route.name === section.link ? styles.itemActive : {},
          ]}
          key={section.name}
          onPress={() => navigation.navigate(section.link)}>
          <Text
            style={
              route.name === section.link ? styles.textActive : styles.text
            }>
            {section.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

export default React.memo(ExploreHeader);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 16,
    marginHorizontal: 8,
    // paddingBottom: 160
  },
  item: {
    marginHorizontal: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 28,
    borderColor: '#000',
    borderWidth: 1,
  },
  itemActive: {
    backgroundColor: '#000',
  },
  text: {
    color: '#000',
  },
  textActive: {
    color: '#fff',
  },
});
