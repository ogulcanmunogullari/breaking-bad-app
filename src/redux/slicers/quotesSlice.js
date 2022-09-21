import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const getQuotes = createAsyncThunk("quotes/getQuotes", async () => {
  const response = await axios(
    `${process.env.REACT_APP_API_BASE_ENDPOINT}/quotes`,
  )
  return response.data
})
export const getCharacterQuotes = createAsyncThunk(
  "quotes/getCharacterQuotes",
  async (id) => {
    const response = await axios(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/quote?author=${id}`,
    )
    return response.data
  },
)

const quotesSlice = createSlice({
  name: "quotes",
  initialState: {
    quotes: [],
    characterQuotes: [],
    pending: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [getQuotes.pending]: (state) => {
      state.pending = true
    },
    [getQuotes.fulfilled]: (state, action) => {
      state.quotes = action.payload
      state.pending = false
    },
    [getQuotes.rejected]: (state, action) => {
      state.pending = false
      state.error = action.error.message
    },
    [getCharacterQuotes.pending]: (state) => {
      state.pending = true
    },
    [getCharacterQuotes.fulfilled]: (state, action) => {
      state.characterQuotes = action.payload
      state.pending = false
    },
    [getCharacterQuotes.rejected]: (state, action) => {
      state.pending = false
      state.error = action.error.message
    },
  },
})

export default quotesSlice.reducer
