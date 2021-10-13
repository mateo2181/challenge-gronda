import React from 'react';
import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

type Props = {
  label: string;
  icon: any;
  onPress: (event: GestureResponderEvent) => void;
};

export default function HeaderIcon({label, icon, onPress}: Props) {
  return (
    <TouchableOpacity onPress={onPress} accessibilityLabel={label}>
      <Image style={styles.iconHeader} source={icon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  iconHeader: {
    width: 25,
    height: 25,
    opacity: 0.5,
  },
});
