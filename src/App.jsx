import AppRoutes from "./AppRoutes";
import { BranchesAndTracksProvider } from "./contexts/BranchesAndTracksContext";

function App() {
  return (
    <BranchesAndTracksProvider>
      <AppRoutes />
    </BranchesAndTracksProvider>
  );
}

export default App;
