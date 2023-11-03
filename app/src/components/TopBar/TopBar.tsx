import styles from "./TopBar.module.css";
import UserSelect from "./UserSelect/UserSelect";

const TopBar = () => {
  return (
    <div className={styles.container}>
      <UserSelect />
    </div>
  );
};

export default TopBar;
