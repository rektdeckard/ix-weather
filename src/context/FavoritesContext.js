import createDataContext from "./createDataContext";
import AsyncStorage from '@react-native-community/async-storage';

const favoritesReducer = (state, action) => {
  switch (action.type) {
    case "get_favorites":
      return action.payload;
    case "delete_favorite":
      return state.filter(favorite => favorite.woeid !== action.payload);
    default:
      return state;
  }
};

const getFavorites = dispatch => {
  return async () => {
    try {
      const value = await AsyncStorage.getItem("@favoriteStore");
      if (value !== null) {
        console.log(JSON.parse(value));
        dispatch({
          type: "get_favorites",
          payload: JSON.parse(value)
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
};

const addFavorite = () => {
  return async (title, woeid, callback) => {
    try {
      await AsyncStorage.mergeItem(
        "@favoriteStore",
        JSON.stringify({title, woeid})
      );
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
    dispatch({ type: "delete_favorite", payload: woeid });
  };
};

// const isFavorite = () => {
  // return async id => {
  //   JSON.parse(await AsyncStorage.getItem("@favoriteStore", (error, result) => {
  //     if (error) {
  //       console.log(error);
  //       return false;
  //     }
  //     if (result) {
  //       const res = JSON.parse(result);
  //       // dispatch({ type: "is_favorite", payload: result })
  //       console.log(res);
  //       console.log(res.woeid == id);
  //       return (res.woeid == id);
  //     }
  //   })) == id;
  // }


export const { Context, Provider } = createDataContext(
  favoritesReducer,
  { addFavorite, deleteFavorite, getFavorites },
  []
);
