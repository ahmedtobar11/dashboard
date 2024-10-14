import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./Layouts/Dashboard";
import Home from "./pages/Home";
import RegistrationRequests from "./Layouts/RegistrationRequests";
import ViewAndExportGraduates from "./Layouts/ViewAndExportGraduates";
import CreateNewAdmin from "./Layouts/CreateNewAdmin";
import ViewAdmins from "./Layouts/ViewAdmins";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./Components/privateRoute/PrivateRoute";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppRoutes = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route
          path="/login"
          element={
            <PrivateRoute element={<Login />} isRequiredToLogIn={false} />
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute element={<Home />} isRequiredToLogIn={false} />
          }
        >
          <Route index element={<Dashboard />} />
          <Route
            path="registration-requests"
            element={<RegistrationRequests />}
          />
          <Route
            path="view-and-export-graduates"
            element={<ViewAndExportGraduates />}
          />
          <Route path="create-new-admin" element={<CreateNewAdmin />} />
          <Route path="view-admins" element={<ViewAdmins />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
