import * as React from 'react';
import mockData from '../src/api/mocks/creations.json';

// import react-testing methods
import {render} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import App from '../App';

describe('Testing Creations List in Explore section', () => {
  // let navigation: any, route: any;
  jest.useFakeTimers();

  test('Creations are rendered', async () => {
    const component = (
      <NavigationContainer>
        <App />
        {/* <Creations navigation={navigation} route={route} /> */}
      </NavigationContainer>
    );
    // const component = <App />;

    const {getByTestId} = render(component);
    const creations = getByTestId('creationsList');
    expect(creations.children.length).toBe(mockData.data.length);
  });
});
