import { createSlice } from "@reduxjs/toolkit";
import { fetchPokemons } from "./thunks";

const initialState = {
  items: [],
  loading: false,
  types: [],
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPokemons.fulfilled, (state, action) => {
      const uniqTypes = [
        ...new Set(
          action.payload.flatMap(({ types }) => types.map((type) => type))
        ),
      ];
      state.items = action.payload;
      state.types = [
        { label: "Без фильтра", value: "" },
        ...uniqTypes.map((type) => ({ label: type, value: type })),
      ];
    });
  },
});
export default pokemonSlice.reducer;
