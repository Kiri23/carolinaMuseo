import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AdminLayout } from "./components/layouts";
import { Scenes, PageBuilder } from "./components/pages";

function App() {
  return (
    <BrowserRouter basename="/carolinaMuseo">
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/admin/page-builder" replace />}
        />

        {/* Default layout */}
        <Route path="/admin" element={<AdminLayout variant="default" />}>
          <Route
            path="page-builder"
            element={<PageBuilder variant="previewBottom" />}
          />
          <Route path="scenes" element={<Scenes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
