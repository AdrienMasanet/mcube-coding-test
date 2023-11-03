import useUserList from "../../hooks/useUserList";
import User from "../../types/User";
import styles from "./UserSelect.module.css";

const UserSelect = () => {
  const { userList } = useUserList();

  return (
    <div className={styles.container}>
      <select className={styles.select}>
        <option value="" disabled selected hidden>
          Not logged in yet. Pick a user !
        </option>
        {userList.map((user: User) => (
          <option key={user._id} className={styles.option} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserSelect;
