import React from 'react';
import {
  Dimensions,
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

type Props = {
  id: number;
  title: string;
  image: string;
  onPress: (event: GestureResponderEvent) => void;
};

// const screenWidth = Dimensions.get('window').width;

function CreationCard({id, title, image, onPress}: Props) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.cardContainer}>
        <Image
          style={styles.image}
          source={{uri: image}}
          resizeMode="contain"
        />
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default React.memo(CreationCard);

const styles = StyleSheet.create({
  cardContainer: {
    // borderRadius: 16,
    // marginHorizontal: 6,
    flexDirection: 'column',
    marginTop: 16,
    // flex: 0.5,
    // height: 170,
    width: Dimensions.get('window').width / 2 - 16,
    marginHorizontal: 2,
  },
  image: {
    borderRadius: 8,
    height: 175,
  },
  title: {
    marginTop: 8,
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
  },
});
