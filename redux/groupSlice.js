import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const getGroupAsync = createAsyncThunk(
  "post/loadGroupAsync",
  async (group) => {
    let token = await SecureStore.getItemAsync("token");

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const response = await axios.get(
      `http://192.168.4.62:5000/api/groups/${group}`,
      config
    );
    const data = response.data;
    return { data };
  }
);

export const addPostAsync = createAsyncThunk(
  "post/addPostAsync",
  async (newPostObject) => {
    let token = await SecureStore.getItemAsync("token");

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const response = await axios.post(
      `http://192.168.4.62:5000/api/groups/${newPostObject.group}/posts`,
      newPostObject,
      config
    );
    const data = response.data;
    return { data };
  }
);

export const editPostVotes = createAsyncThunk(
  "post/editPostVotes",
  async (editPostObj) => {
    let token = await SecureStore.getItemAsync("token");

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const response = await axios.put(
      `http://192.168.4.62:5000/api/posts/${editPostObj.post}`,
      editPostObj,
      config
    );
    const data = response.data;
    return { data };
  }
);

const groupSlice = createSlice({
  name: "group",
  initialState: {
    posts: [],
    createdAt: "",
  },
  reducers: {
    sortPostsByUpvotes(state, action) {
      state.posts.sort((a, b) => (a.upvotes > b.upvotes ? -1 : 1));
    },
    sortPostsByDate(state, action) {
      state.posts.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
    },
  },
  extraReducers: {
    [getGroupAsync.fulfilled]: (state, action) => {
      return action.payload.data;
    },
    [addPostAsync.fulfilled]: (state, action) => {
      state.posts.push(action.payload.data);
    },
    [editPostVotes.fulfilled]: (state, action) => {
      const updatedVotes = action.payload.data.upvotes;

      const post =
        state.posts[
          state.posts.findIndex(({ _id }) => _id === action.payload.data._id)
        ];

      post.upvotes = updatedVotes;
    },
  },
});
export const { sortPostsByUpvotes, sortPostsByDate } = groupSlice.actions;
export default groupSlice.reducer;
