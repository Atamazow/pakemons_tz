import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Select } from "antd";
import Pokemon from "../../components/Pokemon/Pokemon";
import GraphicArts from "../../components/GraphicArts/GraphicArts";
import { resetProfile } from "../../redux/authorization/slice";
import { selectPokemonItems, selectToken } from "../../redux/authorization/selectors";
import { selectPokemonTypes } from "../../redux/pokemons/selectors";
import { fetchPokemons } from "../../redux/pokemons/thunks";
import styles from './Home.module.css'

const Home = () => {
  const [value, setValue] = useState('');

  const pokemonItems = useSelector(selectPokemonItems);
  const token = useSelector(selectToken);
  const types = useSelector(selectPokemonTypes);
  const dispatch = useDispatch();
  const handleRemoveTokenClick = useCallback(() => {
    dispatch(resetProfile())
  },[])

  const handleChange = (value) => {
    setValue(value)
  }

  useEffect(() => {
    dispatch(fetchPokemons({ limit: token ? 9 : 10, offset: token ? 10 : 0 }));
  }, [token]);
  const pokemons = useMemo(() => {
    return pokemonItems?.filter(
      ({ types }) => !value || types.includes(value)
    );
  }, [pokemonItems, types, value]);
  return (
    <>
      {!token ?
        <NavLink className={styles.link} to="/login">
        Войти
      </NavLink> : <NavLink
        className={styles.link}
        to="/login"
        onClick={handleRemoveTokenClick}
      >
        выйти
      </NavLink>}
      <div className={styles.content_top}>
        <ul className={styles.pokemon_list}>
          {pokemons?.map((item) => {
            return <Pokemon key={item.id} name={item.name} url={item.url} />;
          })}
        </ul>
        <div>
          <Select
            defaultValue="Без фильтра"
            onChange={( value ) => handleChange(value)}
            value={value}
            className={styles.select}
            options={types}
          />
        </div>
      </div>
      <GraphicArts pokemons={pokemons} />
    </>
  );
};

export default Home;
