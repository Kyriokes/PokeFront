import style from "./Card.module.css";
import { getPokemonDetail } from "../../../redux/action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Card({ id, name, types, image }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const handleDetailClick = () => {
    dispatch(getPokemonDetail(id));
    navigate(`/detail/${id}`);
  };

  return (
    <div className={style.container} onClick={handleDetailClick}>
      <h1 className={style.name}>{name}</h1>
      <img src={image} alt={name} className={style.image} />
      <div className={style.stats}>
        <div className={style.type}>
          {types.map((type, index) => (
            <span key={index} className={style[type]}>
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Card;


