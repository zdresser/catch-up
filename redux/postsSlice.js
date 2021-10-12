import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios' 

const postsSlice = createSlice({
  name: "post",
  initialState: [],
  reducers: {}
})

export default postsSlice.reducer