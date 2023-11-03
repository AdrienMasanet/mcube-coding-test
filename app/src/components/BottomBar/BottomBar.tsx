import { NavLink } from "react-router-dom";

import useAuthentication from "../../hooks/useAuthentication";
import routes from "../../routes";
import Route from "../../types/Route";
import styles from "./BottomBar.module.css";

const BottomBar = () => {
  const { loggedInUser } = useAuthentication();

  return (
    <div className={styles.container}>
      <nav className={styles.navlinks}>
        {routes.map((route: Route) => {
          if (!loggedInUser && route.path === "/my-library") return;
          if (route.linkText)
            return (
              <NavLink
                key={route.path}
                to={route.path}
                className={styles.navlink}
              >
                {route.linkText}
              </NavLink>
            );
        })}
      </nav>
    </div>
  );
};

export default BottomBar;
