import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {getFocusedRouteNameFromRoute, RouteProp} from '@react-navigation/core';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ParamListBase} from '@react-navigation/routers';
import Icon from 'react-native-vector-icons/Ionicons';

import {colors, navigationTabs} from '../constants';
import ExploreScreen, {routesHideHeader} from '../screens/Explore';
import CreateScreen from '../screens/Create';
import ProfileScreen from '../screens/Profile';
import HeaderIcon from '../components/HeaderIcon';
import Header from '../components/Header';

export type AppStackParamList = {
  Explore: undefined;
  Create: undefined;
  Profile: undefined;
};

type TabBarIconNavigation = {
  focused: boolean;
  color: string;
  route: RouteProp<ParamListBase, string>;
};

const Tab = createBottomTabNavigator();

function getIcon({focused, color, route}: TabBarIconNavigation) {
  const iconName = navigationTabs[route.name].icon;
  return (
    <Icon name={iconName} size={32} color={focused ? colors.primary : color} />
  );
}

export default function AppNavigator() {
  return (
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
              icon={require('../../src/assets/images/message.png')}
              onPress={() => navigation.navigate('Notifications')}
            />
          ),
          headerTitle: () => <Header />,
          headerLeft: () => (
            <HeaderIcon
              label="Search"
              icon={require('../../src/assets/images/search.png')}
              onPress={() => navigation.navigate('Search')}
            />
          ),
          // tabBarIconStyle: styles.tabBarStyle,
          tabBarStyle: styles.tabBarStyle,
          tabBarIcon: ({focused, color}) => getIcon({focused, color, route}),
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
  );
}

const styles = StyleSheet.create({
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
