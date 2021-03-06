import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const loginAsync = createAsyncThunk("user/loginAsync", async (user) => {
  const response = await axios.post(
    "http://192.168.4.62:5000/auth/login",
    user
  );

  const data = {
    authenticated: true,
    userName: response.data.userName,
    groups: response.data.groups,
    voteRecord: response.data.voteRecord,
    _id: response.data._id,
    token: response.data.token,
  };

  return { data };
});

export const signupAsync = createAsyncThunk(
  "user/signupAsync",
  async (user) => {
    const response = await axios.post(
      "http://192.168.4.62:5000/auth/signup",
      user
    );

    const data = {
      authenticated: true,
      userName: response.data.userName,
      groups: response.data.groups,
      voteRecord: response.data.voteRecord,
      _id: response.data._id,
      token: response.data.token,
    };

    return { data };
  }
);

export const addGroupAsync = createAsyncThunk(
  "user/addGroupAsync",
  async (newGroupObj) => {
    let token = await SecureStore.getItemAsync("token");

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const response = await axios.post(
      "http://192.168.4.62:5000/api/groups",
      newGroupObj,
      config
    );

    const data = response.data;
    return { data };
  }
);

export const addUserVoteAsync = createAsyncThunk(
  "user/addUserVoteAsync",
  async (addVoteObj) => {
    const response = await axios.post(
      `http://192.168.4.62:5000/api/users/${addVoteObj.user}`,
      addVoteObj
    );
    const data = response.data;
    return { data };
  }
);

export const editUserVoteAsync = createAsyncThunk(
  "user/editUserVoteAsync",
  async (editVotesObj) => {
    const response = await axios.put(
      `http://192.168.4.62:5000/api/users/${editVotesObj.user}`,
      editVotesObj
    );

    const data = response.data;
    return { data };
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    authenticated: false,
    username: null,
    groups: [],
    voteRecord: [],
    token: null,
  },
  reducers: {
    logout(state, action) {
      SecureStore.deleteItemAsync("token");
      return (state) => initialState;
    },
    loginFromSecureStore(state, action) {
      return action.payload.data;
    },
  },
  extraReducers: {
    [loginAsync.fulfilled]: (state, action) => {
      console.log(action.payload.data);
      SecureStore.setItemAsync("token", action.payload.data.token);
      SecureStore.setItemAsync("userData", JSON.stringify(action.payload.data));
      return action.payload.data;
    },
    [signupAsync.fulfilled]: (state, action) => {
      SecureStore.setItemAsync("token", action.payload.data.token);
      return action.payload.data;
    },
    [addGroupAsync.fulfilled]: (state, action) => {
      state.groups.push(action.payload.data);
    },
    [addUserVoteAsync.fulfilled]: (state, action) => {
      state.voteRecord = action.payload.data.voteRecord;
    },
    [editUserVoteAsync.fulfilled]: (state, action) => {
      state.voteRecord = action.payload.data.voteRecord;
    },
    // [loginFromSecureStore.fulfilled]: (state, action) => {
    //   return action.payload.data
    // }
  },
});

export const { logout, loginFromSecureStore } = userSlice.actions;
export default userSlice.reducer;
