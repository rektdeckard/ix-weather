import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LocationListScreen from './src/screens/LocationListScreen';
import DetailScreen from './src/screens/DetailScreen';

/**
 * StackNavigator for toolbar and up/back support
 */
const navigator = createStackNavigator(
  { 
    Locations: LocationListScreen,
    Detail: DetailScreen
  }, 
  {
    // Entrypoint to the App
    initialRouteName: 'Locations',
    defaultNavigationOptions: {
      title: "iX Weather"
    },
    headerMode: 'float'
  }
);

export default createAppContainer(navigator);