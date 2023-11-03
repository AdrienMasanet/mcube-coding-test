import { useNavigate } from "react-router-dom";

import styles from "./BackButton.module.css";
const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container} onClick={() => navigate(-1)}>
      Go back
    </div>
  );
};

export default BackButton;
