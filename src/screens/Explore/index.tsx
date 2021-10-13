import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import ExploreHeader from './components/ExploreHeader';
import Creations from './Creations';
import Masterclasses from './Masterclasses';
import Jobs from './Jobs';
import Notifications from '../Notifications';
import Search from '../Search';
import CreationDetail from './CreationDetail';

export type ExploreStackParamList = {
  Creations: undefined;
  CreationDetail: {creationId: number};
  Masterclasses: undefined;
  Jobs: undefined;
  Notifications: undefined;
  Search: undefined;
};

const Stack = createStackNavigator();

export const routesHideHeader = ['Notifications', 'CreationDetail', 'Search'];

export default function ExploreScreen() {
  return (
    <Stack.Navigator
      initialRouteName="Creations"
      screenOptions={({route}) => ({
        header: ({navigation}) => {
          return <ExploreHeader navigation={navigation} />;
        },
        headerShown: !routesHideHeader.includes(route.name),
      })}>
      <Stack.Screen name="Creations" component={Creations} />
      <Stack.Screen
        name="CreationDetail"
        component={CreationDetail}
        options={{
          gestureEnabled: true,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen name="Masterclasses" component={Masterclasses} />
      <Stack.Screen name="Jobs" component={Jobs} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
}
