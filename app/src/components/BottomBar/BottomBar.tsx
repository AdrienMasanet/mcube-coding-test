import { NavLink } from "react-router-dom";

import routes from "../../routes";
import styles from "./BottomBar.module.css";

const BottomBar = () => {
  return (
    <div className={styles.container}>
      {routes.map((route) => (
        <NavLink to={route.path}>Home</NavLink>
      ))}
    </div>
  );
};

export default BottomBar;
