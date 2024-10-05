import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./Layouts/Sidebar";
import RequestValidation from "./Layouts/RequestValidation"


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Sidebar />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/requestValidation" element={<RequestValidation />} />

        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
