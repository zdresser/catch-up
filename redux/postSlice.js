import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios' 

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

const postSlice = createSlice({
  name: "post",
  initialState: {
    comments: [],
    text: "",
    author: "",
    
  },
  reducers: {},
  extraReducers: {
    [getPostAsync.fulfilled]: (state, action) => {
      return action.payload.data
    },

    [editPost.fulfilled]: (state, action) => {
      //todo
    }    
  }
})

export default postSlice.reducer