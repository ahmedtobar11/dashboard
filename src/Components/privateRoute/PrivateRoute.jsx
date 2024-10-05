import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element, isAdminLoggedIn }) => {
  return isAdminLoggedIn ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
