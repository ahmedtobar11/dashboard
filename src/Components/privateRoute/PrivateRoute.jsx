import { Navigate } from "react-router-dom";
import { useAdminContext } from "../../contexts/AdminContext";
import NotFound from "../../pages/NotFound";
import Loading from "../ui/Loading";

const PrivateRoute = ({ element, isRequiredToLogIn, isSuperAdminRequired = true }) => {
  const { admin, adminContextLoading } = useAdminContext();

  if (adminContextLoading) {
    return <Loading />;
  }

  if (isSuperAdminRequired) {
    return admin.role === "super admin" ? (
      element
    ) : (
      <Navigate to="/forbidden" replace />
    );
  }

  if (isRequiredToLogIn) {
    return admin ? element : <Navigate to="/login" replace />;
  }

  if (!isRequiredToLogIn) {
    return admin ? <Navigate to="/" replace /> : element;
  }
};

export default PrivateRoute;
