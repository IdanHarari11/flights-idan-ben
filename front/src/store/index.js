import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from "./favoriteSlice";
import userReducer from "./userSlice";
import favoritesFlightsReducer from "./favorite-flightsSlice";


const store = configureStore({
  reducer: {
    favorite: favoriteReducer.reducer,
    user: userReducer.reducer,
    favoritesFlights: favoritesFlightsReducer.reducer,
  },
});

export default store;
