import { createSlice } from "@reduxjs/toolkit";

const initialFavoritesFlights = [];

const favoritesFlightsSlice = createSlice({
  name: "favoritesFlights",
  initialState: { initialFavoritesFlights },
  reducers: {
      setFavoritesFlights(state, action){
        state = [...state, action.payload]
      }
    },
  },
);

export const favoritesFlightsActions = favoritesFlightsSlice.actions;

export default favoritesFlightsSlice;
