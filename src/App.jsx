import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Platform from "./features/platform/Platform";
import MarketingPlan from "./features/MarketingPlan";
import Roadmap from "./features/Roadmap";
import NewBoard from "./features/NewBoard";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate replace to="platformLaunch" />} />
          <Route path="/platformLaunch" element={<Platform />} />
          <Route path="/marketingPlan" element={<MarketingPlan />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/newBoard" element={<NewBoard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
