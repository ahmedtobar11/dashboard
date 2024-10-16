import { Navigate } from "react-router-dom";
import { useAdminContext } from "../../contexts/AdminContext";
import NotFound from "../../pages/NotFound";
import Loading from "../ui/Loading";


const PrivateRoute = ({ element: Element, isRequiredToLogIn, allFor = "both" }) => {
  const { admin, adminContextLoading } = useAdminContext();

  if (adminContextLoading) {
    return <Loading />;
  }

  if (isRequiredToLogIn && !admin) {
    return <Navigate to="/login" replace />;
  }

  if (!isRequiredToLogIn && admin) {
    return <Navigate to="/" replace />;
  }

  if (allFor === "both" || (admin && allFor === admin.role)) {
    return <Element />;
  }

  return <NotFound />;
};

export default PrivateRoute;