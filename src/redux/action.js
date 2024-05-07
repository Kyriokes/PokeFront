import axios from "axios";
import {
  GET_POKEMONS,
  GET_POKEMON_DETAIL,
  GET_TYPES,
  POST_POKEMON,
  SET_PAGE,
  SET_TOTAL_PAGES,
} from "./action-type";

const host = "https://worldwide-shannon-kyriokes-ccf9e8a1.koyeb.app"
//const host = "http://localhost:3001"

export const getPokemons = () => {
  return async function (dispatch, getState) {
    const apiPokemon = await axios.get(`${host}/pokemon/`);
    const pokemon = apiPokemon.data;
    dispatch({ type: GET_POKEMONS, payload: pokemon });
    const totalItems = pokemon.length;
    const itemsPerPage = getState().pagination.itemsPerPage;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    dispatch({ type: SET_TOTAL_PAGES, payload: totalPages });
  };
};

export const getPokemonDetail = (id) => {
  return async (dispatch) => {
    const response = await axios.get(`${host}/pokemon/${id}`);
    const pokemon = response.data;
    dispatch({ type: GET_POKEMON_DETAIL, payload: pokemon });
  };
};

export const getTypes = () => {
  return async (dispatch) => {
    const response = await axios(`${host}/type`);
    const types = response.data;
    dispatch({ type: GET_TYPES, payload: types });
  };
};

export const createPokemon = (form) => {
  return async (dispatch) => {
    const response = await axios.post(`${host}/pokemon`, form);
    const newPokemon = response.data;
    dispatch({ type: POST_POKEMON, payload: newPokemon });
  };
};

export const setPage = (page) => ({
  type: SET_PAGE,
  payload: page,
});


