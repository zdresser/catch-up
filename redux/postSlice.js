import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import socket from '../socket-connect'
// import store from './store'

// socket.on('newComment', comment => {
//   store.dispatch(addComment(comment))
// })


export const getPostAsync = createAsyncThunk(
  'post/loadPostAsync',
  async (post) => {
    const response = await axios.get(`http://192.168.4.62:5000/api/posts/${post}`)
    const data = response.data
    return { data }
  }
)

export const editPost = createAsyncThunk(
  'post/editPost',
  async (editPostObj) => {
    const response = await axios.put(`http://192.168.4.62:5000/api/posts/${editPostObj.post}`, editPostObj)
    const data = response.data;
    return { data }
  }
)

export const addComment = createAsyncThunk(
  'post/addComment',
  async (addCommentObj) => {
    const response = await axios.post(`http://192.168.4.62:5000/api/posts/${addCommentObj.post}/comments`, addCommentObj)
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
  reducers: {},
  extraReducers: {
    [getPostAsync.fulfilled]: (state, action) => {
      return action.payload.data
    },

    [editPost.fulfilled]: (state, action) => {
      //todo
    },
    [addComment.fulfilled]: (state, action) => {
      state.comments.push(action.payload.data)
    }
  }
})

export default postSlice.reducer