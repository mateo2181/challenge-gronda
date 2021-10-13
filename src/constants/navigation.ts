import {NavigationTab} from '../types';

const navigationTabs: {[key: string]: NavigationTab} = {
  Explore: {
    name: 'Home',
    icon: 'home-outline',
    iconSelected: 'home',
  },
  Create: {
    name: 'Create',
    icon: 'add-circle',
    iconSelected: 'add-circle',
  },
  Profile: {
    name: 'Profile',
    icon: 'person-outline',
    iconSelected: 'person',
  },
};

export default navigationTabs;
