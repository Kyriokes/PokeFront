import Cards from "./Cards/Cards";
import style from "./Home.module.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPokemons } from "../../redux/action";

function Home() {

const dispatch = useDispatch();

  useEffect(() => {
  dispatch(getPokemons());  
  }, [dispatch]);

  return (
    <div className={style.container}>
      <h1 className={style.home}>Home</h1>
      <Cards></Cards>
    </div>
  );
}

export default Home;
