import React, { useEffect, useMemo, useState } from "react";
import { fetchPokemons } from "../redux/slices/pokemoneSlice";
import { useDispatch, useSelector } from "react-redux";
import Pokemon from "../components/Pokemon";
import GraphicArts from "../components/GraphicArts";
import { Select } from "antd";
import { NavLink } from "react-router-dom";
import { resetProfile } from "../redux/slices/applicationSlice";

const Home = () => {
  const [value, setValue] = useState('');

  const pokemonItems = useSelector((state) => state.pokemon.items);
  const token = useSelector((state) => state.auth.token);
  const types = useSelector((state) => state.pokemon.types);

  const dispatch = useDispatch();
  const handleRemoveTokenClick = () => {
    dispatch(resetProfile())
  }

  useEffect(() => {
    dispatch(fetchPokemons({ limit: token ? 9 : 10, offset: token ? 10 : 0 }));
  }, [token]);
  const pokemons = useMemo(() => {
    return pokemonItems?.filter(
      ({ types }) => value == "" || types.includes(value)
    );
  }, [pokemonItems, types, value]);
  return (
    <>
      {!token ?  <NavLink
        style={{ fontSize: 24, color: "gray", textDecoration: "none" }}
        to="/login"
      >
        {" "}
        Войти
      </NavLink> :  <NavLink
        style={{ fontSize: 24, color: "gray", textDecoration: "none" }}
        to="/login"
        onClick={handleRemoveTokenClick}
      >
        {" "}
        выйти
      </NavLink>}
      <div style={{ display: "flex" }}>
        <ul className='pokemon_list' style={{ display: "flex", flexWrap: "wrap", listStyle: "none" }}>
          {pokemons?.map((item) => {
            return <Pokemon key={item.id} name={item.name} url={item.url} />;
          })}
        </ul>
        <div>
          <Select
            defaultValue="Без фильтра"
            onChange={(value) => setValue(value)}
            value={value}
            style={{
              width: 120,
            }}
            options={types}
          />
        </div>
      </div>
      <GraphicArts pokemons={pokemons} />
    </>
  );
};

export default Home;
