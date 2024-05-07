import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import Card from "../Card/Card";
import Pagination from "../../Pagination/Pagination";
import { setPage, getTypes } from "../../../redux/action";
import style from "./Cards.module.css";

const Cards = () => {
  const types = useSelector((state) => state.types);
  const pokemons = useSelector((state) => state.pokemons);
  const pagination = useSelector((state) => state.pagination);
  const [selectedType, setSelectedType] = useState("");
  const [pokemonType, setPokemonType] = useState("");
  const [order, setOrder] = useState("");

  const dispatch = useDispatch();
  const { thisPage, itemsPerPage } = pagination;

  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setPage(1));
  }, [selectedType, pokemonType, dispatch]);

  let pokeCopy = pokemons instanceof Array ? [...pokemons] : [];

  switch (pokemonType) {
    case "API":
      pokeCopy = pokeCopy.filter((poke) => typeof poke.id === "number");
      break;
    case "DB":
      pokeCopy = pokeCopy.filter((poke) => typeof poke.id === "string");
      break;
    default:
      break;
  }

  const filteredPokemons = selectedType
    ? pokeCopy.filter((poke) => poke.types.includes(selectedType))
    : pokeCopy;

  const orderedPokemons = filteredPokemons.slice().sort((a, b) => {
    switch (order) {
      case "asc":
        return a.name.localeCompare(b.name);
      case "desc":
        return b.name.localeCompare(a.name);
      case "maxAttack":
        return b.attack - a.attack;
      case "minAttack":
        return a.attack - b.attack;
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(orderedPokemons.length / itemsPerPage);

  const startIndex = (thisPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const thisPagePokemons = orderedPokemons.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    dispatch(setPage(page));
  };

  const handleChange = (event) => {
    setPokemonType(event.target.value);
  };

  const handleChangeType = (event) => {
    setSelectedType(event.target.value);
  };

  const handleOrderChange = (event) => {
    const selectedOrder = event.target.value;

    switch (selectedOrder) {
      case "A":
        setOrder("asc");
        break;
      case "Z":
        setOrder("desc");
        break;
      case "MAX":
        setOrder("maxAttack");
        break;
      case "MIN":
        setOrder("minAttack");
        break;
      default:
        setOrder("");
        break;
    }
  };

  return (
    <div className={style.container}>
      <div className={style.filters}>
        <select className={style.filter} onChange={handleOrderChange}>
          <option value="default">Default</option>
          <option value="A">A-Z Abc</option>
          <option value="Z">Z-A Abc</option>
          <option value="MAX">Max to Min Attack</option>
          <option value="MIN">Min to Max Attack</option>
        </select>

        <select
          className={style.filter}
          value={pokemonType}
          onChange={handleChange}
        >
          <option value="ALL">All</option>
          <option value="API">Vanilla</option>
          <option value="DB">User created</option>
        </select>

        {types && types.length > 0 && (
          <select
            className={style.filter}
            value={selectedType}
            onChange={handleChangeType}
          >
            <option value="">All Types</option>
            {types.map((type) => (
              <option value={type.name} key={type.name}>
                {type.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className={style.pokemon}>
        {thisPagePokemons && thisPagePokemons.length > 0 ? (
          thisPagePokemons.map((poke) => {
            return (
              <Card
                key={poke.id}
                id={poke.id}
                name={poke.name}
                image={poke.image}
                height={poke.height}
                weight={poke.weight}
                hp={poke.hp}
                attack={poke.attack}
                defense={poke.defense}
                speed={poke.speed}
                types={poke.types}
              />
            );
          })
        ) : (
          <div>No pokemons found.</div>
        )}
      </div>

      {!pathname.includes("detail") && (
        <div className={style.pagination}>
          <Pagination
            thisPage={thisPage}
            totalPages={totalPages}
            pageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default Cards;
