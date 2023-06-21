import { NavLink } from "react-router-dom";
import styles from "./GlobalNav.module.css";
const GlobalNav = () => {
  return (
    <nav className={styles.container}>
      <NavLink to="/" end>
        Dashboard
      </NavLink>
      <NavLink to="/add">Add User</NavLink>
    </nav>
  );
};
export default GlobalNav;
