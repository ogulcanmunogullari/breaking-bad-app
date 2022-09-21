import { configureStore } from "@reduxjs/toolkit"
import charactersReducer from "./slicers/charactersSlice"
import quotesReducer from "./slicers/quotesSlice"
export const store = configureStore({
  reducer: {
    characters: charactersReducer,
    quotes: quotesReducer,
  },
})
