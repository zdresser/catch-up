import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk'
import postsReducer from './postSlice'
import userReducer from './userSlice'
import groupReducer from './groupSlice'

const reducer = combineReducers({
  posts: postsReducer,
  user: userReducer,
  group: groupReducer
})

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false,
  }) 
})

export default store;