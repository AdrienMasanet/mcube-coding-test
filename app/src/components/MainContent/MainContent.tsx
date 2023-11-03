import { Route, Routes } from "react-router-dom";

import routes from "../../routes";
import styles from "./MainContent.module.css";

const MainContent = () => {
  return (
    <div className={styles.container}>
      <Routes>
        {routes.map((route) => (
          <Route path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  );
};

export default MainContent;
