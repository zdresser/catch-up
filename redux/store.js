import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk'
import postsReducer from './postsSlice'
import userReducer from './userSlice'

const reducer = combineReducers({
  posts: postsReducer,
  user: userReducer
})

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false,
  }) 
})

export default store;