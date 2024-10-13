import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./Layouts/Dashboard";
import Home from "./pages/Home";
import RegistrationRequests from "./Layouts/RegistrationRequests";
import ViewAndExportGraduates from "./Layouts/ViewAndExportGraduates";
import CreateNewAdmin from "./Layouts/CreateNewAdmin";
import ViewAdmins from "./Layouts/ViewAdmins";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./Components/privateRoute/PrivateRoute"; 

const AppRoutes = () => {
  const isAdminLoggedIn = !!localStorage.getItem("accessToken");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route 
          path="/" 
          element={
            <PrivateRoute 
              element={<Home />} 
              isAdminLoggedIn={isAdminLoggedIn} 
            />
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
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
