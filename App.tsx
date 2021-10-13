import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  RouteProp,
  ParamListBase,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Header from './src/components/Header';
import {colors, navigationTabs} from './src/constants';
import CreateScreen from './src/screens/Create';
import ExploreScreen, {routesHideHeader} from './src/screens/Explore';
import ProfileScreen from './src/screens/Profile';
import HeaderIcon from './src/components/HeaderIcon';

export type AppStackParamList = {
  Explore: undefined;
  Create: undefined;
  Profile: undefined;
};

type TabBarIconNavigation = {
  focused: boolean;
  color: string;
  size: number;
  route: RouteProp<ParamListBase, string>;
};

const Tab = createBottomTabNavigator();

function getIcon({focused, color, size, route}: TabBarIconNavigation) {
  const iconName = navigationTabs[route.name].icon;
  return (
    <Icon name={iconName} size={32} color={focused ? colors.primary : color} />
  );
}

const App = () => {
  useEffect(() => {
    const restoreState = async () => {
      await AsyncStorage.clear();
    };
    restoreState();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Explore"
          screenOptions={({route, navigation}) => ({
            tabBarActiveTintColor: colors.primary,
            headerShown: !routesHideHeader.includes(
              getFocusedRouteNameFromRoute(route) || '',
            ),
            headerTitleContainerStyle: styles.header,
            headerRightContainerStyle: styles.headerIconStyle,
            headerLeftContainerStyle: styles.headerIconStyle,
            headerRight: () => (
              <HeaderIcon
                label="Notifications"
                icon={require('./src/assets/images/message.png')}
                onPress={() => navigation.navigate('Notifications')}
              />
            ),
            headerTitle: () => <Header />,
            headerLeft: () => (
              <HeaderIcon
                label="Search"
                icon={require('./src/assets/images/search.png')}
                onPress={() => navigation.navigate('Search')}
              />
            ),
            // tabBarIconStyle: styles.tabBarStyle,
            tabBarStyle: styles.tabBarStyle,
            tabBarIcon: ({focused, color, size}) =>
              getIcon({focused, color, size, route}),
          })}>
          <Tab.Screen name="Explore" component={ExploreScreen} />
          <Tab.Screen
            name="Create"
            component={CreateScreen}
            options={{
              headerShown: false,
              tabBarIcon: () => (
                <Icon name="add-circle" size={40} color={colors.primary} />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{headerShown: false}}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 4,
    alignSelf: 'center',
  },
  headerIconStyle: {
    paddingHorizontal: 16,
  },
  tabBarStyle: {
    height: 60,
  },
});

export default App;
