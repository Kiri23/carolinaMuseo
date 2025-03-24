import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AdminLayout } from "./components/layouts";
import { Scenes, PageBuilder } from "./components/pages";
import KioskViewer from "./components/pages/KioskViewer";

function App() {
  return (
    <BrowserRouter basename="/carolinaMuseo">
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/admin/page-builder" replace />}
        />

        {/* Admin routes */}
        <Route path="/admin" element={<AdminLayout variant="default" />}>
          <Route
            path="page-builder"
            element={<PageBuilder variant="previewTop" />}
          />
          <Route path="scenes" element={<Scenes />} />
        </Route>

        <Route path="/kiosk/:kioskId" element={<KioskViewer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
