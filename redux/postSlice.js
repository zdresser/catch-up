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



const postSlice = createSlice({
  name: "post",
  initialState: {
    comments: [],
    text: ""
  },
  reducers: {},
  extraReducers: {
    [getPostAsync.fulfilled]: (state, action) => {
      return action.payload.data
    },
    
  }
})

export default postSlice.reducer