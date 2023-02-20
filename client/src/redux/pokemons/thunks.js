import { createAsyncThunk } from "@reduxjs/toolkit";

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