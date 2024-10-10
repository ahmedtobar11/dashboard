import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./Layouts/Dashboard";
import Home from "./pages/Home";
import RegistrationRequests from "./Layouts/RegistrationRequests";
import ViewAndExportGraduates from "./Layouts/ViewAndExportGraduates";
import CreateNewAdmin from "./Layouts/CreateNewAdmin";
import NotFound from "./pages/NotFound"
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/registration-requests"
            element={<RegistrationRequests />}
          />
          <Route
            path="/view-and-export-graduates"
            element={<ViewAndExportGraduates />}
          />
          <Route
            path="/create-new-admin"
            element={<CreateNewAdmin />}
          />
        </Route>
        <Route
            path="*"
            element={<NotFound  />}
          />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
