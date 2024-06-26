import style from "./SearchBar.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const host = "https://worldwide-shannon-kyriokes-ccf9e8a1.koyeb.app"
//const host = "http://localhost:3001"

function SearchBar() {
  const navigate = useNavigate();
  const [pokemonName, setPokemonName] = useState("");

  const searchPokemon = async () => {
    try {
      const response = await axios.get(
        `${host}/pokemon?name=${pokemonName}`
      );
      const pokemon = response.data;
      const id = pokemon.id;
      navigate(`/detail/${id}`);
    } catch (error) {
      console.log("Error occurred while searching for the pokemon:", error);
    }
  };

  const handleChange = (event) => {
    setPokemonName(event.target.value.toLowerCase());
  };

  return (
    <div className={style.bar}>
      <input
        placeholder="Search a Pokemon"
        type="search"
        value={pokemonName}
        onChange={handleChange}
      />
      <button type="button" onClick={searchPokemon}>
        Search
      </button>
    </div>
  );
}
export default SearchBar;
