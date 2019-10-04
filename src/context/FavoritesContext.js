import createDataContext from './createDataContext';
import AsyncStorage from '@react-native-community/async-storage';

const favoritesReducer = (state, action) => {
  switch (action.type) {
    case 'get_favorites':
      return action.payload;
    case 'add_favorite':
      return [...state, action.payload];
    case 'delete_favorite':
      return state.filter(favorite => favorite.woeid !== action.payload);
    default:
      return state;
  }
};

const getFavorites = dispatch => {
  return async () => {
    try {
      const value = await AsyncStorage.getItem('@favoriteStore');
      if (value !== null) {
        console.log(value);
        dispatch({
          type: 'get_favorites',
          payload: JSON.parse(value),
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
};

const addFavorite = dispatch => {
  return async (title, woeid, callback) => {
    try {
      await AsyncStorage.setItem(
        '@favoriteStore',
        JSON.stringify({title, woeid}),
      );
      dispatch({
        type: 'add_favorite',
        payload: {title, woeid},
      });
      if (callback) callback();
    } catch (e) {
      console.log(e);
    }
  };
};

const deleteFavorite = dispatch => {
  return async woeid => {
    /**
     * @todo PERSISTENCE
     */
    await null;
    dispatch({type: 'delete_favorite', payload: woeid});
  };
};

export const {Context, Provider} = createDataContext(
  favoritesReducer,
  {addFavorite, deleteFavorite, getFavorites},
  [],
);
