import UserSelect from "./UserSelect/UserSelect";
import styles from "./TopBar.module.css";

const TopBar = () => {
  return (
    <div className={styles.container}>
      <UserSelect />
    </div>
  );
};

export default TopBar;
