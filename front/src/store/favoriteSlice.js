import { createSlice } from "@reduxjs/toolkit";
import { getItemFromLocalStorage, setItemToLocalStorage } from "../helpers/localStorageFunc";
import { doFetch } from "../helpers/useFetch";

const initialFavorites = getItemFromLocalStorage("favorites") || [];

const favoriteSlice = createSlice({
    name: "favorite",
    initialState: initialFavorites,
    reducers: {
        toggleFavorite(state, action){
            const isExist = state.find((favorite) => favorite === action.payload.flight._id);

            const removeFromFavorite = state.filter((favorite) => favorite !== action.payload.flight._id);
            const addToFavorite = [...state, action.payload.flight._id]
            state =  isExist ? removeFromFavorite : addToFavorite;
            const favoritesToSave = state.map((stat) => stat);
            doFetch(`http://localhost:5000/users/${action.payload.user.user._id}`, {favorites: state}, "PATCH");
            setItemToLocalStorage("favorites", favoritesToSave)
            return state
        },
        newFavorites(state, action){
            state = action.payload
        }
    },
  },
);

export const favoriteActions = favoriteSlice.actions;

export default favoriteSlice;
