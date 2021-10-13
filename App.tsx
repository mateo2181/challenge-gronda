import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView, StyleSheet} from 'react-native';

import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  useEffect(() => {
    const restoreState = async () => {
      await AsyncStorage.clear();
    };
    restoreState();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <AppNavigator />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
