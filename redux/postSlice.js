import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios' 

export const loadPostAsync = createAsyncThunk(
  'post/loadPostAsync',
  async (group) => {
  
  }
)
const postsSlice = createSlice({
  name: "post",
  initialState: [],
  reducers: {}
})

export default postsSlice.reducer