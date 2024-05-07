import style from "./Detail.module.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getPokemonDetail } from "../../redux/action";

function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPokemonDetail(id));
  }, [dispatch, id]);

  const state = useSelector((state) => state.detail);
  const pokemon = state;

  return (
    <div className={style.container}>
      
        <h1 className={style.name}>{pokemon?.name}</h1>
        <img src={pokemon?.image} alt={pokemon?.name} className={style.image} />
        <div className={style.stats}>
          <p>id={pokemon?.id}</p>
          <p>height={pokemon?.height}</p>
          <p>weight={pokemon?.weight}</p>
          <p>hp={pokemon?.hp}</p>
          <p>attack={pokemon?.attack}</p>
          <p>defense={pokemon?.defense}</p>
          <p>speed={pokemon?.speed}</p>
          <div className={style.type}>
            {pokemon?.types &&
              pokemon.types.map((type, index) => (
                <span key={index} className={style[type]}>
                  {type}
                </span>
              ))}
          </div>
        </div>
      
    </div>
  );
}

export default Detail;
