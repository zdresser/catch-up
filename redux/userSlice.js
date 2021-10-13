import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export const loginAsync = createAsyncThunk(
  'user/loginAsync',
  async (user) => {
    const response = await axios.post('http://192.168.4.62:5000/auth/login', user);
   
    const data = {
      authenticated: true,
      username: response.data.username || 'XXX',
      groups: response.data.groups
    }
    return {data}
  }
)

const userSlice = createSlice({
  name: "user",
  initialState: {
    authenticated: false,
    username: null,
    groups: []
  },
  reducers: {},
  extraReducers: {
    [loginAsync.fulfilled]: (state, action) => {
      return action.payload.data
    }
  }
})

export default userSlice.reducer