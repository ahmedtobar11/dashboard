import AppRoutes from "./AppRoutes";
import { AdminProvider } from "./contexts/AdminContext";
import { BranchesAndTracksProvider } from "./contexts/BranchesAndTracksContext";

function App() {
  return (
    <AdminProvider>
      <BranchesAndTracksProvider>
        <AppRoutes />
      </BranchesAndTracksProvider>
    </AdminProvider>
  );
}

export default App;
