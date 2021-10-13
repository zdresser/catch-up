import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios' 

export const getGroupAsync = createAsyncThunk(
  'post/loadGroupAsync',
  async (group) => {
    const response = await axios.get(`http://192.168.4.62:5000/api/groups/${group}`)
    const data = response.data
    return{data}
  }
)
const groupSlice = createSlice({
  name: "group",
  initialState: {
    posts: []
  },
  reducers: {},
  extraReducers: {
    [getGroupAsync.fulfilled]: (state, action) => {
      return action.payload.data
    }
  }
})

export default groupSlice.reducer