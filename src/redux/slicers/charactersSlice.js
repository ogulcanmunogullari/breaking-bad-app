import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const getCharacters = createAsyncThunk(
  "characters/getCharacters",
  async (page) => {
    const response = await axios(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/characters?limit=10&offset=${
        page * 10
      }`,
    )
    const characters = await response.data
    return characters
  },
)

export const charactersSlice = createSlice({
  name: "characters",
  initialState: {
    characters: [],
    pending: false,
    error: null,
    page: 0,
  },
  reducers: {
    changePage: (state, action) => {
      state.page = action.payload
    },
    pageRefresh: (state) => {
      state.page = 0
    },
  },
  extraReducers: {
    [getCharacters.pending]: (state) => {
      state.pending = true
    },
    [getCharacters.fulfilled]: (state, action) => {
      state.characters = action.payload
      state.pending = false
    },
    [getCharacters.rejected]: (state, action) => {
      state.pending = false
      state.error = action.error.message
    },
  },
})

export default charactersSlice.reducer
export const { changePage, pageRefresh } = charactersSlice.actions
