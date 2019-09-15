import createDataContext from "./createDataContext";

const searchesReducer = (state, action) => {
  switch (action.type) {
    case "get_searches":
      return action.payload;
    case "delete_search":
      return state.filter(favorite => favorite.woeid !== action.payload);
    default:
      return state;
  }
};

const getSearches = dispatch => {
  return async () => {
    /**
     * @todo PERSISTENCE
     */
    const searches = await null;
    dispatch({
      type: "get_searches",
      payload: searches
    });
  };
};

const addSearch = dispatch => {
  return async (term, timestamp, callback) => {
    /**
     * @todo PERSISTENCE
     */
    await null;
    if (callback) callback();
  };
};

const deleteSearch = dispatch => {
  return async (term) => {
    /**
     * @todo PERSISTENCE
     */
    await null;
    dispatch({ type: "delete_search", payload: term });
  };
};

export const { Context, Provider } = createDataContext(
  searchesReducer,
  { addSearch, deleteSearch, getSearches },
  []
);