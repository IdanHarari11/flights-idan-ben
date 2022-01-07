import { createSlice } from "@reduxjs/toolkit";
import { getItemFromLocalStorage, setItemToLocalStorage, removeItemFromLocalStorage } from "../helpers/localStorageFunc";

const initialToken = getItemFromLocalStorage("token");
const initialUser = getItemFromLocalStorage("user") || {};

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: initialUser,
    token: initialToken,
  },
  reducers: {
    saveUser(state, action) {
      if (!action.payload) {
        state.token = null;
        state.user = {};
        removeItemFromLocalStorage("token");
        removeItemFromLocalStorage("user");
        removeItemFromLocalStorage("favorites");
        return;
      }
        state.user = action.payload;
        state.token = action.payload.tokens[0].token;
        setItemToLocalStorage("token", action.payload.tokens[0].token);
        setItemToLocalStorage("user", action.payload);
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
