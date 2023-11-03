import { BrowserRouter } from "react-router-dom";

import BottomBar from "./components/BottomBar/BottomBar";
import MainContent from "./components/MainContent/MainContent";
import TopBar from "./components/TopBar/TopBar";
import { AuthenticationProvider } from "./context/AuthenticationContext";
import { UserListProvider } from "./context/UserListContext";

function App() {
  return (
    <BrowserRouter>
      <UserListProvider>
        <AuthenticationProvider>
          <>
            <TopBar />
            <MainContent />
            <BottomBar />
          </>
        </AuthenticationProvider>
      </UserListProvider>
    </BrowserRouter>
  );
}

export default App;
