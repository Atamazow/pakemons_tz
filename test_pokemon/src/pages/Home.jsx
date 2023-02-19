import React, { useEffect, useMemo, useState } from "react";
import { fetchPokemons } from "../redux/slices/pokemoneSlice";
import { useDispatch, useSelector } from "react-redux";
import Pokemon from "../components/Pokemon";
import GraphicArts from "../components/GraphicArts";
import { Select } from "antd";
import {NavLink} from "react-router-dom";

const Home = () => {
  const [value, setValue] = useState("Без фильтра");

  const pokemonItems = useSelector((state) => state.pokemon.items);
  const token = useSelector((state) => state.auth.token);
  const types = useSelector(state => state.pokemon.types)

  console.log(types)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPokemons({ limit: token ? 9 : 10, offset: token ? 10 : 0 }));
  }, [token]);
  const pokemons = useMemo(() =>{
    return pokemonItems?.filter(({types}) => value == 'Без фильтра' || types.includes(value) )
  }, [pokemonItems,types,value])
  return (
    <>
      <NavLink style={{fontSize:24, color: 'gray', textDecoration: "none"}} to="/login"> Войти</NavLink>
      <div style={{ display: "flex" }}>
        <ul style={{ display: "flex", flexWrap: "wrap", listStyle: "none" }}>
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
            options={types.map(type => ({label:type, value:type}))}
          />
        </div>
      </div>
      <GraphicArts  pokemons={pokemons} />
    </>
  );
};

export default Home;
