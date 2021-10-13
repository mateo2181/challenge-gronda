import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import api from '../../../api';
import {Creation} from '../../../types';
import {ExploreStackParamList} from '..';

type Props = StackScreenProps<ExploreStackParamList, 'CreationDetail'>;

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

export default function CreationDetail({route, navigation}: Props) {
  const {creationId} = route.params;

  const [creation, setCreation] = useState<Creation | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setLoading(true);
      api.creations.findById(creationId).then(result => {
        setCreation(result);
        setLoading(false);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }).start();
        mounted = false;
      });
    }
    return () => {
      mounted = false;
    };
  }, [creationId, fadeAnim]);

  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (!creation) {
    return <Text>Creation not found</Text>;
  }
  return (
    <View>
      <Image style={styles.img} source={{uri: creation.img_url}} />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Icon name="arrow-back-outline" size={24} color="black" />
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.infoContainer,
          {
            // Bind opacity to animated value
            opacity: fadeAnim,
          },
        ]}>
        {creation.title !== '' && (
          <Text style={styles.infoTitle}>{creation.title}</Text>
        )}
        <Text style={styles.infoDescription}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
          ducimus, consequatur aliquam accusamus asperiores quam rem optio est
          voluptatibus dolorum sint amet ipsa reprehenderit commodi nemo porro
          nisi nulla in?
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    height: viewportHeight / 2,
    width: viewportWidth,
  },
  backButton: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: 20,
    left: 20,
    height: 45,
    width: 45,
    zIndex: 1,
    borderRadius: 40,
    backgroundColor: '#ffffff75',
  },
  infoContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  infoTitle: {
    fontSize: 28,
    color: '#000',
    fontWeight: '700',
  },
  infoDescription: {
    fontSize: 16,
    letterSpacing: 0.5,
    fontWeight: '300',
    color: '#000',
    marginTop: 16,
  },
});
