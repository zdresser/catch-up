import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'


export const getPostAsync = createAsyncThunk(
  'post/loadPostAsync',
  async (post) => {
    let token = await SecureStore.getItemAsync('token');
    
    const config = {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }

    const response = await axios.get(`http://192.168.4.62:5000/api/posts/${post}`, config)
    const data = response.data
    return { data }
  }
)

export const editPost = createAsyncThunk(
  'post/editPost',
  async (editPostObj) => {
    let token = await SecureStore.getItemAsync('token');
    
    const config = {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }

    const response = await axios.put(`http://192.168.4.62:5000/api/posts/${editPostObj.post}`, editPostObj, config)
    const data = response.data;
    return { data }
  }
)

export const addComment = createAsyncThunk(
  'post/addComment',
  async (addCommentObj) => {
    let token = await SecureStore.getItemAsync('token');
    
    const config = {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }

    const response = await axios.post(`http://192.168.4.62:5000/api/posts/${addCommentObj.post}/comments`, addCommentObj, config)
    const data = response.data;
    return {data}
  }
)

const postSlice = createSlice({
  name: "post",
  initialState: {
    comments: [],
    text: "",
    author: {},
    
  },
  reducers: {
    addCommentFromSocket(state, action) {
      
      state.comments.push(action.payload)
    }
  },
  extraReducers: {
    [getPostAsync.fulfilled]: (state, action) => {
      return action.payload.data
    },

    [editPost.fulfilled]: (state, action) => {
      //todo
    },
    [addComment.fulfilled]: (state, action) => {
     
    }
  }
})
export const {addCommentFromSocket} = postSlice.actions
export default postSlice.reducer