import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LocationListScreen from './src/screens/LocationListScreen';
import DetailScreen from './src/screens/DetailScreen';

const navigator = createStackNavigator(
  { 
    Locations: LocationListScreen,
    Detail: DetailScreen
  }, 
  {
    initialRouteName: 'Locations',
    defaultNavigationOptions: {
      title: "iX Weather"
    },
    headerMode: 'float'
  }
);

export default createAppContainer(navigator);