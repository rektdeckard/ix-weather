import React, { useReducer } from 'react';

/** Creates a Context object used to make 'global' state data available to arbitrary components.
 * @param reducer @todo
 * @param actions are function references for Create, Read, Update, Delete [ either a Favorite or a Search ].
 * @param initialState representing the state retrieved from db on mount
 */
export default (reducer, actions, initialState) => {
  const Context = React.createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // 
    const boundActions = {};
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }
 
    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  }

  return { Context, Provider };
};