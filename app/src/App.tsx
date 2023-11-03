import TopBar from "./components/TopBar/TopBar";
import { UserListProvider } from "./context/UserListContext";

function App() {
  return (
    <>
      <UserListProvider>
        <TopBar />
      </UserListProvider>
    </>
  );
}

export default App;
