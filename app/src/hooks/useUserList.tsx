import { useContext } from "react";

import { UserListContext } from "../context/UserListContext";

const useUserList = () => {
  const userList = useContext(UserListContext);

  return { userList };
};

export default useUserList;
