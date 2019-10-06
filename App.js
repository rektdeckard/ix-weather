import React from "react";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Provider as FavoritesProvider } from './src/context/FavoritesContext';
import { Provider as SearchesProvider } from './src/context/SearchesContext';
import LocationListScreen from './src/screens/LocationListScreen';
import DetailScreen from './src/screens/DetailScreen';
import HistoryScreen from "./src/screens/HistoryScreen";

/**
 * StackNavigator for toolbar and up/back support
 */
const navigator = createStackNavigator(
  { 
    Locations: LocationListScreen,
    Detail: DetailScreen,
    History: HistoryScreen
  }, 
  {
    // Entrypoint to the App
    initialRouteName: 'Locations',
    defaultNavigationOptions: {
      title: "iX Weather",
      headerStyle: {
        backgroundColor: '#00697D',
      },
      headerTintColor: 'white',
    },
    headerMode: 'float'
  }
);

const App = createAppContainer(navigator);

export default () => {
  return (
    // Context wrappers for state data
    <FavoritesProvider>
      <SearchesProvider>
        <App />
      </SearchesProvider>
    </FavoritesProvider>
  );
}