import { useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  if (isLoginPage) {
    return <AppRoutes />;
  }

  return (
    <>
      <Navbar />

      <div className="d-flex">
        <Sidebar />

        <main className="flex-grow-1 bg-light p-4">
          <AppRoutes />
        </main>
      </div>
    </>
  );
}

export default App;