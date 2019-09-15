import createDataContext from "./createDataContext";

const FavoritesReducer = (state, action) => {
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
    /**
     * @todo PERSISTENCE
     */
    const favorites = await null;
    dispatch({
      type: "get_favorites",
      payload: favorites
    });
  };
};

const addFavorite = dispatch => {
  return async (woeid, callback) => {
    /**
     * @todo PERSISTENCE
     */
    await null;
    if (callback) callback();
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

export const { Context, Provider } = createDataContext(
  FavoritesReducer,
  { addFavorite, deleteFavorite, getFavorites },
  []
);