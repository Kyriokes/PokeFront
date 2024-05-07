import style from "./Nav.module.css";
import { NavLink } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

function Nav() {
  return (
    <div className={style.container}>
      <SearchBar/>
      <NavLink to="/home" className={style.link}>Home</NavLink>
      <NavLink to="/form" className={style.link}>Create Pokemon</NavLink>
    </div>
  );
}

export default Nav;
