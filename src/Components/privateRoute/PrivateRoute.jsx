import { Navigate } from "react-router-dom";
import { useAdminContext } from "../../contexts/AdminContext";
import Loading from "../ui/Loading";

const PrivateRoute = ({ element, isRequiredToLogIn }) => {
  const { admin, adminContextLoading } = useAdminContext();

  // if (adminContextLoading) {
  //   return <Loading />;
  // }

  if (isRequiredToLogIn) {
    return admin ? element : <Navigate to="/login" replace />;
  }

  if (!isRequiredToLogIn) {
    return admin ? <Navigate to="/" replace /> : element;
  }
};

export default PrivateRoute;
