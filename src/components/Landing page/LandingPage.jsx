import style from "./LandingPage.module.css";
import { NavLink } from "react-router-dom";
import pokeBanner from "../../img/pokeBannerGimp.png"

function LandingPage() {
  return (
    <div className={style.container}>
      <div className={style.childtobody}>
        <img className={style.img} src={pokeBanner} width="250" alt="" />
        <NavLink to="/home" className={style.poke_box}>
          <div className={style.pokeball}>
            <div className={style.pokeball__button}></div>
          </div>
          </NavLink>
        <p className={style.clickMe}>Click on the pokéball to start!</p>
      </div>
    </div>
  );
}

export default LandingPage;
