import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Platform from "./pages/platform/Platform";
import MarketingPlan from "./pages/MarketingPlan";
import Roadmap from "./pages/Roadmap";
import NewBoard from "./pages/NewBoard";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate replace to="platform" />} />
          <Route path="/platform" element={<Platform />} />
          <Route path="/marketingPlan" element={<MarketingPlan />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/newBoard" element={<NewBoard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
