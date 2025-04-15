import { NavLink } from "react-router-dom";
import clsx from "clsx";
import s from "./Navigation.module.css";
import Logo from "../Logo/Logo";

// const buildLinkClass = ({ isActive }) => {
//   return clsx(s.link, isActive && s.active);
// };
const buildLinkClass = ({ isActive }) => clsx(s.link, { [s.active]: isActive });

const Navigation = () => {
  return (
    <nav className={s.nav}>
      <Logo />
      <div>
        <NavLink
          to="/"
          className={(props) => clsx(buildLinkClass(props), s.navItem)}
        >
          Home
        </NavLink>
        <NavLink
          to="/catalog"
          className={(props) => clsx(buildLinkClass(props), s.navItem)}
        >
          Catalog
        </NavLink>
        <NavLink to="/favorite" className={buildLinkClass}>
          Favorite
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;
