import { configureStore } from "@reduxjs/toolkit";
import pokemonSlice from "./slices/pokemoneSlice";
import authSlice from "./slices/applicationSlice";

const store = configureStore({
  reducer: {
    pokemon: pokemonSlice,
    auth: authSlice,
  },
});

export default store;
