import { UserListProvider } from "./context/UserListContext";

function App() {
  return (
    <>
      <UserListProvider>
        <p>Coucou</p>
      </UserListProvider>
    </>
  );
}

export default App;
