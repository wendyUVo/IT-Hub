import React, { createContext, useReducer, useContext } from "react";
import {
  SET_CURRENT_POST,
  REMOVE_POST,
  UPDATE_POSTS,
  ADD_POST,
  ADD_FAVORITE,
  UPDATE_FAVORITES,
  REMOVE_FAVORITE,
  LOADING,
} from "./actions";

const StoreContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case SET_CURRENT_POST:
      return { ...state, currentPost: action.post, loading: false };

    case UPDATE_POSTS:
      return { ...state, posts: action.posts, loading: false };

    case ADD_POST:
      return { ...state, posts: [action.post, ...state.posts], loading: false };

    case REMOVE_POST:
      return {
        ...state,
        posts: state.posts.filer((post) => post._id !== action._id),
      };

    case ADD_FAVORITE:
      return {
        ...state,
        favorites: [action.post, ...state.favorites],
        loading: false,
      };

    case UPDATE_FAVORITES:
      return {
        ...state,
        favorites: [...action.favorites],
        loading: false,
      };

    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter((post) => post._id !== action._id),
      };

    case LOADING:
      return { ...state, loading: true };

    default:
      return state;
  }
};

const initialState = {
  posts: [],
  currentPost: {
    _id: 0,
    title: "",
    body: "",
    author: "",
  },
  favorites: [],
  loading: false,
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => useContext(StoreContext);
