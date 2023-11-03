import { useContext } from "react";

import {
  AuthenticationActionsContext,
  AuthenticationContext,
} from "../context/AuthenticationContext";

const useAuthentication = () => {
  const loggedInUser = useContext(AuthenticationContext);
  const { login } = useContext(AuthenticationActionsContext);

  return { loggedInUser, login };
};

export default useAuthentication;
