import createDataContext from './createDataContext';
import AsyncStorage from '@react-native-community/async-storage';

// Provides global state of Search History to arbitrary app components, as well as an
// interface for persisting to / retreiving them from disk.

// The history is saved as a serialized JSON array using AsyncStore.

// I would like to have used Redux + Persist, SQLite, or another persistence solution here,
// but they would probably have been overkill. AsyncStorage works fine for this application.


// Take an action object and modify the state based on its type and payload
const searchesReducer = (state, action) => {
  switch (action.type) {
    case 'get_searches':
      return action.payload;
    case 'add_search':
      return [...state, action.payload];
    case 'delete_search':
      return [];
    default:
      return state;
  }
};


// Deserialize the Search history from storage and update the state
const getSearches = dispatch => {
  return async () => {
    const res = await AsyncStorage.getItem('@searchesStore');
    const result = JSON.parse(res);
    
    dispatch({
      type: 'get_searches',
      payload: result,
    });
  };
};


// Serialize a new search to storage and update the state
const addSearch = dispatch => {
  return async (term, timestamp, callback) => {
    
    // Check if search history exists. If so, deserialize it so we can add on to it.
    const existingSearches = await AsyncStorage.getItem('@searchesStore');
    let newSearches = JSON.parse(existingSearches);
    if (!existingSearches) {
      newSearches = [];
    }
    newSearches.push({term, timestamp});
    await AsyncStorage.setItem('@searchesStore', JSON.stringify(newSearches))
   
    dispatch({type: 'add_search', payload: {term, timestamp}});
    if (callback) callback();
  };
};


// 
const deleteSearch = dispatch => {
  return async () => {
    await AsyncStorage.removeItem('@searchesStore');
    
    dispatch({type: 'delete_search', payload: {}});
  };
};

// Export the bound functions along with the Context to allow other components to 
// interact with the state.
export const {Context, Provider} = createDataContext(
  searchesReducer,
  {addSearch, deleteSearch, getSearches},
  [],
);
