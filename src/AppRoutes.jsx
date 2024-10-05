import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./Layouts/Dashboard";
import Home from "./pages/Home";
import RegistrationRequests from "./Layouts/registrationRequests"



const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/registration-requests" element={<RegistrationRequests />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
