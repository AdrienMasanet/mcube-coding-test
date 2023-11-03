import { ChangeEvent } from "react";

import useAuthentication from "../../hooks/useAuthentication";
import useUserList from "../../hooks/useUserList";
import User from "../../types/User";
import styles from "./UserSelect.module.css";

const UserSelect = () => {
  const { userList } = useUserList();
  const { loggedInUser, login } = useAuthentication();

  const handleUserSelect = (event: ChangeEvent<HTMLSelectElement>): void => {
    login(event.target.value);
  };

  return (
    <div className={styles.container}>
      <select
        className={styles.select}
        onChange={handleUserSelect}
        defaultValue="none"
        value={loggedInUser ? loggedInUser._id : undefined}
      >
        <option value="none" disabled hidden>
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
