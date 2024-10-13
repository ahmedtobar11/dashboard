import { createContext, useContext, useState } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [adminContextLoading, setAdminContextLoading] = useState(true);

  const states = {
    admin,
    setAdmin,
    adminContextLoading,
    setAdminContextLoading,
  };

  return <AdminContext.Provider value={states}>{children}</AdminContext.Provider>;
};

export const useAdminContext = () => {
  return useContext(AdminContext);
};
