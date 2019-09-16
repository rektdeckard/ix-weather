import { useEffect, useState } from "react";
import { AsyncStorage } from 'react-native';

/**
 * A niave solution for persisting recent searches and favorited locations on the device.
 * NOT EFFECTIVE for production use -- to slow, and serialization often fails??
 */
export default () => {
  const [favorites, setFavorites] = useState([])
  const [searches, setSearches] = useState([])
  const [error, setError] = useState(null);

  getFavorites = async () => {
    try {
      const value = await AsyncStorage.getItem('@favoriteStore');
      if (value !== null) {
        setFavorites(JSON.parse(value));
      }
    } catch(e) {
      setError(e);
      console.log(e);
    }
  };

  storeFavorites = async newFavorites => {
    try {
      await AsyncStorage.mergeItem('@favoriteStore', JSON.stringify(newFavorites));
    } catch (e) {
      setError(e);
      console.log(e);
    }
  }
  
  getSearches = async () => {
    try {
      const value = await AsyncStorage.getItem('@searchStore');
      if (value !== null) {
        setSearches(JSON.parse(value));
      }
    } catch(e) {
      setError(e);
      console.log(e);
    }
  };

  storeSearches = async newSearches => {
    try {
      await AsyncStorage.mergeItem('@searchStore', JSON.stringify(newSearches));
    } catch (e) {
      setError(e);
      console.log(e);
    }
  }

  
  useEffect(() => {
    AsyncStorage.clear();
    getFavorites();
    getSearches();
  }, []);

  return [favorites, storeFavorites, searches, storeSearches];
};
