import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AdminProvider } from "./contexts/AdminContext.jsx";
import { BranchesAndTracksProvider } from "./contexts/BranchesAndTracksContext.jsx";

createRoot(document.getElementById("root")).render(
  <AdminProvider>
    <BranchesAndTracksProvider>
      <App />
    </BranchesAndTracksProvider>
  </AdminProvider>
);
