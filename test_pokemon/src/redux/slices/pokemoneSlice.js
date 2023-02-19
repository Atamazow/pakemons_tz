import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: false,
  types: [],
};

export const fetchPokemons = createAsyncThunk(
  "pokemon/fetchPokemons",
  async ({ limit, offset }, thunkAPI) => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
    );
    const { results } = await response.json();
    const promisesArray = results.map(({ url }) => {
      return fetch(url).then((response) => response.json());
    });
    const result = await Promise.all(promisesArray);

    return result.map(({ id, name, sprites, types, order }) => ({
      id,
      name,
      url: sprites.back_default,
      types: types.map(({ type }) => type.name),
      order,
    }));
  }
);

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    // getPokemons: (state,action) => {
    //     state.items = action.payload
    //     console.log(action.payload)
    // }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPokemons.fulfilled, (state, action) => {
      state.items = action.payload;
      state.types = [
        ...new Set(
          action.payload.flatMap(({ types }) => types.map((type) => type))
        ),
      ];
    });
  },
});

// export const {  } = pokemonSlice.actions

export default pokemonSlice.reducer;
