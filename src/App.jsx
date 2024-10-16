import { useEffect } from "react";
import AppRoutes from "./AppRoutes";
import { useAdminContext } from "./contexts/AdminContext";

function App() {
  const { setAdmin, setAdminContextLoading } = useAdminContext();

  useEffect(() => {
    const checkLoggedInAdmin = () => {
      const admin = JSON.parse(localStorage.getItem("admin"));
      if (admin) {
        setAdmin(admin);
      }
    };
    checkLoggedInAdmin();
    setAdminContextLoading(false);
  }, []);

  return <AppRoutes />;
}

export default App;
