import TopBar from "./components/TopBar/TopBar";
import { AuthenticationProvider } from "./context/AuthenticationContext";
import { UserListProvider } from "./context/UserListContext";

function App() {
  return (
    <>
      <UserListProvider>
        <AuthenticationProvider>
          <TopBar />
        </AuthenticationProvider>
      </UserListProvider>
    </>
  );
}

export default App;
