import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AdminLayout } from "./components/layouts";
import { Scenes, PageBuilder } from "./components/pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to admin */}
        <Route path="/" element={<Navigate to="/admin/page-builder" replace />} />
        
        {/* Admin routes with layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="page-builder" element={<PageBuilder />} />
          <Route path="scenes" element={<Scenes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
