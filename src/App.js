import style from "./App.module.css";
import Home from "./components/Home/Home";
import Detail from "./components/Detail/Detail";
import Form from "./components/Form/Form";
import LandingPage from "./components/Landing page/LandingPage";
import Nav from "./components/Nav/Nav";
import { Route, Routes, useLocation } from "react-router-dom";
import pokeBanner from "./img/pokeBannerGimp.png"

function App() {
  const location = useLocation();
  return (
    <div className={style.container}>
      <img className={style.img} src={pokeBanner} width="250" alt="" />
      <div className={style.link}>
        {location.pathname !== "/" && <Nav />}
        <Routes>
          <Route path="/home/" element={<Home />} />

          <Route path="/detail/:id" element={<Detail />} />

          <Route path="/form" element={<Form />} />

          <Route path="/" element={<LandingPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
