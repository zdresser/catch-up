import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export const loginAsync = createAsyncThunk(
  'user/loginAsync',
  async (user) => {
    const response = await axios.post('http://192.168.4.62:5000/auth/login', user);
   
    const data = {
      authenticated: true,
      username: response.data.username || 'ZD',
      groups: response.data.groups,
      _id: response.data._id
    }
    return {data}
  }
)

export const addGroupAsync = createAsyncThunk(
  'user/addGroupAsync',
  async (newGroupObj) => {
    const response = await axios.post('http://192.168.4.62:5000/api/groups', newGroupObj)

    const data = response.data
    return {data}
  }
)

const userSlice = createSlice({
  name: "user",
  initialState: {
    authenticated: false,
    username: null,
    groups: [],
    
  },
  reducers: {},
  extraReducers: {
    [loginAsync.fulfilled]: (state, action) => {
      return action.payload.data
    },
    [addGroupAsync.fulfilled]: (state, action) => {
      state.groups.push(action.payload.data)
    }
  }
})

export default userSlice.reducer