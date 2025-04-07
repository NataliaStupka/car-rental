import { NavLink } from "react-router-dom";
import sprite from "../../assets/sprite.svg";
import s from "./Logo.module.css";

const Logo = () => {
  return (
    <NavLink to="/">
      <svg className={s.svg}>
        <use href={`${sprite}#icon-Logo`} />
      </svg>
    </NavLink>
  );
};

export default Logo;
