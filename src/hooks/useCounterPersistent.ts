import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/core';
import {useCallback, useEffect, useState} from 'react';
import {Platform} from 'react-native';

export default function useCounterPersistent(routeName: string) {
  const [counter, setCounter] = useState(0);

  const navigation = useNavigation();

  const updateState = useCallback(async () => {
    if (Platform.OS !== 'web') {
      const valueCounter = await AsyncStorage.getItem(routeName);
      const newValue = valueCounter ? Number(valueCounter) + 1 : 1;
      setCounter(() => newValue);
      await AsyncStorage.setItem(routeName, newValue.toString());
    }
  }, [routeName]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await updateState();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation, updateState]);

  return {counter};
}
