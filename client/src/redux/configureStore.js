import { configureStore } from "@reduxjs/toolkit";
import pokemonSlice from "./pokemons/slice";
import authSlice from "./authorization/slice";

const store = configureStore({
  reducer: {
    pokemon: pokemonSlice,
    auth: authSlice,
  },
});

export default store;
